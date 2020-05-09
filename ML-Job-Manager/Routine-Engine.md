# Routine Engine

Routines are defined in some code that exists within the project. At some point,
that code needs to run, usually either within the context of a worker executing
a unit of work or a local job running on a single machine.

In any case, there is a lot of support needed for a routine to run and
execute properly. Here are some examples of things that need to be managed
by the runtime.

- When a task or workflow is completed, the results may need to be sent to
  a remote worker. These results would need to get serialized and sent
  across the network. This would also have to work for large amounts of data,
  like a large DL model that finished training.

- When a task is started, there may be cases where we can avoid running the
  code. If we have run the same version of the task at some other point in the
  past, then we would like to simply return the results from a previous run.
  Tasks are expected to be pure, deterministic, and have no side effects. Look
  through the documentation on [tasks](./Task.md) for more information.

- When a workflow is executing and comes up to a group of tasks that need to
  be completed, it may want to distribute the work of those tasks across a
  cluster of workers. The task [routine identifiers](./Routine-ID.md) and
  [serialized arguments](./Argument-Serialization.md) would need to get sent
  to another worker for execution.

- The runtime needs to know what routine is currently running (if there is
  any routine running), and if the running routine is hanging because it is
  waiting for another routine on a remote worker to complete.

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

The `LocalRunEngine` is the simplest type of `RoutineEngine`, and it does
not do much more than create a run loop and execute the routines.

The `LocalRunEngine` gets called on a single routine, usually a workflow.
While the `LocalRunEngine` is working on this routine, it blocks the main
thread. The routine may execute other sub-routines, which also block the main
thread. Once the root routine is finished running, it returns control of the
main thread to the program.

## Remote Dispatch Engine

For a [Workflow](./Workflow.md) to become distributed across many machines,
executing a routine locally would need to be delegated to other workers. The
`RemoteDispatchEngine` handles this delegation.

Unlike the `LocalRunEngine`, which is blocking the main thread, the
`RemoteDispatchEngine` runs on a background thread. This is because the
`RemoteDispatchEngine` is usually running inside a [worker](./Worker.md) which
does not terminate. Workers keep running even when they are not doing any work
and they listen for work coming from the service. That worker is doing many
other things besides using the engine, such as communicating with the
service.

When the worker receives a directive from the service to start a routine,
the following happens:

- find the executable for the particular routine that is being requested to run.

- deserialize the parameters provided when requesting the routine to start.

- start a new run loop on a background thread for the routine to execute.

- pass the deserialized parameters to the routine and start the run.

- when the routine executes a sub-routine, the routine execution is serialized
  and sent as a directive to the service. The service is in charge of finding
  another worker that can pick up the work. If the root routine is waiting for
  other routines to finish executing, the root is then marked as `HANGING`.

- Once the other works begin finishing the sub-routines and sending back the
  results to the current worker, the results are deserialized and saved locally.
  Once all the blocking sub-routines have completed, the hanging worker can
  resume its work, and the status is switched back to `WORKING`.

- Once the root routine has finished executing, the worker sends a signal
  to the service indicating it has completed its routine, and the status of the
  worker is switched to `IDLE`.

_NOTE: Currently, we only allow a single, root routine to run per engine.
If an engine is working on a routine and receives a request from the service
to start more work, this is undefined behavior. As of now, we don't handle this
case explicitly (except maybe with an assert statement) and assume the service
will never do this. This will need to be propery handled in the future._

_NOTE: To learn about how arguments are serialized and deserialized between
workers, read about [Argument Serialization](./Argument-Serialization.md)._
