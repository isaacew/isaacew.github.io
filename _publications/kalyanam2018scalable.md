---
title: "Scalable and Exact MILP Methods for UAV Persistent Visitation Problem"
collection: publications
permalink: /publication/kalyanam2018scalable
date: 2018
venue: 'Conference on Control Technology and Applications'
paperurl: 'https://sites.google.com/site/krishnakalyanam/ccta2018.pdf'
---
We are interested in the persistent surveillance of an area of interest comprised of stations/ data nodes. The data collection task is undertaken by a UAV which autonomously executes the mission. Each node has a priority/ weight associated with it that characterizes the relative importance between timely collection of data from the nodes. In this context, a prudent performance metric is the maximal weighted time between consecutive visits to each node. We wish to minimize the maximum of this metric among all nodes for a given cycle length. Here, the cycle length refers to the total number of nodes (including repeats) visited per cycle. When the cycle length is greater than the number of nodes, some nodes, arguably ones with a higher priority, will be visited more often. We pose the problem as a Mixed Integer Linear Program (MILP), that computes the optimal visit sequence and number of visits to each node for a given cycle length. Not surprisingly, the exact method is not scalable with the number of nodes and the cycle length. We therefore present sub-optimal methods  by directly enforcing a pre-specified number of visits to each node. We present an iterative scheme that computes solutions for increasing cycle length with a recipe for updating the number of visits based on the solution from the previous iteration. We compare the optimal and sub-optimal iterative schemes and show that the sub-optimal scheme is an order of magnitude faster than the optimal scheme with minimal loss in performance.

[Download paper here](https://sites.google.com/site/krishnakalyanam/ccta2018.pdf)
