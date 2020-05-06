# Code vs Data

A ML project is a collection of workflows, each of which is a DAG of
routines that can run. This doesn't seem to be much different than any type
of program. You have functions that call other functions that call
other functions, so on and so forth... So a workflow is a piece of code that
calls other workflows or tasks.

However, there is an important reason why we distinguish between tasks
and workflows. On the surface, they are both functions that potentially
execute other functions. The main distinction: a task is not allowed to execute
other tasks or workflows. The task is the smallest unit of code recognized by
the overall system. You _can_ have a task that runs other python functions,
and this is probably the expected case when you have a complex project,
but those functions can't be other tasks and workflows.

_NOTE: As of now, we have a soft, implicit constraint of not allowing tasks
to execute other tasks / workflows, though there may be hard constraints
(runtime checks) in the future to prevent this_.

On the other hand, a workflow isn't expected to do any real _work_ -- we leave
the definition of _work_ vague for now, though there may be stricter
technical constraints on this in the future). So a workflow shouldn't be
training a model, deploying a model, performing heavy pre-processing, etc...
Instead, the workflow delegates that work to one or more tasks.

The reason we make this distinction between tasks and workflows is because
we are moving towards a world where a workflow blurs the lines between data
and code.

## Pros and Cons of Code

Code is action, it's something you do. Your system can take code and runs it
ona machine. For the most part, what that code is actually doing is opaque to
the machine, and that's how we like it.

However, this opaqueness of code makes it inflexible. It's very difficult, for
example, to look at a program and say you'd like it to only perform a subset
of the things it normally executes. It would require a deeper understanding of
the code from the system -- in some cases, running a subset of a program may
not even make sense.

On top of that, code is finicky. It needs to be run in a specific environment,
with an OS that speaks the same language, and with runtime properties that meet
the implicit expectations of the program.

## Pros and Cons of Data

Data is knowledge, it is something you know. Your system can take data and
use it to undertand something about the world you are modeling. On top of that,
data is declarative. It's a transparent way of describing something. It can
be tweaked and modified, subsets of the data can be used to solve some problems,
while other subsets of the data can be used to solve other problems.

Data can be moved around from one place to another, and it doesn't need to
worry about the particulars on the OS or the runtime environment.

However, data isn't useful until it is being... _used_. And to use data, you
need code.

## Code is Data

At the end of the day, all code _is_ data. You save code in a file, that file
can be moved to an online repository and downloaded somewhere else. A compiler
can _read_ the code as some raw data input, and produce some other form of that
same _code_, an AST. For the most part, this line between data and code exists
far down the machine stack, so most developers don't think of code as data.

## Workflows: Code or Data?

The goal is to blur the lines between a workflow as code and a workflow as
data. The ML system should be able to _run_ a workflow, like code, but it
should also be able to _read_ a workflow, like data. To make this happen,
we have a hierarchical set of properties. These properties can be optionally
satisfied by the workflow, and if they are, the workflow becomes more like
data.

## Workflow Properties

### Routine Property

Every workflow has the _routine_ property. This just means that a workflow
can be _run_. This essentially means all workflows are _code_. However,
routines aren't arbitrary code. They must satisfy these additional rules:

- Routines must be stateless: a routine will always produce the same output
  for a given input.

- Routines have no side effects: No writing to a database, making mutations
  via network calls, etc...

### No Control Flow Property

The _No Control Flow_ means that a workflow has no control flow logic: if-else
statements, for loops, etc...

This essentially gaurantees that a workflow will always run the same set of
tasks in the same order. With this property, we can convert a workflow into
a statically-defined DAG of routines. When a workflow can be represented as
such a DAG, this DAG can be converted into a data structure which can be
deployed and run by the service. We no longer need to use the workflow code
itself to run the routine because all the information in that workflow can
be captured in a relatively simple data structure.

This is the most restrictive property of a workflow.

### Future Properties

There is a large gap between the _Routine Property_ and the _No Control Flow
Property_. In the future, there may be other properties that surface, allowing
us to introspect a workflow and collect data about the workflow without
necessarily knowing everything to a point where we can run the workflow
without the original routine code.

There will also be some exploration on creating dynamically-defined DAGs, which
would be like a DAG of a workflow where the shape of the DAG itself depends
on the input. This is, in the most general sense, what a workflow is, but there
may need to be clever tricks to convert this into a usable data structure.