# Multilingual Claim Classification and Fact-Checking Pipeline

This project implements a BERT-based NLP pipeline for claim classification, integrates with the Google Fact Check API, and supports multilingual operations via a translation API. The frontend is a React application featuring accessibility options like high-contrast mode and reader view. The backend consists of Flask microservices.

## Project Structure

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

## Prerequisites

*   Python 3.7+ and pip (or pip3)
*   Node.js and npm (or yarn)
*   Access to Google Fact Check API and a valid API key.
*   Access to a Translation API (e.g., Google Translate, DeepL) and a valid API key/endpoint.

## Setup

### 1. Clone the Repository (if applicable)

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Backend Setup

It's highly recommended to use a Python virtual environment.

```bash
# Create and activate a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install Python dependencies
pip install -r requirements.txt # or pip3 install -r requirements.txt
```

#### Configure API Keys for Backend Services:

*   **Google Fact Check Service (`fact_check_service/app.py`):**
    *   The service is currently set up to read the API key directly from the line `GOOGLE_API_KEY = os.environ.get('AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4')`.
    *   **Recommended:** Modify this to use an environment variable. Set `GOOGLE_API_KEY` in your environment before running the service.
        ```python
        # In fact_check_service/app.py, change:
        # GOOGLE_API_KEY = os.environ.get('AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4') 
        # to:
        GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
        ```
        Then, before running: `export GOOGLE_API_KEY="YOUR_ACTUAL_GOOGLE_API_KEY"`
*   **Translation Service (`translation_service/app.py`):**
    *   This service expects an API key and endpoint URL.
    *   Update `TRANSLATION_API_URL` in `translation_service/app.py` with your chosen API's endpoint.
    *   **Recommended:** Set `YOUR_TRANSLATION_API_KEY` as an environment variable.
        ```python
        # In translation_service/app.py, ensure it uses:
        TRANSLATION_API_KEY = os.environ.get('YOUR_TRANSLATION_API_KEY')
        ```
        Then, before running: `export YOUR_TRANSLATION_API_KEY="YOUR_ACTUAL_TRANSLATION_KEY"`

### 3. Frontend Setup

Navigate to the `frontend` directory and install Node.js dependencies:

```bash
cd frontend
npm install   # or yarn install
cd ..         # Go back to the root directory
```

## Running the Application

Each service needs to be run in a separate terminal window.

### 1. Start the NLP Service (mBERT Claim Classification)

Navigate to the `nlp_service` directory and run the Flask app:
(Make sure your virtual environment is activated if you're using one)

```bash
cd nlp_service
python app.py
```
This service will typically run on `http://localhost:5001`.
*Note: The first time you run this, it will download the `bert-base-multilingual-cased` model, which may take some time.*

### 2. Start the Fact Check Service

Navigate to the `fact_check_service` directory and run the Flask app:
(Ensure `GOOGLE_API_KEY` is configured/exported)

```bash
cd fact_check_service
python app.py
```
This service will typically run on `http://localhost:5002`.

### 3. Start the Translation Service

Navigate to the `translation_service` directory and run the Flask app:
(Ensure `YOUR_TRANSLATION_API_KEY` and `TRANSLATION_API_URL` are configured)

```bash
cd translation_service
python app.py
```
This service will typically run on `http://localhost:5003`.

### 4. Start the React Frontend

Navigate to the `frontend` directory and start the development server:

```bash
cd frontend
npm start  # or yarn start
```
This will usually open the application in your web browser at `http://localhost:3000`.

## Using the Application

1.  Open your browser to `http://localhost:3000`.
2.  Enter a claim in the text area.
3.  Use the buttons to:
    *   **Classify Claim (mBERT)**: Get a classification from the local NLP model.
    *   **Fact Check (Google)**: Query the Google Fact Check API.
    *   **Translate**: Select a target language and translate the claim.
4.  Toggle accessibility features using the "High Contrast" and "Reader View" buttons.
