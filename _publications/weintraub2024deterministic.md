---
title: "Deterministic Risk-Aware Path Planning Around Multiple Threats"
collection: publications
permalink: /publication/weintraub2024deterministic
date: 2024-04-16 01:00:00 +0500
venue: 'AIAA Defense'
pubtype: 'presentation'
authors: 'I. Weintraub, A. Wolek, A. Von Moll, D. Casbeer, S. G. Manyam'
excerpt_separator: ""
---
Previous methods for avoiding dynamic engagement zones leverage the calculus of variations to obtain optimal path plans for avoiding risk and reaching a desired target location [1,2]. While this method is deterministic; it scales poorly as the number of engagement zones increases. Furthermore, it is inherently sensitive to initial guesses and finding local minimums can be problematic. This talk presents a novel approach that uses deterministic approaches to obtain a set of feasible flight plans for reaching the desired destination and reports when no such plan exists. Furthermore, it uses an efficient scheme for feeding initial guesses to a nonlinear program solver that provides flyable path plans that mitigate risk. Lastly, a tool is developed that measures the risk of the flight path for avoiding a large field of engagement zones, providing useful information to improve battle management.
The solution process begins with using the location of each weapon engagement zone and associated model to obtain a Voronoi partition of the environment. This partitioning is used to construct a feasibility graph signifying navigation through each pair of weapon engagement zones. Once constructed each edge of the graph borders two opposing weapon engagement zones for which the target vehicle aims to navigate between. If the pair of engagement zones can not be penetrated due to the distance and size of those zones; then the associated edge of the graph is deleted. This process is iteratively performed until each edge has been evaluated. Upon completion of the feasibility graph, path plans are attained using graph-based search to minimize the time of arrival. Next, the provided solution is fed to a nonlinear program solver that smooths the solution or solutions from the feasibility path according to the vehicle dynamics. The resulting solutions are analyzed through a simplified simulation to assess risk and time of arrival. 
Presented are the methods used to solve this navigational problem, results of the simulated trajectories, and future research directions.
[1] Isaac E. Weintraub, Alexander Von Moll, Christian A. Carrizales, Nicholas Hanlon and Zachariah E. Fuchs. &quot;An Optimal Engagement Zone Avoidance Scenario in 2-D,&quot; AIAA 2022-1587. AIAA SciTech 2022 Forum. January 2022.
[2] Optimal Trajectories for Aircraft Avoidance of Multiple Weapon Engagement Zones, Patrick M. Dillon, Michael D. Zollars, Isaac E. Weintraub, and Alexander Von Moll, Journal of Aerospace Information Systems 0 0:0, 1-6.
