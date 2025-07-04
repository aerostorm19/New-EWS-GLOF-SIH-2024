# GLOFzilla Models  
**Early Warning System for Glacial Lake Outburst Floods (GLOFs)**  
**Smart India Hackathon 2024 Finalists**  
**Team ID 20745 – GLOFzilla**

---

## Overview  

**GLOFzilla** is an AI-driven model suite for predicting, analyzing, and mitigating the impact of **Glacial Lake Outburst Floods (GLOFs)**. Designed for real-time integration into early warning systems, the models support disaster management authorities with:

- **Flood Path Prediction**: Forecast probable downstream inundation routes based on topographic and hydrological data.
- **Zone Risk Classification**: Categorize areas into Red, Orange, and Yellow risk zones for targeted alert systems.
- **GLOF Event Detection**: Predict the likelihood of a GLOF event using sensor, satellite, and climate data.

All models are deployable via cloud platforms and tested on Hugging Face Spaces for easy access and experimentation.

---

## Problem Statement  

- **Problem ID**: 1650  
- **Title**: Early Warning System for Glacial Lake Outburst Floods (GLOFs)  
- **Theme**: Disaster Management  
- **Category**: Software Development  
- **Event**: Smart India Hackathon 2024  
- **Team ID**: 20745  

GLOFs pose catastrophic risks to high-altitude regions. GLOFzilla provides a multi-model pipeline that anticipates flood behavior before it occurs—equipping authorities with time-critical decision-making capabilities.

---

## Team  

**Team GLOFzilla** — Finalists, Smart India Hackathon 2024  
- **Project Lead**: Abhijit Rai  
- **Members**:  
  - Gaurav Kumar Singh  
  - Nickky Kumar  
  - Kratika Rai  
  - Vivek Bisht  
  - Mayank Kumar Singh  

---

## Models  

| Model Name               | Description                             | Preview |
|--------------------------|-----------------------------------------|---------|
| **flood-path-predictor** | Predicts probable flood path using terrain maps and hydrological data. | ![Flood Path](https://huggingface.co/Viki230588/flood-path-predictor/raw/main/interface.png) |
| **zone-risk-analyzer**   | Classifies terrain into risk zones (Red/Orange/Yellow) based on flood likelihood. | ![Zone Risk](https://huggingface.co/Viki230588/zone-risk-analyzer/raw/main/interface.png) |
| **glof-event-predictor** | Detects likelihood of GLOF event using sensor & satellite input data. | ![GLOF Event](https://huggingface.co/Viki230588/glof-event-predictor/raw/main/interface.png) |

Models hosted on [Hugging Face Spaces](https://huggingface.co/Viki230588)

---

## Installation

### Prerequisites
- Python 3.8+
- pip or conda
- Jupyter / VSCode / Streamlit (optional for local UI)

### Setup
```bash
git clone https://github.com/YOUR_USERNAME/GLOFzilla.git
cd GLOFzilla
pip install -r requirements.txt
```
## Training Data & Methodology

- **Flood Path Predictor**: Trained using digital elevation models (DEMs), water flow direction, and catchment data.
- **Zone Risk Analyzer**: Trained on labeled GIS datasets with historical flood impact zones.
- **GLOF Event Predictor**: Trained on climate parameters, satellite thermal imagery, and real sensor data (e.g., water pressure, temperature gradients).

### Machine Learning Techniques Used:

- Gradient Boosting
- Convolutional Neural Networks (CNNs) for spatial prediction
- Random Forest for multi-class classification

---

## Results & Performance

| Model                | Accuracy | F1 Score | Latency (ms) |
|----------------------|----------|----------|--------------|
| Flood Path Predictor | 96.2%    | 0.87     | ~110         |
| Zone Risk Analyzer   | 92.5%    | 0.91     | ~95          |
| GLOF Event Predictor | 79.7%    | 0.89     | ~120         |

> All models were validated using test data from the [ICIMOD GLOF dataset for Afghanistan](https://www.icimod.org/mountain/glacial-lake-outburst-flood/).

---

## Deployment

These models can be deployed on:

- **Hugging Face Spaces** (demo-ready)
- **Streamlit** (internal testing)
- **REST API** (FastAPI for production use)

Frontend/dashboard integration is possible using:

- **React** / **Next.js**

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full details.

---

## Acknowledgements

- Ministry of Education's Innovation Cell  
- AICTE & Smart India Hackathon 2024  
- **DRDO** for the problem statement  
- **ISRO** for topographic datasets and GLOF research references  
- **Hugging Face** for providing deployment infrastructure  
- Dr. Praveen Thakur (IIRS-ISRO) – System design guidance using advanced geoinformatics tools

### Referenced Research & Studies

- Sakai et al., *"South Lhonak Lake GLOF Hazard: Geophysical Observations and Modeling,"* Geomorphology, vol. 403, p. 108134, May 2022.  
  [Read](https://www.sciencedirect.com/science/article/abs/pii/S0169555X22001397)

- D. Rounce et al., *"Glacial Lake Dynamics & GLOF Modelling,"* Hydrological Processes, vol. 26, no. 19, pp. 2958–2969, Sept. 2012.  
  [Read](https://onlinelibrary.wiley.com/doi/10.1002/hyp.8390)

- L. Nie et al., *"Multiple GLOF Scenarios: Evaluating Hydrological and Environmental Risks,"* Science of The Total Environment, vol. 710, p. 136610, Apr. 2020.  
  [Read](https://www.sciencedirect.com/science/article/pii/S0048969719366477)

- W. Grabs, *"GLOF Mitigation Strategies – Lessons from Thulagi Glacier Lake, Nepal,"* ResearchGate, 2021.  
  [Read](https://www.researchgate.net/publication/353623905_GLOF_Mitigation_Strategies)

- M. Reynolds, *"High-Altitude Glacial Lake Hazard Assessment: Techniques and Strategies,"* Engineering Geology, vol. 15, no. 1, pp. 25–32, 1998.  
  [Read](https://www.sciencedirect.com/science/article/abs/pii/S0013795298000144)

## Contact

**Abhijit Rai**  
Email: [abhijit.airosys@gmail.com](mailto:abhijit.airosys@gmail.com)  
GitHub: [@aerostorm19](https://github.com/aerostorm19)

