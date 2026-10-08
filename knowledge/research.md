# Research

## Thermal-switching battery composite (Samsung Semiconductor Research Fellowship)

- Role: Samsung Semiconductor Research Fellow, January 2026 – present, with the Artie McFerrin Department of Chemical Engineering at Texas A&M.
- Goal: mitigate lithium-ion battery thermal runaway with a sprayable, passive thermal-switching composite.
- How it is designed to work: the material conducts heat normally, then switches to insulating when indium melts out at high temperature. Calcium carbonate (CaCO3) releases CO2 to help suppress fire, and a retained titanium framework provides structural support.
- What he did: ran the synthesis end to end — mixed CaCO3, indium and titanium nanowires, compacted pellets, and heat-treated them at 900 °C for 1 hour. Examined structure and conductive pathways with SEM cross-sections across 4+ prototype iterations.
- Results so far: compared heat-transfer response across pellets with 50–70 wt% indium using hot-plate heating and top-surface temperature measurements. Identified 65 wt% indium as the best-performing formulation tested, with improved structural integrity.
- Plain-English summary: when one battery cell overheats it can set off its neighbors. He is developing a coating that passes heat normally but turns into an insulator when things get dangerously hot, acting like a fuse for heat.

## Switchable thermal barriers — simulation study (technical report)

- A computational companion to the battery-safety work: a technical report (October 2026, not peer reviewed) titled "Temperature-switchable thermal barriers against thermal runaway propagation: a one-dimensional finite-volume study".
- He built a transient 1D finite-volume heat-transfer model of a five-cell lithium-ion stack in Python, with Arrhenius self-heating, a smooth temperature-dependent barrier conductivity, and convective cooling at the stack ends.
- Findings (illustrative parameters, so conclusions are qualitative):
  - A 2 mm switchable barrier kept the normal-operation peak at 38.0 °C (the same as a conductive barrier), versus 64.5 °C with an aerogel-like insulator, while confining runaway to the trigger cell.
  - A conductive barrier let runaway spread to all five cells within about a minute.
  - A sweep of 361 barrier designs showed containment depends mainly on one quantity: the barrier's hot-state conductance (k_off / L), which needed to stay below about 32 W/m²·K for the chosen cooling.
  - A switch-temperature sweep found a window of roughly 38–175 °C where the switch both cools and protects.
  - The solver conserves energy to round-off and was verified against analytical, ODE-solver and mesh-convergence tests.
- Plain-English summary: he simulated a battery pack to test a barrier that lets heat escape while cells are cool but blocks it once a cell fails. It kept cells as cool as a normal heat-spreading barrier day to day, yet stopped the chain reaction.
- Paper and code are public (see links: switchable-barrier-paper, switchable-barrier-code).

## Silicon carbide from polymer precursors (Texas A&M)

- Role: Silicon Carbide (SiC) Researcher, August 2025 – present, Artie McFerrin Department of Chemical Engineering, Texas A&M.
- Goal: convert liquid polycarbosilane (PCS) into electrically conductive silicon carbide for RF susceptor applications (materials that heat up in a radio-frequency field), targeting the lowest pyrolysis temperature that still gives conductivity.
- What he did: ran the synthesis end to end, from liquid PCS through degassing, curing, resting and pyrolysis; completed 10+ controlled runs at 800–1200 °C, varying temperature, ramp rate and atmosphere.
- Results: narrowed the onset of measurable electrical conductivity to pyrolysis temperatures between 900 and 1000 °C using four-point probe measurements, guiding later trials in that range.
- Characterization: measured ceramic yield and microstructure with TGA and SEM, and evaluated RF heating response to see how conversion temperature affected electromagnetic coupling and heat generation.
- Plain-English summary: he turns a liquid polymer into a ceramic by baking it, and works out how hot you need to bake it for the ceramic to conduct electricity, so it can be heated with radio waves.

## Semiconductor materials processing

- Across his work he has hands-on experience with photolithography and overlay metrology (Samsung), pyrolysis and polymer-derived ceramics (SiC research), composite synthesis and heat treatment (battery fellowship), thermal testing, and statistical process control.
