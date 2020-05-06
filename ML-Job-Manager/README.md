# ML Job Manager

The ML Job Manager is a system designed to simplify the process of iterating
and deploying Machine Learning models. The Manager has the following design
principles:

- Local Code == Distributed Code. There are many additional considerations one
  must take when taking code that runs on your laptop to code that runs in a
  distributed environment. However, those considerations should all be tucked
  away as implementation details of the system. During the application
  development process, the same code that works locally should also work
  in a remote, distributed environment.

- Good frameworks don't get in the way. There shouldn't be a complex api
  that one has to learn when trying a new framework. The python api is feature
  rich and provides plenty of great semantics for developing sophisticated
  applications. The ML Job Manager uses these features as much as possible.
  All the work is done under-the-hood to bridge the gap.

For a deeper dive into the system architecture, you can explore the
documentation outlined below.

**Overview**

- [System Architecture](./System-Architecture.md)
- [Comparing this to other Systems](./Comparisons.md)

**Core Concepts**

- [API Service](./API-Service.md)
- [Container Image](./API-Image.md)
- [Code vs Data](./Code-vs-Data.md)
- [Task](./Task.md)
- [Unit](./Unit.md)
- [Worker](./Worker.md)
- [Worker Logs](./Worker-Logs.md)
- [Workflow](./Workflow.md)

**Technical Details**

- [GRPC](./GRPC.md)
- [Routine Results Storage](./Routine-Results-Storage.md)
- [Signature Introspection](./Signature-Introspection.md)
- [Worker Directives](./Worker-Directives.md)

**Ideas for Later**

- [Routine Discovery](./Routine-Discovery.md)
- [Routine Triggers](./Routine-Triggers.md)
- [Network Designer](./Network-Designer.md)
