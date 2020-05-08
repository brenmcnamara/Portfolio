# Worker Directives

A Worker Directive is a communication payload between the Worker and the API
Service. Every directive has two important fields: `payloadKey` and `payload`.
The `payloadKey` is a string indicating the type of directive being sent, and
a `payload` is a json object containing the information being communicated.

The following are all the directives being sent between worker and service:

**From Worker**

`v1.heartbeat.give_pulse`

`v1.ready`

After a worker establishes a connection with the service, it sends this
directive to indicate it is officially connected and ready to handle work.

`v1.log`

A worker can send logs to the service. Please look at the
[Worker Logs](./Worker-Logs.md) documentation for a detailed discussion on this.

**From Service**

`v1.heartbeat.check_pulse`

**Bi-Directional**

`v1.routine.request_start`

When a worker is running a routine that has sub-routines, it needs to wait for
the completion of those sub-routines before it can continue work on the
workflow. The worker can send requests to the service to make requests
for additional routines to be done.

The service then needs to look at the full set of workers it has and delegate
that work out to an available worker. The worker then forwards the directive
to another worker that can work.

_Params_

- routineID: The [routine id](./Routine-ID.md) of the routine being requested.
- params: A set of parameters to forward to the routine.

_NOTE: This API currently works when every task is a single unit of work.
To move to multi-unit tasks, this directive may need to change._

`v1.routine.starting`

When a worker has been requested to do work, it needs to communicate back to
the service that the work is currently being done. If a request for that work
was initialized by another worker, the directive is forwarded from the service
to the requesting worker to indicate that the work is starting.

`v1.routine.completed`

When a worker completes a routine, it must communicate to the service that the
routine has been successfully completed. If the routine was requested by
another worker, the completed directive will be forwarded to the
requesting worker.
