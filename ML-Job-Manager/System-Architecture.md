# System Architecture

## Overview

To help manage ML jobs and projects, the system has three main components.

1. The Project / Worker

2. The API Service

3. The UI Interface

## The Project / Worker

The Project / Worker is the core of the whole system. This is where the
code to define, train, and test the machine learning jobs resides. A single
project contains a collection of all routines ([tasks](./Task.md) and
[workflows](./Workflow.md)).

Every project is wrapped in a python cli interface with commands to:

- start a [worker](./Worker.md)
- execute a routine locally
- inspect the state of the project: for example, get a list of all routines
  that are defined.

When deployed, this python cli interface is packed into a docker container
that can get deployed using a [kubernetes configuration](./Kubernetes.md).
The deployment creates a set of running workers, each running an instance
of the project. Those workers register with the API Service and listen for
any [directives](./Worker-Directive.md) coming from the service, which may
include directives to run a routine.

Some routines (like workflows) have sub-routines that need to get executed.
Depending on the particular execution policy, the worker may decide that
it would like to run the routine on a separate worker. To make this happen,
the worker [serializes the arguments](./Argument-Serialization.md) passed
to the routine and sends the routine to the API Service. At some later point,
it will get back a result from the routine, which it can then deserialize
and use to continue execution.

## The API Service

The API service communicates with the workers to orchestrate the execution
of routines across the entire cluster. Currently, the API service is not
much more than a load balancer, inspecting the set of workers available to run
routines, deciding which ones are actually capable of running a given routine,
and communicating results between different workers.

_In the future, the API Service may take on the added responsibility of
building and deploying workers from container images based on the work needed
to be run_.

## The UI Interface

The UI Interface is a Web console to view the current runs of routines and any
logs they may output during execution.

## Terminology

_TODO: Fill me out_

- **Engine:**

- **Project:**

- **Routine:**

- **Task:**

- **Unit:**

- **Worker:**

- **Workflow:**
