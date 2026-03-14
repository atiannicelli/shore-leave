/**
 * Yūnagi Cottage - Google Apps Script Backend
 * 
 * This script serves as the API endpoint for the cottage booking system.
 * Deploy as a web app with:
 * - Execute as: Me
 * - Who has access: Anyone
 */

// ========== Configuration ==========
const WEEKENDS_SHEET_NAME = 'Weekends';
const CONFIG_SHEET_NAME = 'Config';

// ========== GET Handler - Fetch Weekend Availability ==========
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const weekendsSheet = ss.getSheetByName(WEEKENDS_SHEET_NAME);
    
    if (!weekendsSheet) {
      return createErrorResponse('Weekends sheet not found');
    }
    
    // Get all weekend data (skip header row)
    const data = weekendsSheet.getDataRange().getValues();
    const weekends = [];
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Only include weekend if it has data
      if (row[0]) {
        weekends.push({
          id: row[0],           // Column A: Weekend ID
          startDate: formatDate(row[1]),  // Column B: Start Date
          endDate: formatDate(row[2]),    // Column C: End Date
          label: row[3],        // Column D: Display Label
          status: row[4]        // Column E: Status (Available/Taken)
          // DO NOT include guest name, email, or other private info
        });
      }
    }
    
    return createSuccessResponse({ weekends: weekends });
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createErrorResponse('Failed to load weekends: ' + error.toString());
  }
}

// ========== POST Handler - Create Reservation ==========
function doPost(e) {
  try {
    // Parse the request body
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.weekendId || !data.name || !data.email || !data.guests || !data.password) {
      return createErrorResponse('Missing required fields');
    }
    
    // Validate password
    if (!validatePassword(data.password)) {
      return createErrorResponse('Invalid password');
    }
    
    // Get the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const weekendsSheet = ss.getSheetByName(WEEKENDS_SHEET_NAME);
    
    if (!weekendsSheet) {
      return createErrorResponse('Weekends sheet not found');
    }
    
    // Find the weekend row
    const weekendRow = findWeekendRow(weekendsSheet, data.weekendId);
    
    if (!weekendRow) {
      return createErrorResponse('Weekend not found');
    }
    
    // Check if weekend is still available
    const status = weekendsSheet.getRange(weekendRow, 5).getValue();
    if (status !== 'Available') {
      return createErrorResponse('This weekend is no longer available');
    }
    
    // Update the row with reservation details
    const now = new Date();
    weekendsSheet.getRange(weekendRow, 5).setValue('Taken');           // Column E: Status
    weekendsSheet.getRange(weekendRow, 6).setValue(data.name);         // Column F: Guest Name
    weekendsSheet.getRange(weekendRow, 7).setValue(data.email);        // Column G: Email
    weekendsSheet.getRange(weekendRow, 8).setValue(data.guests);       // Column H: Number of Guests
    weekendsSheet.getRange(weekendRow, 9).setValue(now);               // Column I: Date Reserved
    
    // Log the reservation
    Logger.log('Reservation created: ' + data.name + ' for weekend ' + data.weekendId);
    
    return createSuccessResponse({
      success: true,
      message: 'Reservation confirmed'
    });
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createErrorResponse('Failed to create reservation: ' + error.toString());
  }
}

// ========== Helper Functions ==========

/**
 * Validate the reservation password against the Config sheet
 */
function validatePassword(password) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
    
    if (!configSheet) {
      Logger.log('Config sheet not found');
      return false;
    }
    
    // Password should be in cell B1
    const correctPassword = configSheet.getRange('B1').getValue();
    
    return password === correctPassword;
    
  } catch (error) {
    Logger.log('Error validating password: ' + error.toString());
    return false;
  }
}

/**
 * Find the row number for a given weekend ID
 */
function findWeekendRow(sheet, weekendId) {
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == weekendId) {
      return i + 1; // Return 1-based row number
    }
  }
  
  return null;
}

/**
 * Format date for JSON response
 */
function formatDate(date) {
  if (!date || !(date instanceof Date)) {
    return '';
  }
  
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return month + '/' + day + '/' + year;
}

/**
 * Create a success JSON response with CORS headers
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Create an error JSON response with CORS headers
 */
function createErrorResponse(errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({ error: errorMessage }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Handle OPTIONS request for CORS preflight
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
