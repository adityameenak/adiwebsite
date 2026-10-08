# Experience

## Samsung Austin Semiconductor — Photolithography Innovation & Metrology Intern

**Overview**
- Summer 2026 internship (May–July 2026, completed) at Samsung Austin Semiconductor in Austin, Texas.
- Team: Photo Innovation and Metrology (PIM), within the Photolithography department.
- Focus: using software, data analytics and process engineering to improve semiconductor manufacturing — process control, manufacturing automation, data analytics and defect detection.
- Main tools: Python and SQL; Streamlit for engineer-facing apps; statistical process control; machine learning (CNNs). Worked around lithography scanners, spinner/track systems and metrology equipment.
- The common thread: he built software to solve physical manufacturing problems — replacing manual engineering work (Excel-based calculations, manual image review, trial-and-error equipment qualification, manual metrology resets) with tools engineers and technicians could use.
- He did five distinct projects. Their results are separate and should never be combined or attributed to the wrong project.

### 1. Overlay correction application
- Problem: overlay is how precisely each new patterned layer lines up with the layers beneath it. Metrology tools measure misalignment at the point, wafer and lot level, and engineers convert those measurements into correction values for the lithography scanners. Previously this relied on an Excel macro and manual data handling, which was slow, error-prone (calculation and transcription errors) and awkward across many lots and layers.
- What he built: a Python application with a Streamlit interface. An engineer enters a lot ID, a date range and a lithography layer, then runs the calculation.
- How it works: it uses SQL to pull historical overlay metrology records from the fab's internal manufacturing data systems; filters by lot, date and layer; cleans, validates and joins the data; organizes 500+ wafer- and shot-level measurements per lot; and runs a correction algorithm that turns wafer-level measurements into lot-level scanner alignment corrections. It also showed the selected layer's corresponding metrology step sequence.
- Output: the app displays the calculated scanner correction values, formatted so engineers can review them and copy them into the fab's correction system. Calculated corrections were checked against historical metrology behavior, which also helped flag abnormal overlay trends.
- Impact: replaced the Excel-macro workflow with a standardized, faster method; saved about 250 engineering hours per year.
- Not public: the exact correction equations and coefficients, data schema and validation details are internal.

### 2. Photoresist thickness prediction and spin-coater optimization
- Problem: photoresist must be coated at a precise thickness, which depends on spin speed, dispense conditions, material properties and process conditions. Qualifying spin-coater settings meant running test wafers and adjusting equipment by trial and error, costing engineering time and tool capacity.
- What he built: a predictive modeling application using historical process data to relate spin-coater parameters (spin-speed setpoints and dispense parameters) to resulting photoresist thickness.
- What it does: predicts film thickness for a given set of conditions before any physical change, and works backward from a target thickness to recommend the spin-speed setpoint needed — moving qualification from trial and error toward data-driven optimization. Predictions supported keeping thickness within a 10 Å (1 nm) SPC control window.
- Impact: about a 15% reduction in test-wafer qualification time, with fewer manual adjustments and more consistent thickness.
- Not public: the model type, input features and validation results.

### 3. CNN defect classification
- Problem: spinner/track equipment produces image data that can reveal defects and abnormal processing. Technicians reviewed these images manually, which was repetitive, didn't scale, and could catch problems late.
- What he built: a convolutional neural network (PyTorch) that classifies defects from spinner-tool imagery. Images are first converted into FFT (fast Fourier transform) heatmaps — a frequency-domain view that makes periodic and abnormal patterns stand out — which are then fed to the CNN.
- Workflow: equipment image → FFT heatmap → CNN → defect classification, designed to flag abnormal images so technicians get alerted and can investigate. It automated real-time review of 1,000+ images per day.
- Not public: architecture, training-set size, defect classes and accuracy figures.

### 4. Throughput troubleshooting with statistical process control
- Problem: a lithography track system was processing fewer wafers than expected, creating a bottleneck (longer cycle times, lower equipment utilization).
- What he did: analyzed equipment performance with individual and moving-range (I-MR) control charts, which track each measurement and the change between consecutive measurements to expose shifts and abnormal variation. The analysis traced the problem to wafer handling downstream, and specifically to a degraded buffer robot arm (buffer-unit transfer mechanism) that was moving wafers too slowly.
- Impact: the corrective action recovered 300–400 wafers per day, roughly 5% of the equipment's capacity.
- This result came from the troubleshooting work, not from the overlay application.

### 5. Overlay metrology skip-factor restoration
- Problem: fabs don't measure every lot; sampling "skip factors" control how often overlay metrology is skipped. Restoring lot-level skip factors to their process-type defaults was a repetitive manual task.
- What he built: automation (Python and SQL) that restores lot-level overlay metrology skip factors to their defaults, eliminating the manual reverts.
- Impact: about 50 department-hours saved per week.

### What he took from it
- Experience across semiconductor process engineering (overlay, photoresist, wafer handling, metrology sampling), production-focused software (data extraction, cleaning and validation; Streamlit apps for non-programmers) and data-driven manufacturing (predictive models and computer vision).
- Plain-English summary: he used Python, SQL, statistics and machine learning to turn fab data into tools that automate engineers' work, tighten process control, catch defects and keep wafers moving.

<!--
TODO(Adi): Still unknown — add only if public-safe:
- Photoresist model type (e.g. regression on spin speed?), inputs, validation.
- CNN architecture / classes / accuracy; whether alerts went live in production.
- Which I-MR variable exposed the robot arm issue.
- Dates: your notes say May 18 – July 31, but the website says May–Aug 2026. Make them match.
-->

## Samsung Semiconductor Research Fellow (with Texas A&M Chemical Engineering)

- Dates: January 2026 – present, College Station, Texas.
- Affiliation: Samsung Semiconductor & the Artie McFerrin Department of Chemical Engineering at Texas A&M.
- See research.md ("Thermal-switching battery composite") for the full description.

## Silicon Carbide (SiC) Researcher — Texas A&M

- Dates: August 2025 – present, College Station, Texas.
- Affiliation: Artie McFerrin Department of Chemical Engineering, Texas A&M University.
- See research.md ("Silicon carbide from polymer precursors") for the full description.

## Analog Devices

<!--
TODO(Adi): Analog Devices is not on the portfolio or resume yet. If this is a
past role, add it here with dates and public-facing details. If it is upcoming,
write it as upcoming (e.g. "Incoming ... intern, starting <month year>").
Until then, adi.ai will say it has no information about Analog Devices.
-->

## Other experience

<!-- TODO(Adi): Add any other roles (TA positions, clubs, leadership) here. -->
