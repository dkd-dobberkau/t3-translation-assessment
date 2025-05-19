/**
 * TYPO3 Translation Assessment Survey Form Script
 * 
 * This Google Apps Script helps manage a survey for collecting data about 
 * translation practices in TYPO3 installations.
 * 
 * Features:
 * - Creates a survey form with relevant questions for TYPO3 translation assessment
 * - Sends email notifications when responses are submitted
 * - Exports response data to a spreadsheet for analysis
 */

/**
 * Creates a new survey form and sets up all necessary questions
 */
function createSurveyForm() {
  // Create a new form
  const form = FormApp.create('TYPO3 Translation System Assessment Survey');
  form.setDescription('This survey is part of the TYPO3 Translation System Analysis and Modernization project. Your input will help shape the future of TYPO3\'s translation capabilities.');
  
  // Collect respondent information
  form.addPageBreakItem().setTitle('Respondent Information');
  
  form.addTextItem()
    .setTitle('Name')
    .setRequired(true);
    
  form.addTextItem()
    .setTitle('Email')
    .setRequired(true);
    
  form.addTextItem()
    .setTitle('Organization')
    .setRequired(true);
  
  form.addMultipleChoiceItem()
    .setTitle('Your primary role in relation to TYPO3')
    .setChoiceValues(['Developer', 'Integrator', 'Editor/Content Manager', 'Project Manager', 'Business Owner', 'Other'])
    .setRequired(true);
    
  // Current Translation Usage
  form.addPageBreakItem().setTitle('Current Translation Usage');
  
  form.addMultipleChoiceItem()
    .setTitle('Do you currently use TYPO3\'s translation features?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);
    
  form.addParagraphTextItem()
    .setTitle('If you use TYPO3\'s translation features, please describe your current setup (extensions used, workflows, etc.)');
    
  form.addScaleItem()
    .setTitle('How would you rate the ease of use of TYPO3\'s translation features?')
    .setBounds(1, 10)
    .setLabels('Very Difficult', 'Very Easy');
    
  form.addCheckboxItem()
    .setTitle('Which translation features do you currently use in TYPO3?')
    .setChoiceValues(['Content translation', 'Interface translation', 'Language fallback', 'URL handling for languages', 'Third-party translation services', 'Other']);
    
  // Pain Points
  form.addPageBreakItem().setTitle('Pain Points and Challenges');
  
  form.addParagraphTextItem()
    .setTitle('What are the biggest challenges you face with translations in TYPO3?')
    .setRequired(true);
    
  form.addCheckboxItem()
    .setTitle('Which aspects of TYPO3\'s translation system need the most improvement?')
    .setChoiceValues([
      'User interface for translators', 
      'Developer API', 
      'Performance', 
      'Integration with external translation services',
      'Documentation',
      'Workflow management',
      'Other'
    ])
    .setRequired(true);
    
  // Feature Requests
  form.addPageBreakItem().setTitle('Feature Requests');
  
  form.addParagraphTextItem()
    .setTitle('What features would you like to see in TYPO3\'s translation system?')
    .setRequired(true);
    
  form.addMultipleChoiceItem()
    .setTitle('How important is machine translation integration for your TYPO3 projects?')
    .setChoiceValues(['Not important', 'Somewhat important', 'Very important', 'Critical'])
    .setRequired(true);
    
  form.addMultipleChoiceItem()
    .setTitle('Would you be willing to pay for premium translation features in TYPO3?')
    .setChoiceValues(['Yes', 'No', 'Maybe'])
    .setRequired(true);
    
  // Comparison with other systems
  form.addPageBreakItem().setTitle('Comparison with Other Systems');
  
  form.addParagraphTextItem()
    .setTitle('Have you used translation features in other CMS platforms? If so, what did you like about them?');
    
  form.addParagraphTextItem()
    .setTitle('What translation features from other systems would you like to see in TYPO3?');
    
  // Final feedback
  form.addPageBreakItem().setTitle('Additional Feedback');
  
  form.addParagraphTextItem()
    .setTitle('Do you have any other comments or suggestions regarding TYPO3\'s translation system?');
  
  // Set confirmation message
  form.setConfirmationMessage('Thank you for your contribution to improving TYPO3\'s translation capabilities!');
  
  // Save form ID for future reference
  PropertiesService.getScriptProperties().setProperty('SURVEY_FORM_ID', form.getId());
  
  Logger.log('Form created with ID: ' + form.getId());
  Logger.log('Public URL: ' + form.getPublishedUrl());
  Logger.log('Edit URL: ' + form.getEditUrl());
  
  return form;
}

/**
 * Sets up email notifications for new responses
 */
function setupNotifications(emailAddress) {
  const formId = PropertiesService.getScriptProperties().getProperty('SURVEY_FORM_ID');
  
  if (!formId) {
    Logger.log('No form ID found. Please create a form first.');
    return;
  }
  
  const form = FormApp.openById(formId);
  
  // Create a trigger that runs when a form is submitted
  ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();
    
  // Store the notification email address
  PropertiesService.getScriptProperties().setProperty('NOTIFICATION_EMAIL', emailAddress);
  
  Logger.log('Notification set up for: ' + emailAddress);
}

/**
 * Handles form submission events
 */
function onFormSubmit(e) {
  const formResponse = e.response;
  const itemResponses = formResponse.getItemResponses();
  
  let responseData = 'New Survey Response:\n\n';
  
  // Process responses
  itemResponses.forEach(function(itemResponse) {
    const question = itemResponse.getItem().getTitle();
    const answer = itemResponse.getResponse();
    responseData += question + ': ' + answer + '\n\n';
  });
  
  // Send email notification
  const emailAddress = PropertiesService.getScriptProperties().getProperty('NOTIFICATION_EMAIL');
  if (emailAddress) {
    GmailApp.sendEmail(
      emailAddress,
      'New TYPO3 Translation Survey Response',
      responseData
    );
  }
  
  // Append to spreadsheet
  appendToSpreadsheet(formResponse);
}

/**
 * Creates a spreadsheet to store responses if it doesn't exist,
 * then appends the new response
 */
function appendToSpreadsheet(formResponse) {
  let spreadsheetId = PropertiesService.getScriptProperties().getProperty('RESPONSE_SPREADSHEET_ID');
  let spreadsheet;
  
  // Create a spreadsheet if it doesn't exist
  if (!spreadsheetId) {
    spreadsheet = SpreadsheetApp.create('TYPO3 Translation Survey Responses');
    spreadsheetId = spreadsheet.getId();
    PropertiesService.getScriptProperties().setProperty('RESPONSE_SPREADSHEET_ID', spreadsheetId);
    
    // Create headers
    const itemResponses = formResponse.getItemResponses();
    const headers = itemResponses.map(function(itemResponse) {
      return itemResponse.getItem().getTitle();
    });
    
    headers.unshift('Timestamp');
    headers.unshift('Respondent Email');
    
    spreadsheet.getActiveSheet().appendRow(headers);
  } else {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  }
  
  // Prepare row data
  const itemResponses = formResponse.getItemResponses();
  const rowData = itemResponses.map(function(itemResponse) {
    return itemResponse.getResponse();
  });
  
  // Add timestamp and email
  let respondentEmail = '';
  itemResponses.forEach(function(itemResponse) {
    if (itemResponse.getItem().getTitle() === 'Email') {
      respondentEmail = itemResponse.getResponse();
    }
  });
  
  rowData.unshift(new Date().toISOString());
  rowData.unshift(respondentEmail);
  
  // Append the data
  spreadsheet.getActiveSheet().appendRow(rowData);
}

/**
 * Exports response data to CSV
 */
function exportResponsesToCsv() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('RESPONSE_SPREADSHEET_ID');
  
  if (!spreadsheetId) {
    Logger.log('No response spreadsheet found.');
    return;
  }
  
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  let csvContent = '';
  
  // Convert to CSV
  data.forEach(function(row) {
    const csvRow = row.map(function(cell) {
      // Escape quotes and handle commas
      if (typeof cell === 'string') {
        return '"' + cell.replace(/"/g, '""') + '"';
      }
      return cell;
    }).join(',');
    
    csvContent += csvRow + '\n';
  });
  
  // Create a blob and save to Drive
  const blob = Utilities.newBlob(csvContent, 'text/csv', 'TYPO3_Translation_Survey_Responses.csv');
  const file = DriveApp.createFile(blob);
  
  Logger.log('CSV file created with ID: ' + file.getId());
  
  return file.getUrl();
}

/**
 * Creates a dashboard with basic analytics of survey responses
 */
function createResponseDashboard() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('RESPONSE_SPREADSHEET_ID');
  
  if (!spreadsheetId) {
    Logger.log('No response spreadsheet found.');
    return;
  }
  
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  let dashboardSheet = spreadsheet.getSheetByName('Dashboard');
  
  if (!dashboardSheet) {
    dashboardSheet = spreadsheet.insertSheet('Dashboard');
  } else {
    dashboardSheet.clear();
  }
  
  // Add a title
  dashboardSheet.getRange('A1').setValue('TYPO3 Translation Survey Dashboard');
  dashboardSheet.getRange('A1:D1').merge();
  dashboardSheet.getRange('A1').setFontSize(16).setFontWeight('bold');
  
  // Count total responses
  const responseSheet = spreadsheet.getSheets()[0];
  const lastRow = responseSheet.getLastRow();
  const totalResponses = lastRow - 1; // Subtract header row
  
  dashboardSheet.getRange('A3').setValue('Total Responses:');
  dashboardSheet.getRange('B3').setValue(totalResponses);
  
  // Create basic charts and analysis
  // This is just a simple example - you can expand with more detailed charts
  
  Logger.log('Dashboard created');
  
  return spreadsheet.getUrl();
}