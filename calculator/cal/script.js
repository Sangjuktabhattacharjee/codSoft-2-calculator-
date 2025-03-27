function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function backspace() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  let expression = document.getElementById("display").value;
  
  expression = expression
        .replace(/sin\(/g, "Math.sin(Math.PI/180*")  // Convert degrees to radians
        .replace(/cos\(/g, "Math.cos(Math.PI/180*")
        .replace(/tan\(/g, "Math.tan(Math.PI/180*")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/exp\(/g, "Math.exp(")
        .replace(/\^/g, "**"); // Fix power calculation


  try {
      let result = Function('"use strict"; return (' + expression + ')')();
      document.getElementById("display").value = result;
  } catch {
      document.getElementById("display").value = "Error";
  }
}
function calculateScientific(operation) {
  let display = document.getElementById("display");

  switch (operation) {
      case "sin": appendValue("sin("); break;
      case "cos": appendValue("cos("); break;
      case "tan": appendValue("tan("); break;
      case "log": appendValue("log("); break; // FIXED log() display
      case "ln": appendValue("ln("); break;
      case "sqrt": appendValue("√("); break;
      case "exp": appendValue("exp("); break;
      case "pi": appendValue(Math.PI); break;
      case "e": appendValue(Math.E); break;
      case "pow": appendValue("^"); break;
      case "(": appendValue("("); break;
      case ")": appendValue(")"); break;
  }
}
// 🔥 Enable keyboard input
document.addEventListener("keydown", function(event) {
  const key = event.key;
  const display = document.getElementById("display");

  if ((!isNaN(parseFloat(key)) && isFinite(key)) || key === ".") {
      appendValue(key);
  } else if (key === "Backspace") {
      backspace();
  } else if (key === "Enter") {
      calculateResult();
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
      appendValue(key);
  } else if (key === "Escape" || key === "Delete") {
      clearDisplay();
  } else if (key === "(") {
      appendValue("(");
  } else if (key === ")") {
      appendValue(")");
  } else if (key === "^") {
      appendValue("^"); // Exponent symbol, handled in calculateResult()
  }
});
