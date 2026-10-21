// Exercise 2 — Comparisons & Control Flow

function classifyResponse(status: number): string {
  // Guard clause: immediately throw an error if the status is negative or not a number
  if (typeof status !== "number" || status < 0) {
    throw new Error("Invalid status: must be a non-negative number");
  }

  // 'switch' evaluates the exact value of 'status' and matches it against specific 'case' labels.
  // It is highly efficient for checking specific, discrete values rather than ranges.
  switch (status) {
    case 200: // If status === 200...
    case 201: // ...or if status === 201, execution flows into the block below
      return "Success"; // 'return' immediately exits the entire function with this string value
  }

  // Range checks: using 'if/else' because 'switch' doesn't natively handle range conditions like >= or <=
  if (status >= 400 && status <= 499) {
    return "Client Error"; // Returns for any client-side error status codes
  } else if (status >= 500) {
    return "Server Error"; // Returns for any server-side error status codes
  } else {
    return "Unknown"; // Catch-all block for any other valid statuses (e.g., 100, 302)
  }
}