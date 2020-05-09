# Argument Serialization

Before reading this documentation, you should have an understanding of how
the [Routine Engine](./Routine-Engine.md) works, and, in particular, the
`RemoteDispatchEngine`.

When a value is returned from a routine, the `RemoteDispatcherEngine` needs to
send that value over to the service so it can forwarded to the requesting
worker.

That value needs to then get de-serialized from within that worker so it can be
used. This whole process should happen under the hood such that the
programmer is not aware this is happening. The goal is for calling returns
and returning from routines should feel the same as executing some local
function.

The engine relies on a `serializer` and `deserialize` to make the needed
serialization and deserialization calls.

When the engine calls `serialize`, the value being serialized is shown to a
list of all the serialize objects. Once a serializer _claims_ the value,
it is responsible for serializing the value into json format so that it
can be sent through the service to other workers. When deserializing an
object that is sent, a complimentary process occurs, where a serializer
_claims_ the object it wants to deserialize.

_NOTE: The assumption is then that on both the serializing worker
and requesting (deserializing) worker, the same serializer exists. This may
need to change in the future. One potential solution is that a worker must
broadcast which serializers it has available. However, this is not an issue
at the moment, and we may come back to this later._

Here are some examples of serializers:

- `NumericSerializer`: Serializes and deserializes numeric values, such as
  float or int.

- `CollectionSerializer`: Works with lists, sets, dicts, and tuples.

- `StringSerializer`: Works with python strings.

Each serializer implements the following methods:

- `claim`: Given a value, the serializer decides if it would like to claim
  that value.

- `key`: The unique key of the serializer. There cannot be another serializer
  in the registry with the same name.

- `serialize`: Given the value, this performs the serialization process. This
  function is also given a recursive `serialize_func` operation. This method
  can be used to serialize sub-types. For example, the `CollectionSerializer`
  relies on this function to serialize the individual elements of a list.

- `deserialize`: Given the serialized value, this perform the de-serialization.
  This function is also given a recursive `deserialize_func` operation. THis
  method can be used to deserialize sub-types.
