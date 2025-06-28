# GLOFzilla Models  
**Early Warning System for Glacial Lake Outburst Floods (GLOFs)**  
Smart India Hackathon 2024 Finalists (Team ID 20745: **GLOFzilla**)

---

## Table of Contents
1. [Overview](#overview)  
2. [Problem Statement](#problem-statement)  
3. [Team](#team)  
4. [Models](#models)  
5. [Installation](#installation)  
6. [Usage](#usage)  
7. [Repository Structure](#repository-structure)  
8. [Training Data & Methodology](#training-data--methodology)  
9. [Results & Performance](#results--performance)  
10. [Deployment](#deployment)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Acknowledgements](#acknowledgements)  

---

## Overview  
GLOFzilla is a suite of machine-learning models designed to empower authorities with real-time predictions of Glacial Lake Outburst Floods (GLOFs). Hosted on Hugging Face, these models serve three critical functions:
- **Flood Path Prediction**: Forecast probable downstream inundation routes based on terrain, hydrology and real-time sensor inputs.  
- **Zone Risk Analysis**: Classify catchment and downstream areas into risk categories (Red, Orange, Yellow).  
- **GLOF Event Prediction**: Early-warning classification of potential GLOF events from multimodal sensor & satellite streams.

---

## Problem Statement  
- **ID**: 1650  
- **Title**: Early Warning System for Glacial Lake Outburst Floods (GLOFs)  
- **Theme**: Disaster Management  
- **Category**: Software  
- **Team ID**: 20745  

We developed a web-based EWS that fuses on-site sensors, satellite imagery, machine learning and climate analysis—providing predictive insights, risk zoning and fail-safe alerts to minimize GLOF impacts.

---

## Team  
**GLOFzilla** (Team ID 20745)  
- Finalists, Smart India Hackathon 2024 (Disaster Management)  
- Project Lead: Viki230588 on Hugging Face  
- Collaboration: Geologists, Climate Modellers, Frontend & Backend Engineers  

---

## Models  

| Model                          | Task                                     | Preview                                                                                   |
|--------------------------------|------------------------------------------|-------------------------------------------------------------------------------------------|
| **flood-path-predictor**       | Terrain-based flood-path forecasting     | ![path](https://huggingface.co/Viki230588/flood-path-predictor/raw/main/interface.png)     |
| **zone-risk-analyzer**         | Multi-zone risk classification           | ![zones](https://huggingface.co/Viki230588/zone-risk-analyzer/raw/main/interface.png)       |
| **glof-event-predictor**       | GLOF event probability classification    | ![glof](https://huggingface.co/Viki230588/glof-event-predictor/raw/main/interface.png)     |

Each model’s folder contains a README with:
- Intended use & limitations  
- Input/output schema  
- Sample inference code  


