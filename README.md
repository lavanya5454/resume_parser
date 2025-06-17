# Resume Parser

A Flask-based web application that analyzes resumes and provides intelligent insights including category classification, job recommendations, and automatic extraction of key information.

## Features

- **Resume Upload**: Support for PDF and TXT file formats
- **Category Classification**: Automatically categorizes resumes into different professional domains
- **Job Recommendations**: Suggests suitable job roles based on resume content
- **Information Extraction**: Extracts key details including:
  - Name
  - Contact number
  - Email address
  - Skills
  - Education background

## Technology Stack

- **Backend**: Flask (Python)
- **Machine Learning**: Scikit-learn with Random Forest classifiers
- **Text Processing**: TF-IDF Vectorization
- **PDF Processing**: PyPDF2
- **Frontend**: HTML templates

## Prerequisites

- Python 3.7+
- pip (Python package manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume_parser
   ```

2. **Install required dependencies**
   ```bash
   pip install flask PyPDF2 scikit-learn pandas numpy
   ```

3. **Download/Place the trained models**
   Ensure the following model files are in the `models/` directory:
   - `resume_parser_model.pkl` - Resume categorization model
   - `vectorizer_model.pkl` - TF-IDF vectorizer for categorization
   - `rf_classifier_job_recommendation.pkl` - Job recommendation model
   - `tfidf_vectorizer_job_recommendation.pkl` - TF-IDF vectorizer for job recommendation

## Project Structure

```
resume_parser/
├── app.py                 # Main Flask application
├── models/               # Directory for ML models
│   ├── resume_parser_model.pkl
│   ├── vectorizer_model.pkl
│   ├── rf_classifier_job_recommendation.pkl
│   └── tfidf_vectorizer_job_recommendation.pkl
├── templates/            # HTML templates
│   └── resume.html
└── README.md            # This file
```

## Usage

1. **Start the application**
   ```bash
   python app.py
   ```

2. **Access the web interface**
   Open your browser and navigate to `http://localhost:5000`

3. **Upload a resume**
   - Click on the file upload button
   - Select a PDF or TXT resume file
   - Click submit to analyze

4. **View results**
   The application will display:
   - Predicted category
   - Recommended job role
   - Extracted personal information
   - Skills list
   - Education background

## API Endpoints

- `GET /` - Main page with file upload interface
- `POST /pred` - Process uploaded resume and return analysis

## Features Details

### Resume Cleaning
The application preprocesses resume text by:
- Removing URLs and social media handles
- Cleaning special characters and non-ASCII characters
- Normalizing whitespace

### Skills Extraction
Recognizes 200+ technical and professional skills including:
- Programming languages (Python, Java, JavaScript, etc.)
- Frameworks and libraries (React, Django, TensorFlow, etc.)
- Cloud platforms (AWS, Azure, GCP)
- Data science tools (Pandas, NumPy, Tableau, etc.)
- Soft skills (Communication, Project Management, etc.)

### Education Extraction
Identifies educational backgrounds across various fields:
- Engineering disciplines
- Computer Science and IT
- Business and Management
- Healthcare and Life Sciences
- Arts and Humanities

## Model Information

The application uses pre-trained Random Forest classifiers with TF-IDF vectorization for:
- **Resume Categorization**: Classifies resumes into professional categories
- **Job Recommendation**: Suggests appropriate job roles based on resume content

## Configuration

Update the model file paths in `app.py` if your models are stored in a different location:

```python
rf_classifier_categorization = pickle.load(open("path/to/your/model.pkl", "rb"))
```

## Troubleshooting

### Common Issues

1. **Model files not found**
   - Ensure all `.pkl` files are in the correct directory
   - Check file paths in the code

2. **PDF parsing errors**
   - Verify PDF files are not password protected
   - Ensure PDF contains extractable text (not just images)

3. **File upload issues**
   - Check file size limits
   - Ensure file extensions are .pdf or .txt

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Support for more file formats (DOCX, RTF)
- Advanced NLP for better information extraction
- Integration with job portals APIs
- Resume scoring and improvement suggestions
- Multi-language support
- Database integration for storing analysis results

## Contact

For questions or support, please open an issue on the repository or contact [your-email@example.com].

---

**Note**: This application requires trained ML models to function properly. Ensure all model files are properly trained and placed in the correct directory before running the application.
