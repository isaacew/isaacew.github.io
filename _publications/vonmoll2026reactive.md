---
title: "Reactive Vehicle Guidance using Dynamic Maneuvering Cue"
collection: publications
permalink: /publication/vonmoll2026reactive
date: 2026-01-06 01:00:00 +0500
venue: 'SciTech (<b><i>Accepted</i></b>)'
pubtype: 'conference'
authors: 'A. Von Moll, I. Weintraub'
excerpt_separator: ""
---
Recent approaches for navigating among dynamic threat regions (i.e., weapon engagement zones) have focused on planning entire trajectories. Moreover, the allowance for penetration into these threat regions was based on heuristic measurements of risk    This paper offers an approach for a more reactive (i.e., feedback-based) guidance that is based on closed-form analytical expressions and thereby suitable for onboard, real-time execution. In addition, a risk measurement is formulated based upon the concept of Dynamic Maneuvering Cue (DMC) which measures the amount of turn a vehicle would need to take in its current state in order to put itself outside the threat region. This approach is then extended to handle multiple threat regions simultaneously (with minimal additional computational complexity). Finally, the DMC constraint is applied to a simple feedback controller as well as a model predictive controller (MPC). The MPC shows better performance but at the cost of having to solve an optimization problem online versus the meager computational burden associated with the simple controller. This approach, which is based on assuming the threats are adversarial, may be used as a conservative method for collision avoidance and deconfliction.
