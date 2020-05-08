# Routine Engine

Routines are defined in some code that exists within the project. At some point,
that code needs to run, usually either within the context of a worker executing
a unit of work or a local job running on a single machine.

In any case, there is a lot of support needed for a routine to run and
execute properly. Here are some examples of things that need to be managed
by the runtime.

- When a task or workflow is completed, the results need to be stored
  somewhere. Location of storage needs to be aware of the specific task that
  completed and the version of that task.

- When a task is started, there may be cases where we can avoid running the
  code. If we have run the same version of the task at some other point in the
  past, then we would like to simply return the results from a previous run.
  Tasks are expected to be pure, deterministic, and have no side effects. Look
  through the documentation on [tasks](./Task.md) for more information.

- Send directives to the service to complete sub-routines like tasks on other,
  remote workers.

- Run a Routine Trigger when a routine has completed (this is not yet supported
  and is listed as a [future feature](./Routine-Triggers.md)).

The job of the _Routine Engine_ is to handle all the specifics of these cases.
The actual engine is tucked away and the user should not need to interact with
it directly, but under the hood, it does all the heavy lifting and plays an
important role in keeping the code required for running routines simple.

There are different Routine Engines that can be instantiated within the
runtime. Each engine results in different behavior when tasks and workflows
are executed.

**NOTE: It is important to know that these engines are implementation details.
From the application developer's perspective, one should never interact
directly with an engine. These engines are initialized behind the scenes
depending on how the lifecycle is initialized. Please look at the documentation
on the [Lifecycle](./Lifecycle.md) for how to manage the runtime.**

## Local Run Engine

Consider the following code to run and wait for the results of a task:

```python

@define.task(name="train", version="0.0.1")
def train(data: Data, epochs: int, hyperparams: List[HyperParams]) -> List[Model]:
  # Do the training here, then return the list of models.


async def do_stuff():
  hyperparams = [dict(lr=0.1), dict(lr=0.01), dict(lr=0.001)]
  data = get_data()
  epochs = 100
  models = await train(data, epochs, hyperparams)

```

The `LocalRunEngine` is the simplest type of `RoutineEngine`. It simply
runs the code as is. There is no additional processing or overhead with the
`LocalRunEngine`.

## Remote Dispatcher Engine

For a [Workflow](./Workflow.md) to become distributed across many machines,
executing a routine locally would need to be delegated to other workers. The
`RemoteDispatcherEngine` handles this delegation.

When a routine, such as a task, is called, the following happens:

- The engine picks up that a task coroutine has been executed in the code.
  It registers the task routine in local memory. It alerts the service that
  the worker now has status `HANGING`.

- The routine id and the arguments to the task are serialized and sent as
  a [directive](./Worker-Directives.md) to the service. The directive indicates
  that there is a task that needs to get started.

- The service handles the work of finding a worker that can run the routine
  and managing the communication with that worker.

- Once the worker completes the task and provides return values for the
  task, those arguments are forwarded to the original worker that requested
  the task.

- The routine id and serialized parameters get parsed. The engine then resolves
  the completed task to the python coroutine that is awaiting on that task. The
  coroutine is completed and the return values are resolved. If there are
  no more coroutines awaiting, the engine switches the status of the worker to
  `WORKING`.

- At this point, the workflow can continue its work.

- Once the workerflow finishes, the engine switches the status of the worker
  to `IDLE`.

### Argument Serialization

When a value is returned from a routine, the `RemoteDispatcherEngine` needs to
send that value over to the service so it can forwarded to the requesting
worker.

That value needs to then get de-serialized from within that worker so it can be
used. This whole process should happen under the hood such that the
programmer is not aware this is happening. The goal is for calling returns
and returning from routines should feel the same as executing some local
function.

The engine relies on a `Serializer` to make the needed serialization and
deserialization calls.

First, the engine communicates with a `SerializationRegistry` which contains
all the serializers that exist in the worker. The registry takes the value
and talks to each serializer in the registry to see if any are _claiming_
the value as something they can serialize. Once a serializer has claimed the
value, it is in charge of the serialization and deserialization process
of the value.

_NOTE: The assumption is then that on both the serializing worker
and requesting (deserializing) worker, the same serializer exists. This may
need to change in the future. One potential solution is that a worker must
broadcast which serializers it has available. However, this is not an issue
at the moment, and we may come back to this later._

Here are some examples of serializers:

- `NumericSerializer`: Serializes and deserializes numeric values, such as
  float or int.

- `CollectionSerializer`: Works with lists, sets, dicts, and tuples.

- `BlobSerializer`: Works with large data, such as files.

- `PyTorchTensorSerializer`: Serializes and deserializes PyTorch tensors.

- `PyTorchModuleSerializer`: Works with PyTorch modules.

Each serializer implements the following methods:

- `claim`: Given a value, the serializer decides if it would like to claim
  that value.

- `name`: The unique name of the serializer. There cannot be another serializer
  in the registry with the same name.

- `serialize`: Given the value, this performs the serialization process.

- `deserialize`: Given the serialized value, this perform the de-serialization.

Note that for some of the serializers that are working with large data, such
as the `BlobSerializer`, it would not be possible for the serializer to pass
the data across the service connection. Instead, this data would be stored
in a storage bucket and the paramter passed across the service connection
would instead be a file reference to the data, possibly with some instructions
on how to read and parse that file.
