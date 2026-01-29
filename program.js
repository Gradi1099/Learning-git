/**
 * Assignment 2:
 * - Prompt user for integers until they enter q or Q
 * - Echo integers back
 * - Check if product of any two integers equals a third integer
 * - Error message if input is not an integer or q/Q
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numbers = [];

/**
 * Returns an object describing the first match found:
 * { a, b, c } meaning a * b === c
 * If no match exists, returns null.
 */
function findProductMatch(arr) {
  if (arr.length < 3) return null;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i === j) continue;

      const product = arr[i] * arr[j];

      for (let k = 0; k < arr.length; k++) {
        if (k === i || k === j) continue;

        if (product === arr[k]) {
          return { a: arr[i], b: arr[j], c: arr[k] };
        }
      }
    }
  }
  return null;
}

function ask() {
  rl.question("Enter an integer (or q to quit): ", (input) => {
    const value = input.trim();

    // Quit if q or Q
    if (value.toLowerCase() === "q") {
      console.log("\nYou entered:", numbers.length ? numbers.join(", ") : "(none)");

      if (numbers.length < 3) {
        console.log("Not enough integers to check the condition (need at least 3).");
      } else {
        const match = findProductMatch(numbers);
        if (match) {
          console.log(`Condition is met: ${match.a} x ${match.b} = ${match.c}`);
        } else {
          console.log("Condition was not met");
        }
      }

      rl.close();
      return;
    }

    // Validate integer input (no decimals)
    if (!/^-?\d+$/.test(value)) {
      console.log("Error: Please enter a valid integer or 'q' to quit.");
      return ask();
    }

    numbers.push(Number(value));
    ask();
  });
}

ask();
