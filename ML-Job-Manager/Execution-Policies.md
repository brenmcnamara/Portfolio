# Execution Policies

The execution policy describes the strategy that a worker uses when deciding
what routines to execute. The execution policy exists on the
[engine](./Routine-Engine.md), which is what is in charge of executing the
policy. When a worker is at the beginning of working on a routine, it can only
make one of two decisions:

1. Run the routine locally.

2. Send the routine to get run another worker.

There are three possible ways a routine can get requested by the worker:

1. The API Service makes a request for the worker to execute a routine.

2. A local script is run, requesting the execution of a routine in a project.

3. While a routine is running, that routine executed a sub-routine, which then
   alerts the engine that the current routine is blocked until the completion of
   the sub-routine.

As of now, there are only two possible execution policies:

1. Run everything locally -- used primarily for local testing and lightweight
   routines.

2. If the routine is a sub-routine of something already running, then run
   that sub-routine remotely. Otherwise, if the routine is coming from a local
   script or the API service, run it locally.

In the future, there may be more sophisticated policies for execution of
routines based on:

- Does the routine require a large data object? Is that data object
  already loaded in memory on the local worker? If so, a policy may decide it's
  not worth sending that routine to another worker if that worker needs to
  load massive, redundant data into memory.

- How many routines is the worker currently running locally? How many of them
  are blocked and waiting for completion of another routine? If the current
  worker has few running routines, all of which are blocked, a policy
  may decide that it is quicker to just run the new routine locally.
