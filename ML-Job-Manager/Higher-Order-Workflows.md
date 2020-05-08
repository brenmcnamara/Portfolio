# Higher-Order Workflows

## Motivation

Imagine building a workflow for a machine translation routine with transformers.
This routine has the following flow:

- takes a dataset as input
- generates a list of hyperparameters
- for each set of hyperparameters, it generates a transformer model which was
  created in TensorFlow
- those models are then passed to a routine that validates which model is best
- that model is returned

Now imagine your team has decided to start using PyTorch and wants to migrate
all their workflows to PyTorch. This means you would need to create a new
task that trains a transformer model in PyTorch. Also every workflow
that is using the TensorFlow task must be rewritten to use the new PyTorch
task. However, you're Workflow didn't actually change at all, only the routines
it is calling.

To decouple your tasks from your workflows, we have higher-order workflows.

## Introduction

A higher-order workflow (HOW) is a function that returns a workflow. The
higher-order workflow makes the process of defining a workflow dynamic. The
parameters of the HOW define the final workflow that is generated, so the
actual workflows being built are dynamically defined.

Before we see how to create a HOW, let's look at some helpful custom types.

## Routine Types

To help us take full advantage of HOW, we need a type system for routines.

The following is an example of defining a routine type that trains and returns
a model given a set of model parameters.

```python
from typing import TypeVar
from utils.types import Routine

TModelParams = TypeVar('TModelParams')
TModel = TypeVar('TModel')
TrainModelRoutine = Routine[[TModelParams], TModel]

```

## Creating a HOW

Let's define a HOW that is used for generating our transformer model as
defined above:

```python
import asyncio

from typing import List, TypeVar
from utils import define
from utils.types import Data, Routine

TModelParams = TypeVar('TModelParams')
TModel = TypeVar('TModel')

@define.how(name="build_transformer")
def build_transformer(preprocess: Routine[[Data], Data],
                      train_model: Routine[[TModelParams, TModel]],
                      pick_best_model: Routine[[List[TModel]], TModel]) -> Routine[[List[TModelParams]], TModel]:

    def workflow(data: Data, params_list: List[TModelParams]) -> TModel:
        processed_data = await preprocess(data)

        train_execs = [train_model[p] for p in params_list]
        models = await asyncio.gather(*train_execs)
        best_model = await pick_best_model(models)

        return best_model

    return workflow

```

Now with our HOW, we can make dynamic changes to the preprocessing, training,
and validation steps without re-writing new workflows. In fact, the above
workflow will work not just for our transformer example, but we can generalize
it to any pipeline that involves a pre-processing, training, and validation
step. With about 20 lines of code, we've created a complete, re-usable ML
pipeline.

**TODO: Things I still need to think through**

- How to deploy the HOW? Do I save it as a type of "meta-routine" that will get
  run on a worker.
- Do I save the generated workflow as a routine? Can I detect when the HOW
  is called with the same params as before? Can I generate an HOW from that?
