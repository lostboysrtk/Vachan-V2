# Vachan - A Promise to Morality

![Vachan Logo](https://pplx-res.cloudinary.com/image/upload/v1741530815/user_uploads/vaFaoCPkzLeSSgE/vachan_logo-removebg-preview.jpg)

## Description

Vachan is an AI-powered fact-checking web application designed to combat misinformation and false information. It verifies the accuracy of trending news articles across social media platforms using advanced AI models (including a multilingual BERT-based NLP pipeline for claim classification) and the Google Fact Check API. With features like regional language support (via a translation API) and an interactive bot, Vachan aims to ensure accessibility and reliability for all users. This repository contains the core backend microservices and a React-based frontend.

## Key Features

*   **AI-Driven Fact Checking**: Leverages AI models (mBERT for claim classification) and the Google Fact Check API to validate news articles.
*   **Multilingual Support**: Integrates translation APIs for multilingual claim processing and accessibility.
*   **Modular Microservice Architecture**: Backend built with Flask, comprising separate services for NLP, Fact Checking, and Translation.
*   **React Frontend**: User interface built with React.
*   **Enhanced User Experience & Accessibility**:
    *   Reader Mode for simplified content.
    *   High Contrast Mode for improved readability.
    *   (The interactive "Aria FactBot" and "customizable Dark and Light Modes" mentioned would be further developments on this base.)

## Showcase

*   [Watch the Demo on YouTube](https://www.youtube.com/watch?v=7WnDl5LnKYM)
*   [Website link](https://vachan1.vercel.app/landing)
*   [Access the PPT, Demo Video on Google Drive](https://drive.google.com/drive/folders/1sRW1goXgG2rOL0CsMoWrP8IdkQLm7iZy?usp=sharing)

---

## Technical Details & Setup

### Project Structure

```
.
├── nlp_service/              # mBERT Claim Classification (Flask on port 5001)
│   └── app.py
├── fact_check_service/       # Google Fact Check API Integration (Flask on port 5002)
│   └── app.py
├── translation_service/      # Translation API Integration (Flask on port 5003)
│   └── app.py
├── frontend/                 # React Frontend (usually on port 3000)
│   ├── public/
│   ├── src/
│   └── package.json
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── requirements.txt          # Python dependencies for backend services
└── README.md                 # This file
```

### Prerequisites

*   Python 3.7+ and pip (or pip3)
*   Node.js and npm (or yarn)
*   Access to Google Fact Check API and a valid API key.
*   Access to a Translation API (e.g., Google Translate, DeepL) and a valid API key/endpoint.

### Setup

#### 1. Clone the Repository (if applicable)

```bash
git clone <your-repository-url>
cd <repository-name>
```

#### 2. Backend Setup

It's highly recommended to use a Python virtual environment.

```bash
# Create and activate a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install Python dependencies
pip install -r requirements.txt # or pip3 install -r requirements.txt
```

##### Configure API Keys for Backend Services:

*   **Google Fact Check Service (`fact_check_service/app.py`):**
    *   The service is currently set up to read the API key directly from the line `GOOGLE_API_KEY = os.environ.get('AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4')`.
    *   **Recommended:** Modify this to use an environment variable. Set `GOOGLE_API_KEY` in your environment before running the service.
        ```python
        # In fact_check_service/app.py, change:
        # GOOGLE_API_KEY = os.environ.get('AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4')
        # to:
        GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
        ```
        Then, before running (in your terminal): `export GOOGLE_API_KEY="YOUR_ACTUAL_GOOGLE_API_KEY"`
*   **Translation Service (`translation_service/app.py`):**
    *   This service expects an API key and endpoint URL.
    *   Update `TRANSLATION_API_URL` in `translation_service/app.py` with your chosen API's endpoint.
    *   **Recommended:** Set `YOUR_TRANSLATION_API_KEY` as an environment variable.
        ```python
        # In translation_service/app.py, ensure it uses:
        TRANSLATION_API_KEY = os.environ.get('YOUR_TRANSLATION_API_KEY')
        ```
        Then, before running (in your terminal): `export YOUR_TRANSLATION_API_KEY="YOUR_ACTUAL_TRANSLATION_KEY"`

#### 3. Frontend Setup

Navigate to the `frontend` directory and install Node.js dependencies:

```bash
cd frontend
npm install   # or yarn install
cd ..         # Go back to the root directory
```

### Running the Application

Each service needs to be run in a separate terminal window.

#### 1. Start the NLP Service (mBERT Claim Classification)

Navigate to the `nlp_service` directory and run the Flask app:
(Make sure your virtual environment is activated if you're using one)

```bash
cd nlp_service
python app.py
```
This service will typically run on `http://localhost:5001`.
*Note: The first time you run this, it will download the `bert-base-multilingual-cased` model, which may take some time.*

#### 2. Start the Fact Check Service

Navigate to the `fact_check_service` directory and run the Flask app:
(Ensure `GOOGLE_API_KEY` is configured/exported)

```bash
cd fact_check_service
python app.py
```
This service will typically run on `http://localhost:5002`.

#### 3. Start the Translation Service

Navigate to the `translation_service` directory and run the Flask app:
(Ensure `YOUR_TRANSLATION_API_KEY` and `TRANSLATION_API_URL` are configured)

```bash
cd translation_service
python app.py
```
This service will typically run on `http://localhost:5003`.

#### 4. Start the React Frontend

Navigate to the `frontend` directory and start the development server:

```bash
cd frontend
npm start  # or yarn start
```
This will usually open the application in your web browser at `http://localhost:3000`.

### Using the Application (Core Functionality)

1.  Open your browser to `http://localhost:3000`.
2.  Enter a claim in the text area.
3.  Use the buttons to:
    *   **Classify Claim (mBERT)**: Get a classification from the local NLP model.
    *   **Fact Check (Google)**: Query the Google Fact Check API.
    *   **Translate**: Select a target language and translate the claim.
4.  Toggle accessibility features using the "High Contrast" and "Reader View" buttons.
