# Routine ID

## Overview

## Workflows

Workflows can be identified in one of two ways. Depending on the
particular context you are running, usually one of the identifiers are
more convenient to use.

- Using the workflow name and revision number:
  `wfname:{workflow-name}:{revision-number}`. Note that this is uniquely only
  within the context of a particular project. To make this globally unique, you
  can include the project name: `wfname:{project-name}:{workflow-name}:{revision-number}`.
  Note also that in some contexts, just the workflow name is enough. When this
  identifier is used, the system will do its best to fill in the missing
  information from the runtime context. If more information than needed is
  given (such as including the project name when the project name is
  already known), then that is fine, as long as the information is
  correct (providing the incorrect project name for a runtime where the project
  name is already known will result in an identification failure).

- Use the database id for the workflow. All database ids are globally unique.
  Use the notation: `db:{id}`.

## Tasks

Every task can be uniquely identifier in one of two ways. Depending on the
particular context you are running, usually one of the identifiers are
more convenient to use.

- Using the task name and version: `tname:{task-name}:{task-version}`. Note that
  this identification only works in the context of a particular project, since
  there can be another task with the same name and version in a different
  project. To globally qualify across all projects, you can define the
  task as follows: `tname:{project-name}:{task-name}:{task-version}`. Note also that
  in some contexts, just the task name is enough. When this identifier is used,
  the system will do its best to fill in the missing information from the
  runtime context. If more information than needed is given (such as including
  the project name when the project name is already known), then that is fine,
  as long as the information is correct (providing the incorrect project name
  for a runtime where the project name is already known will result in an
  identification failure).

- Use the database id for the task. All database ids are globally unique.
  Use the notation: `db:{id}`.
