# TYPO3 Translation Assessment Tools

This directory contains tools to support the TYPO3 Translation System Analysis and Modernization project.

## Google Forms Survey Script

The `surveyFormScript.js` file contains Google Apps Script code to create and manage a survey for collecting data about translation practices in TYPO3 installations.

### Setup Instructions

1. Open [Google Apps Script](https://script.google.com/home)
2. Create a new project
3. Copy the content of `surveyFormScript.js` into the script editor
4. Save the project with a name like "TYPO3 Translation Survey"
5. Run the `createSurveyForm()` function to create the survey form
6. Set up email notifications by running `setupNotifications('your-email@example.com')`

### Available Functions

- `createSurveyForm()`: Creates a new survey form with all questions
- `setupNotifications(emailAddress)`: Sets up email notifications for new responses
- `onFormSubmit(e)`: Handles form submission events (triggered automatically)
- `appendToSpreadsheet(formResponse)`: Adds response data to a spreadsheet
- `exportResponsesToCsv()`: Exports response data to a CSV file
- `createResponseDashboard()`: Creates a basic dashboard for response analytics

### Survey Structure

The survey covers the following areas:
- Respondent information
- Current translation usage in TYPO3
- Pain points and challenges
- Feature requests
- Comparison with other CMS platforms
- Additional feedback

### Accessing Results

The script automatically creates a Google Spreadsheet to store responses. You can access this spreadsheet through the Google Drive of the account that created the form.

To export data to CSV or create a dashboard, run the corresponding functions from the Apps Script editor.

---

_This content was generated with assistance from Claude AI._