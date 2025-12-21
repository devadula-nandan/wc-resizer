import "./src/resizer.ts";

// Wait for DOM + custom element definition
window.addEventListener("DOMContentLoaded", () => {
  // Example 1
  const ex1 = document.getElementById("ex-1");
  const ex1el1 = document.getElementById("ex-1-el-1");
  const ex1el2 = document.getElementById("ex-1-el-2");

  // Attach the nodes to the resizer instance
  ex1.topNode = ex1el1;
  ex1.bottomNode = ex1el2;

  // Example 2
  const ex2 = document.getElementById("ex-2");
  const ex2el1 = document.getElementById("ex-2-el-1");
  const ex2el2 = document.getElementById("ex-2-el-2");

  // Attach the nodes to the resizer instance
  ex2.leftNode = ex2el1;
  ex2.rightNode = ex2el2;
});
1