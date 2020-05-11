Hi,

My name is Brendan McNamara. I am a passionate software engineer driven to
make real-world impact.

I have a deep passion for the of AI technologies and, in particular, Deep Learning,
and have devoted a large chunk of my time to learning the math, theory, and
core concepts behind the latest progress in the field. You can view
my [Trello Board](https://trello.com/b/B8HdpyCe/ai) containing my roadmap
for learning AI and Deep Learning. There are also a number of AI-related
personal projects listed below.

My expertise is primarily in client-side UI development.
I have worked on a number of iOS apps (using Swift, React-Native, and
Objective-C), and Web Apps (using React, Typescript, Flow, Redux, Flux, and
ThreeJS). Some of my work has been on less traditional UI systems, such as
developing a CAD-like Web Application (using ThreeJS, WebGL, and React) while I was
at Facebook and developing overlay Virtual Reality experiences (using ReactVR,
which is built on React Native) during my time at Oculus.

I also have experience working with design software such as Sketch and Figma
and have designed a number of app concepts and custom icons using these tools.

- [LinkedIn](https://www.linkedin.com/in/brendan-mcnamara-66130976/)
- [Github](https://github.com/brenmcnamara)

## Personal Projects

- [ML Job Manager](./ML-Job-Manager/README.md), tentatively named _9point_

  - This is a system I am personally developing for faster iteration on Deep
    Learning model development. The primary goal is to make going from
    running a job / workflow on your laptop to running that same workflow on a
    distributed compute cluster as simple as possible.

  - This project was heavily inspired by [Flyte](https://github.com/lyft/flyte)
    and somewhat inspired by [Kubeflow](https://www.kubeflow.org/).

  - The System is built on top of a Kubernetes Cluster with three services:

    - A [distributed worker service](https://github.com/9point/ProjectTemplate)
      of pods that pick up and execute distributed training jobs. _The workers
      are currently implemented in Python, though this is not a hard requirement._

    - An [API service](https://github.com/9point/MLAPIService) for communicating
      with the workers and coordinating execution of job routines. _The API
      Service is built using NodeJS, Typescript, GRPC, and Firebase_.

    - A Web UI service serving the [Web-based console](https://github.com/9point/MLWebConsole),
      _built using Typescript, React, and Firebase_.

- [Research Paper Studies](https://github.com/brenmcnamara/ML/tree/master/papers)

  - Every week, I pick one research paper to study. After careful reading, I
    put together notes summarizing my thoughts on the work and ideas for
    future research / investigation.

  - Almost all papers have been related to research around Deep Learning for
    Natural Language Understanding.

- [Neural Machine Translation Modeling](https://github.com/brenmcnamara/NMT)

  - This project is at its initial stages. It is the culmination of personal
    research done in Neural Machine Translation using Deep Learning.

  - The goal is to implement many of the famous models in NMT research to gain
    an intuition of how these models differ and best practices for data
    pre-processing and hyperparameter configurations.

- [Misc ML Projects](https://github.com/brenmcnamara/ML/tree/master/projects)

  - A collection of mini-projects that I've built in the process of ramping up
    on Machine Learning topics and research.

  - All projects (except one) are using Python. Many use PyTorch. One project
    uses Typescript.

- [Proto JS](https://github.com/brenmcnamara/proto)

  - Proto is a master web application containing a number of miscelaneous
    web-based prototypes.

  - Most notably is the react table prototype, which was inspired by the
    product [Airtable](https://airtable.com/). This react component has a rich
    api supporting: multiple sticky rows / columns, custom table cell
    components, and an advanced table cell selection / highlighting API with
    drag-n-drop capability.

  - This project was built using Typescript and React.

_I love tinkering! There are tons of interesting projects that I've built.
Please feel free to [check out my Github](https://github.com/brenmcnamara)._

## Work Experience

- [Cue](https://cue.app/) - Apr 2019 - Mar 2020

  - Worked on the [Cue iOS Application](https://apps.apple.com/us/app/cue-social-calendar/id1377803825),
    which is a Social Calendar Product making it easier for people to plan,
    discover, and manage their social lives.
  - Used Swift Programming Language. The App was built using a custom GRPC-based
    state management layer with UI built on Native Components and
    [LayoutKit](https://github.com/linkedin/LayoutKit).
  - Delivered quick feature iterations, pixel-perfect design specs
    implementations, and fast, buttery-smooth iOS experiences.

- [Oculus](https://www.oculus.com/?locale=en_US) - Aug 2017 - Nov 2018

  - Worked on a product called [Oculus Dash](https://www.youtube.com/watch?v=SvP_RI_S-bw),
    which is an Overlay VR system built into the Oculus 2.0 OS.
  - Used React Native, React VR and Flow JS to build the application. Occasionally
    worked on the C++ stack, which was using an in-house rendering engine
    designed for lightening fast load times.
  - Worked on a system for tracking the movement / placement of 2D window overlays
    in 3D space. Also worked on setting up some multi-threaded ReactVR APIs that
    communicated directly with the C++ ReactVR stack.

- Facebook - June 2015 - Nov 2017

  - Worked on internal tooling around (1) performance / latency tracking of Web
    Services and (2) Data Center Cluster Management.
  - Used Javascript, FlowJS, Redux, an in-house Flux-like framework, SVG,
    WebGL, and ThreeJS.
  - Developed high-quality and fast web experiences using WebGL technologies and
    the Web-native SVG api.

## Programming Languages and Frameworks

- Very Good: Typescript / Javascript, Swift, Python, React, Redux, [Flow JS](https://flow.org/), NumPy
- Good: ThreeJS, PyTorch, PyTorch, [GRPC](https://grpc.io/), Docker, Kubernetes, Pandas, Matplotlib, [GraphQL](https://graphql.org/)
- Okay: Figma, Objective-C, TravisCI, C++, [Framer](https://www.framer.com/), Java

## Relevant Coursework

- [Udemy PyTorch for Deep Learning](https://www.udemy.com/course/pytorch-for-deep-learning-with-python-bootcamp/) - Jan 2020

  - A great PyTorch introductory course.

- [Coursera Deep Learning Specialization by Andrew Ng](https://www.coursera.org/specializations/deep-learning) - Jan 2020

  - An introduction into Deep Learning topics.
  - Includes courses for Convolution Neural Networks, and Sequence Models.

- [Coursera Wash U Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning) - Jun 2016

  - 4-Course Specialization on General Machine Learning topics.
  - Includes great introductory material on linear and logstical regression,
    clustering, tree-based classifiers, gaussian mixture models, and recommendation
    based algorithms.

- [Vanderbilt University BS in Math and Computer Science](https://www.vanderbilt.edu/)
  - Class of 2015, Cum Laude
  - Double-Majored in Math and Computer Science

## Other Hobbies

- I am an active member of the [Bahá'i Community](https://www.bahai.org/) and have
  worked on a number of local community projects.
