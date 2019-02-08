---
title: "Machine Learning Applications in Complex Control Systems"
collection: publications
permalink: /publication/vonmoll2015machine
date: 2015-12-01 01:00:00 +0500
venue: 'Georgia Institute of Technology'
paperurl: 'https://www.slideshare.net/AlexanderVonMoll/vonmollpaper'
pubtype: 'academic'
authors: 'A. Von Moll'
excerpt_separator: ""
---
The intersection between machine learning and control theory is emerging rapidly; many rich applications are currently being developed. This report explores one particular area of interest: trajectory optimization. The Linear Quadratic Regulator and Linear Quadratic Gaussian algorithms are introduced as predecessors to the Iterative Linear Quadratic Gaussian (iLQG) algorithm, which is re-derived in this report and demonstrated on 3 systems of interest: cartpole, double cartpole, and quadrotor. iLQG is robust and widely applicable to a vast number of different systems. Probabilistic Differential Dynamic Programming (PDDP) is introduced as an important extension to iLQG which incorporates uncertainty into the trajectory optimization process. The conceptual advances presented in this report were centered around the use of a Gaussian Process Regression Network (GPRN) to represent the unknown system dynamics in lieu of the standard Gaussian Process representation employed by PDDP. GPRNs offer a more sophisticated noise model and a more adaptive regression framework. More speciffcally, they incorporate input-dependent noise and signal correlation between multiple outputs. This should enhance the predictive capability of the algorithm to represent the unknown system dynamics. Work remains on fully incorporating GPRN into a PDDP-like algorithm: effort continues in the areas of understanding variational Bayes and variational message passing for learning GPRN hyperparameters, and in creating a MATLAB implementation.

[Download paper here](https://www.slideshare.net/AlexanderVonMoll/vonmollpaper)