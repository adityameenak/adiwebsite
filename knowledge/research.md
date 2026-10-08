# Research

## Thermal-switching battery composite (Samsung Semiconductor Research Fellowship)

- Role: Samsung Semiconductor Research Fellow, January 2026 – present, with the Artie McFerrin Department of Chemical Engineering at Texas A&M.
- Goal: mitigate lithium-ion battery thermal runaway with a sprayable, passive thermal-switching composite.
- How it is designed to work: the material conducts heat normally, then switches to insulating when indium melts out at high temperature. Calcium carbonate (CaCO3) releases CO2 to help suppress fire, and a retained titanium framework provides structural support.
- What he did: ran the synthesis end to end — mixed CaCO3, indium and titanium nanowires, compacted pellets, and heat-treated them at 900 °C for 1 hour. Examined structure and conductive pathways with SEM cross-sections across 4+ prototype iterations.
- He has also fabricated drop-cast composites incorporating calcium carbonate microsalt crystals, indium and titanium nanowires, investigating formulations meant to transition autonomously from conduction to insulation at critical temperatures, as a step toward a sprayable protective material.
- He characterized thermal conductivity across formulations to see how porosity and composition (indium content) influence heat transport.
- Results so far: compared heat-transfer response across pellets with 50–70 wt% indium using hot-plate heating and top-surface temperature measurements. Identified 65 wt% indium as the best-performing formulation tested, with improved structural integrity.
- Plain-English summary: when one battery cell overheats it can set off its neighbors. He is developing a coating that passes heat normally but turns into an insulator when things get dangerously hot, acting like a fuse for heat.

## Switchable thermal barriers — simulation study (technical report)

Public: technical report (PDF on his portfolio), plain-English explainer, and open-source code on GitHub (adityameenak/switchable-barrier-runaway), with automated tests. Report dated October 2026; not peer reviewed. All model parameters are illustrative order-of-magnitude placeholders, so conclusions are qualitative, not predictions for a real cell.

**The question.** A barrier between battery cells has two conflicting jobs: spread heat to the cooling system in normal use, but block a failing cell's heat during runaway. A temperature-switchable barrier (conducts when cool, insulates when hot) could do both. The project asks when a switch actually delivers both benefits, and what it must achieve (hot-state conductivity, thickness, switch temperature).

**The model.**
- One-dimensional transient finite-volume model of a five-cell lithium-ion stack: five 10 mm cells with 2 mm barriers between them, convective cooling at both ends (h = 100 W/m²·K, 25 °C).
- Heat equation with temperature-dependent conductivity plus a reaction heat source.
- Cell self-heating: single-step Arrhenius kinetics for a reaction progress variable (0 = fresh, 1 = fully reacted), with activation energy 169 kJ/mol and an adiabatic temperature rise of 600 K.
- Switchable barrier: smooth, reversible sigmoid between k_on = 5 W/m·K (cold) and k_off = 0.05 W/m·K (hot), switch temperature 120 °C, blended in log space so each barrier node switches on its own local temperature.
- Compared four designs: no barrier, static conductor (5 W/m·K), static aerogel-like insulator (0.03 W/m·K), and the switchable barrier. Trigger: cell 1 starts at 300 °C.

**Numerical methods.**
- Finite volumes on a layer-conforming mesh (40 volumes per cell, 12 per barrier). Interface conductance uses the distance-weighted harmonic mean — the exact series resistance — so heat doesn't leak through the insulator artificially.
- Operator splitting: an exact exponential update for the reaction step (stable for any time step, keeps progress between 0 and 1), then implicit backward-Euler conduction solved as a tridiagonal system with SciPy.
- Adaptive time step limited to ~2 K of reaction heating per step while a node is igniting.
- Energy bookkeeping (thermal + unreleased chemical energy + boundary losses) conserves energy to round-off, about 10⁻¹² relative.
- Normal operation solved to steady state by pseudo-transient continuation.

**Verification.** Checked against analytical steady-conduction solutions, an ODE-solver reference for the reaction, energy conservation, and mesh/time-step convergence (roughly second-order; default mesh within 2% of the finest).

**Key insight from the convergence study.** Arrhenius constants fitted to runaway onset, extrapolated to a ~900 °C burning cell, give rates so high that the reaction front is ~10⁻⁷ m thin — unresolvable on any practical mesh, so the propagation time didn't converge (it drifted from 14.3 to 8.8 s as the mesh was refined). Adding a documented reaction-rate ceiling (1 s⁻¹) leaves onset untouched, gives a ~0.6 mm front the mesh can resolve, and restores convergence. He flags that ideally the cap would be fitted to measured runaway durations.

**Results.**
| Design | Normal-use peak | Cells in runaway |
|---|---|---|
| No barrier | 37.8 °C | 5 of 5 |
| Static conductor | 38.0 °C | 5 of 5 (whole stack within about a minute) |
| Static insulator | 64.5 °C | 1 of 5 |
| Switchable | 38.0 °C | 1 of 5 |
- The switch keeps the conductor's cool normal-use temperature and the insulator's containment. The insulator buys containment at a 27 K hotter steady state.
- During runaway, the hot face of the first switchable barrier turns insulating and holds a ~700 K temperature drop across a couple of millimetres, while its cool far side keeps conducting.
- Design map (361 simulations, thickness 0.5–5 mm × hot-state conductivity 0.02–1 W/m·K): outcomes are all-or-nothing (1 or 5 cells), and containment is governed by a single quantity, the hot-state conductance k_off/L, which must stay below about 32 W/m²·K (about a third of the end cooling).
- A switch-temperature sweep found a window of roughly 38–175 °C where the switch both keeps cells cool and contains runaway.

**Limitations and next steps (his own).** It's 1D with illustrative parameters, so the ends are the only heat sink. Next steps he identifies: fit the switch conductivity to measured data for a real material, use multi-step chemistry fitted to calorimetry, move to 2D with side cooling, and compare against a commercial finite-element model such as COMSOL.

**Plain-English summary.** He simulated a battery pack to test a barrier that lets heat escape while cells are cool but blocks it once a cell fails. It kept cells as cool as a normal heat-spreading barrier day to day, yet stopped the chain reaction — and showed the one number a real material would need to hit.

## Silicon carbide from polymer precursors (Texas A&M)

- Role: Silicon Carbide (SiC) Researcher in the Green Group, August 2025 – present, Artie McFerrin Department of Chemical Engineering, Texas A&M.
- Goal: convert liquid polycarbosilane (PCS) into electrically conductive silicon carbide for RF susceptor applications (materials that heat up in a radio-frequency field), targeting the lowest pyrolysis temperature that still gives conductivity.
- What he did: ran the synthesis end to end, from liquid PCS through degassing, curing, resting and pyrolysis; completed 10+ controlled runs at 800–1200 °C, varying temperature, ramp rate and atmosphere.
- Varied temperature, ramp rate and atmosphere to identify conditions for electrical conductivity and RF susceptor performance.
- Results: narrowed the onset of measurable electrical conductivity to pyrolysis temperatures between 900 and 1000 °C using four-point probe measurements, guiding later trials in that range.
- Characterization: measured ceramic yield and microstructure with TGA and SEM, and evaluated RF heating response to see how conversion temperature affected electromagnetic coupling and heat generation.
- Plain-English summary: he turns a liquid polymer into a ceramic by baking it, and works out how hot you need to bake it for the ceramic to conduct electricity, so it can be heated with radio waves.

## Semiconductor materials processing

- Across his work he has hands-on experience with photolithography and overlay metrology (Samsung), pyrolysis and polymer-derived ceramics (SiC research), composite synthesis and heat treatment (battery fellowship), thermal testing, and statistical process control.
