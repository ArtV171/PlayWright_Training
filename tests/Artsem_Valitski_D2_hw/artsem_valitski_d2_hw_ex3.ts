## Exercise 3 — Destructuring, Arrays & Loops

type TestResult = {
  name: string;
  status: string;
  duration: number;
};

const testResults: TestResult[] = [
  { name: "Login test", status: "passed", duration: 1200 },
  { name: "Checkout test", status: "failed", duration: 3400 },
  { name: "Search test", status: "passed", duration: 800 },
];

// 1. DESTRUCTURING FROM AN ARRAY ELEMENT
// We access the first element via index. The curly braces { name, status } 
// tell TypeScript to look inside that object, find properties with those exact names, 
// and unpack them into brand new variables in a single line.
const { name, status }: { name: string; status: string } = testResults[0];
console.log(`First test: ${name}, Status: ${status}\n`);

// 2. FOR...OF LOOP
// This loop automatically steps through the array from start to finish.
// In each iteration, it takes the current object, stores it in the temporary 
// 'result' constant, executes the code block, and moves to the next element.
console.log("--- All Tests Log ---");
for (const result of testResults) {
  console.log(`Test: ${result.name} took ${result.duration}ms`);
}
console.log("");

// 3. ARRAY METHODS: .filter() AND .map()
// - .filter() loops through the array and evaluates a condition for each item. 
//   If the condition is true (status === "failed"), it keeps the item in a new temporary array.
// - .map() takes that temporary filtered array and transforms each object, 
//   extracting ONLY the 'name' property string. The rest of the object data is discarded.
const failedTestNames: string[] = testResults
  .filter((result: TestResult) => result.status === "failed")
  .map((result: TestResult) => result.name);
console.log("Failed tests:", failedTestNames, "\n");

// 4. ARRAY METHOD: .reduce()
// .reduce() collapses an entire array down into a single value (in this case, a number).
// It acts like a calculator memory: 
// - 'total' is the accumulator (running tally) which starts at 0 (defined at the end).
// - 'result' is the current array item being processed.
// In every loop, it adds the current duration to the running total and carries it forward.
const totalDuration: number = testResults.reduce(
  (total: number, result: TestResult) => total + result.duration, 
  0 // This trailing 0 sets the initial value for the 'total' accumulator
);
console.log(`Total execution time: ${totalDuration}ms`);