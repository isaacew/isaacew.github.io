---
title: "Stochastic Risk-Aware Path Planning Around Multiple Threats"
collection: publications
permalink: /publication/milutinovic2024stochastic
date: 2024-04-16 01:00:00 +0500
venue: 'AIAA Defense'
pubtype: 'presentation'
authors: 'D. Milutinović, A. Von Moll, I. Weintraub, D. Casbeer'
excerpt_separator: ""
---
Description: Recent efforts in planning paths for a vehicle around dynamic engagement zones have been based upon optimal control solved via nonlinear program comprised of a pseudospectral direct collocation of the dynamics and constraints. The engagement zone(s) rotate and scale based upon the position and aspect angle of the vehicle, respectively. Initially, the problem setup was based upon a vehicle navigating around a stationary, gimballed threat to reach a specified goal position; the entire engagement took place on a 2D plane [1]. As a follow-on effort, two dynamic engagement zones were considered along with an added vehicle turning-rate constraint [2]. In all of these works, the solution consisted of a single optimal trajectory associated with a particular initial condition. In this presentation, three extensions are considered and demonstrated: 1) stochasticity via the inclusion of a Wiener process (Brownian motion) in the dynamics, 2) computation of an optimal feedback control law, and 3) multiple engagement zones (even beyond 2). The stochastic process may represent uncertainty due to wind, other environmental factors, or position measurement errors. In the case of a single engagement zone the stochastic process may represent the vehicle’s uncertainty about the location of the engagement zone. Regarding the feedback control law, this is a much more powerful result than a single path plan as it requires that the control law be computed once, a priori, and can then be used for any position in the state space, whereas the existing path plan-based solutions require re-computation for each new position in the state space. Having the feedback control law and Value function everywhere is also illustrative of the overall behavior of optimal trajectories – e.g., some optimal trajectories fly around while others fly between neighboring engagement zones. Lastly, the methodology can be applied to larger numbers of engagement zones. When based on Value iteration [3], the Value function computation scales at least sub-exponentially with the number of engagement zones.
[1] Isaac E. Weintraub, Alexander Von Moll, Christian A. Carrizales, Nicholas Hanlon and Zachariah E. Fuchs. &quot;An Optimal Engagement Zone Avoidance Scenario in 2-D,&quot; AIAA 2022-1587. AIAA SciTech 2022 Forum. January 2022.
[2] Optimal Trajectories for Aircraft Avoidance of Multiple Weapon Engagement Zones, Patrick M. Dillon, Michael D. Zollars, Isaac E. Weintraub, and Alexander Von Moll, Journal of Aerospace Information Systems 0 0:0, 1-6.
[3] Thrun, S., Burgard, W., and Fox, D., 2005, Probabilistic Robotics, The MIT Press, Cambridge, MA. 

Notes: Alexander Von Moll from Air Force Research Laboratory will be presenting on behalf of the author due to security restrictions in place at the AIAA Defense.
