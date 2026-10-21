// //Exercise 1 — Variables, Scoping & Types
// <!-- var testEnv = "staging"; // Bug: Avoid 'var', use 'let' or 'const' for proper block scoping
// let retries = 3;
// const maxRetries = 5;

// if (retries < maxRetries) {
//   var attemptMessage = `Retry ${retries} of ${maxRetries}`; // Bug: 'var' leaks outside the if-block, use 'let' instead
// }
// console.log(attemptMessage);

// maxRetries = 10; // Bug: Cannot reassign a variable declared with 'const'

// let userCount: number = "12"; // Bug: Type '"12"' is a string, but the variable expects a number -->


let testEnv: string = "staging";             // Fixed: Changed 'var' to 'let' and added ': string' type annotation
let retries: number = 3;                     // Added: ': number' explicit type annotation
let maxRetries: number = 5;                  // Fixed: Changed 'const' to 'let' to allow reassignment, added ': number'

let attemptMessage: string = "";             // Fixed: Declared outside 'if' with 'let' and ': string' to fix scope issue
if (retries < maxRetries) {
  attemptMessage = `Retry ${retries} of ${maxRetries}`; // Fixed: Removed 'var', now reassigning the scoped variable
}
console.log(attemptMessage);

maxRetries = 10;                             // Fixed: Reassignment is now valid because maxRetries is 'let'

let userCount: number = 12;                  // Fixed: Changed string "12" to number 12 to match ': number' type
