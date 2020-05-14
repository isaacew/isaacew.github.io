---
title: "Evolutionary Design of Cooperative Predation Strategies"
collection: publications
permalink: /publication/vonmoll2020evolutionary
date: 2020-08-24 01:00:00 +0500
venue: 'Conference on Games (<b><i>Accepted</i></b>)'
pubtype: 'conference'
authors: 'A. Von Moll, P. Androulakakis, Z. Fuchs, D. Vanderelst'
excerpt_separator: ""
---
In this paper a scenario is considered in which a group of predators cooperate to maximize the number of prey captures over a finite time horizon on a two-dimensional plane. The emphasis is on developing predator strategies, and thus the behavior of the prey agents is fixed to a Boids-like flocking model which incorporates avoidance of nearby predators. At each time instant, the predators have control authority over their heading angle; however, we restrict the headings to be governed by one of five different pre-specified behaviors. No communication occurs between the predator agents - each agent determines its own control without knowledge of what the other predators will implement; thus, the predator strategies are fully decentralized. The full state space of the system is collapsed to a set of features which is independent of the number of prey. An evolutionary algorithm is used to evolve an anchor point controller wherein the anchor point lies in the feature space and has a particular predator behavior associated, thus providing a candidate solution to the question of &quot;what to do when&quot;. The two predator case is the focus in this work, although the ideas could be applied to larger groups of predators. The strategies resulting from the evolutionary algorithm favor aiming at the nearest prey mostly, and also avoiding having the predators getting too close and then pursuing the same prey. Thus useless behaviors are generally not present among the elite at the end of the evolutionary process.
