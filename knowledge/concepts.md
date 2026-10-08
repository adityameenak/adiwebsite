# Background concepts (general, not specific to Adi)

This section is general industry and engineering background, used to explain the
context of Adi's work. It does NOT describe how Adi's specific tools were built.
When using it, make clear it is general background ("In general, …" / "Typically, …"),
and keep it separate from what Adi specifically did.

## Photolithography and overlay

- A chip is built from dozens of patterned layers stacked on a silicon wafer. Photolithography prints each layer's pattern using a scanner that projects light through a mask onto a light-sensitive photoresist.
- Overlay is how well one layer lines up with the layer beneath it. Overlay errors are typically only a few nanometres, but if layers misalign, transistors and wires don't connect properly, which hurts yield.
- Overlay metrology measures the misalignment at marks on the wafer after a layer is patterned. Measurements are usually taken at many points per wafer and per exposure field ("shot").
- Overlay correction, in general: the measured errors are fitted to a model of how the scanner places patterns — e.g. translation (x/y shift), rotation, magnification/scaling, and higher-order terms, at wafer level and within each exposure field. The fitted coefficients are fed back to the scanner as corrections for the next lots, usually with a feedback (run-to-run) control loop.
- Metrology sampling / skip factors: fabs don't measure every wafer of every lot; sampling settings decide how often measurement is skipped to save metrology tool time. If those settings drift from their defaults, measurement coverage or tool capacity suffers.

## Track, spinner tools and defects

- The track is the equipment linked to the scanner that coats wafers with photoresist (on a spinner), bakes and develops them, moving wafers between modules with robotic transfer and buffer units.
- Spin-coating defects (streaks, swirls, comets, uneven coating) can show up as visual patterns in wafer images.
- An FFT (fast Fourier transform) converts an image into its frequency content, which can make periodic or directional patterns stand out; a heatmap of FFT features can be easier for a model to classify than raw pixels.
- A convolutional neural network (CNN) is a type of deep-learning model suited to image classification.

## Statistical process control

- I-MR charts (individual and moving-range charts) track a single measurement over time and the change between consecutive points, with control limits. Points outside limits or non-random patterns flag a process or equipment change worth investigating.

## Battery thermal runaway

- Lithium-ion cells contain chemicals that start to decompose exothermically above roughly 150 °C. The heat speeds up the reactions, which release more heat — a feedback loop called thermal runaway that can take a cell to several hundred degrees.
- Propagation is when one failing cell heats its neighbor past that threshold, triggering a chain reaction through a battery pack.
- Inter-cell barriers face a tradeoff: a conductive barrier helps spread and remove heat in normal use but passes a failing cell's heat to its neighbor; an insulating barrier (e.g. aerogel) blocks propagation but traps heat in normal use, which ages cells faster. A thermal switch aims to do both.

## Silicon carbide and polymer-derived ceramics

- Silicon carbide (SiC) is a hard, heat-resistant ceramic and wide-bandgap semiconductor used in power electronics and high-temperature applications.
- Polymer-derived ceramics are made by shaping a preceramic polymer (such as polycarbosilane, PCS), curing it, and then pyrolyzing it — heating in an inert atmosphere so it converts to ceramic. Pyrolysis temperature, ramp rate and atmosphere control the ceramic's structure, yield and properties such as electrical conductivity.
- An RF susceptor is a material that absorbs radio-frequency energy and heats up; it needs enough electrical conductivity to couple with the field.
- Characterization tools: TGA (thermogravimetric analysis) measures mass loss on heating (ceramic yield); SEM (scanning electron microscopy) images microstructure; four-point probe measures electrical resistivity; XRD identifies crystal phases; FTIR identifies chemical bonds.
