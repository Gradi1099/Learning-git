
/**
 * Assignment 1 - Learning Git
 * 
 * This program reads a list of integers from the user,
 * stores them in an array, calculates the mean and median,
 * and displays the results.
 * 
 * The user can stop entering values by typing 'q'.
 */

const readline = require("readline");

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const numbers = [];

/**
 * Calculates the mean (average) of an array of numbers.
 */
function calculateMean(arr) {
  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}

/**
 * Calculates the median of an array of numbers.
 */
function calculateMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    // Even number of elements
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    // Odd number of elements
    return sorted[mid];
  }
}

/**
 * Prompts the user to enter integers until they type 'q'.
 */
function promptUser() {
  rl.question("Enter an integer (or 'q' to quit): ", (input) => {
    // Allow user to quit
    if (input.toLowerCase() === "q") {
      if (numbers.length === 0) {
        console.error("Error: No numbers were entered.");
      } else {
        const mean = calculateMean(numbers);
        const median = calculateMedian(numbers);

        console.log("\nResults:");
        console.log("Numbers:", numbers);
        console.log("Mean:", mean);
        console.log("Median:", median);
      }

      rl.close();
      return;
    }

    // Convert input to number
    const value = Number(input);

    // Error handling for invalid integers
    if (!Number.isInteger(value)) {
      console.error("Invalid input. Please enter an integer or 'q' to quit.");
    } else {
      numbers.push(value);
    }

    // Continue prompting
    promptUser();
  });
}

// Start the program
promptUser();
