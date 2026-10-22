// Import the input validation function from our UI module
import { validateEventInput } from '../js/ui.js';

// Group all tests related to event input validation together
describe('validateEventInput Function Unit Tests', () => {

  // Test Case 1: Check if valid inputs pass validation successfully
  test('should return isValid: true when all input fields are filled correctly', () => {
    // Call the function with valid test data
    const result = validateEventInput('Hackathon', 'Technology', '2026-11-10', 'Auditorium A', 50);

    // Expect the function to confirm the input is valid
    expect(result.isValid).toBe(true);
    // Expect no error message to be returned
    expect(result.message).toBe('');
  });

  // Test Case 2: Check if missing required fields trigger an error
  test('should return isValid: false when a required text field is empty', () => {
    // Call the function with an empty title string ('')
    const result = validateEventInput('', 'Technology', '2026-11-10', 'Auditorium A', 50);

    // Expect validation to fail
    expect(result.isValid).toBe(false);
    // Expect the correct error message explaining that fields are missing
    expect(result.message).toBe('All required fields must be filled out.');
  });

  // Test Case 3: Check if invalid capacity values trigger an error
  test('should return isValid: false when capacity is zero or a negative number', () => {
    // Call the function with an invalid negative capacity (-10)
    const result = validateEventInput('Hackathon', 'Technology', '2026-11-10', 'Auditorium A', -10);

    // Expect validation to fail
    expect(result.isValid).toBe(false);
    // Expect the correct error message about positive numbers
    expect(result.message).toBe('Capacity must be a positive number.');
  });

});