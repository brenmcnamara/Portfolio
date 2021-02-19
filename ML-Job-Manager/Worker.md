# Worker

A Worker is some process associated with a project that is
capable of doing work (this includes running routines). A worker can only
work on a single [Unit](./Unit.md) at a time. To run multiple units in parallel,
multiple workers will be needed. (Note that this may be changed in the future,
but as of now, for simplicity, this is the rule).

A worker never decides what work to do on its own, but must receive
instructions about what work to execute. For the most part, these instructions
will be delegated from the [API service](./API-Service.md).

## Starting a Worker

When a worker is started, the following happens:

- The worker opens a connection with the service. When that connection opens,
  it creates a channel where [Worker Directives](./Worker-Directives.md) can
  be sent back and forth between the worker and the service.

- The worker indicates to the service that it is ready to receive a unit of work.

- While a worker has an open connection with the service, the service does
  repeated health checks on the worker. This is called a _heartbeat_. During
  those health checks, the worker also indicates its work status, which is
  almost always either `IDLE` (waiting for work to do) or `WORKING` (currently
  working on some routine).

## Worker Statuses

While a worker is online, it may have one of a number of statuses:

- `INITIALIZING`: When a worker is first created, a worker is given the status
  of initializing. During this state, the service knows that the worker has
  registered, but it is still waiting for a connection to be open so that
  directives can be sent back and forth between service and worker.

- `IDLE`: Indicates the worker is not currently doing any work, and is
  waiting for the service to delegate.

- `WORKING`: Indicates the worker is currently working on a unit of work.

- `HANGING`: This status happens when a worker has some work it has been
  delegated, but it is currently waiting for some other work to be done by
  a different worker. This happens when a worker is delegated a workflow.
  Workflows have many sub-routines in them. As a result, the worker may be
  waiting for the completion of one or more sub-routines.

- `TERMINATING`: Indicates that the worker is in the process of shutting down.

