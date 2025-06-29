# JsonPowerDB Integration - Employee Form

## About index.html

This HTML file demonstrates the integration of JsonPowerDB with a simple Employee Management form. The file contains a complete implementation of data entry and storage using JsonPowerDB's REST API.

## File Structure Breakdown

### HTML Structure

-   **Document Type Declaration**: Standard HTML5 doctype
-   **Head Section**: Contains metadata, CSS links, and script imports
-   **Body Section**: Contains the employee registration form with three input fields:
    -   Employee ID
    -   Employee Name
    -   Employee Email
-   **Bootstrap Integration**: Uses Bootstrap 3.4.1 for responsive styling
-   **jQuery Integration**: Uses jQuery 3.5.1 for DOM manipulation

### CSS Styling

-   Custom styles for form elements and layout
-   Responsive design that works on different screen sizes
-   Modern UI elements with hover effects and appropriate spacing
-   Form validation styling

### JavaScript Functionality

-   **validateAndGetFormData()**: Validates form inputs and creates a JSON object
-   **resetForm()**: Clears form fields after submission
-   **saveEmployee()**: Main function that:
    1. Gets form data as JSON
    2. Creates a PUT request to JsonPowerDB
    3. Sends the request to the API
    4. Handles the response
    5. Resets the form

### JsonPowerDB Integration

-   The form connects to JsonPowerDB's API endpoint at http://api.login2explore.com:5577
-   Uses the standard JsonPowerDB API structure for PUT operations
-   Includes proper token authentication for database access
-   Stores data in the "Avinash" database and "Avinash-Rel" relation

## Implementation Notes

The implementation follows a straightforward approach using jQuery for AJAX operations and DOM manipulation. While React could have been used for a more component-based architecture, this implementation follows the course requirements focusing on direct JsonPowerDB integration.

Key functions:

-   **createPUTRequest**: Creates the request format required by JsonPowerDB
-   **executeCommandAtGivenBaseUrl**: Sends the formatted request to the API

## How It Works

1. User enters employee details in the form
2. Upon clicking "Save", the form data is validated
3. A PUT request is created with the proper format for JsonPowerDB
4. The request is sent to the JsonPowerDB API endpoint
5. The response is processed and shown to the user
6. The form is reset for the next entry

This implementation demonstrates the simplicity and efficiency of using JsonPowerDB for data storage operations without the need for complex backend setup.
