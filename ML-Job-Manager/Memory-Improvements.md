# Memory Improvements

Currently, when a task needs access to a dataset, it downloads a full copy of
the dataset into its local memory. There are a number of issues with
this approach:

- There may be a set of other tasks that are similar (such as multiple tasks
  each training the same model but with different hyperparametrs) and require
  the same dataset. Downloading a dataset into each task's memory space is an
  inefficient use of memory, compute, and networking resources.

- Some datasets are too large to keep in memory. There may be a need for data
  to be streamed on demand.

There are a number of avenues to explore here:

- Could GRPC (or some other channeling api) be good for streaming large
  datasets as they are needed.

- Could we rely on kubernetes features for shared volumes to share an instance
  of a dataset with many models.

- Should explore how other labs / frameworks solve this problem. This is a
  known problem
