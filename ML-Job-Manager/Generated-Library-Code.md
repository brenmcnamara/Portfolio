# Generated Library Code

*This is an idea*

In the same way that GRPC can generate library code from a protobuf definition,
we should be able to generate client code for executing routines in a project
from a project repo. The project repo is represented as a
[Container Image](./Container-Image.md), which is a snapshot of a project.
That container image contains information about all the tasks and workflows
defined in a project. On top of that, if using the python types, we can get
the parameters and return types of those routines as well. Using this
information we could generate client-side code for different programming
languages. That code will be equipped with some endpoint to call the project's
routines through the api service.
