"use client";

import React, { useEffect, useState } from "react";
import "./page.css";
import { GraduationCap } from "lucide-react";

const page = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);

  const buttons = [
    ["sin", "cos", "tan", "√"],
    ["(", ")", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="],
  ];

  const calculate = (value) => {
    try {
      let exp = value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/√/g, "Math.sqrt");

      exp = exp.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

      exp = exp.replace(/sin\((.*?)\)/g, "Math.sin($1 * Math.PI / 180)");
      exp = exp.replace(/cos\((.*?)\)/g, "Math.cos($1 * Math.PI / 180)");
      exp = exp.replace(/tan\((.*?)\)/g, "Math.tan($1 * Math.PI / 180)");

      if (!/^[0-9+\-*/().\sA-Za-z]+$/.test(exp)) {
        throw new Error("Invalid expression");
      }

      const result = Function(`"use strict"; return (${exp})`)();

      if (!Number.isFinite(result)) {
        throw new Error("Invalid result");
      }

      return Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(10)).toString();
    } catch {
      return "Error";
    }
  };

  const handleButton = (button) => {
    if (button === "=") {
      if (!expression) return;

      const result = calculate(expression);

      if (result !== "Error") {
        setHistory((prev) => [
          {
            expression,
            result,
          },
          ...prev.slice(0, 9),
        ]);

        setDisplay(result);
        setExpression(result);
      } else {
        setDisplay("Error");
      }

      return;
    }

    if (button === "C") {
      setDisplay("0");
      setExpression("");
      return;
    }

    if (button === "DEL") {
      const newExpression = expression.slice(0, -1);

      setExpression(newExpression);
      setDisplay(newExpression || "0");
      return;
    }

    if (button === "±") {
      if (!expression) return;

      const result = calculate(expression);

      if (result !== "Error") {
        const toggled = result.startsWith("-")
          ? result.slice(1)
          : `-${result}`;

        setExpression(toggled);
        setDisplay(toggled);
      }

      return;
    }

    if (button === "sin" || button === "cos" || button === "tan") {
      const newExpression = `${expression}${button}(`;

      setExpression(newExpression);
      setDisplay(newExpression);

      return;
    }

    if (button === "√") {
      const newExpression = `${expression}√(`;

      setExpression(newExpression);
      setDisplay(newExpression);

      return;
    }

    const newExpression = expression + button;

    setExpression(newExpression);
    setDisplay(newExpression);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key >= "0" && key <= "9") {
        handleButton(key);
      } else if (key === "+") {
        handleButton("+");
      } else if (key === "-") {
        handleButton("−");
      } else if (key === "*") {
        handleButton("×");
      } else if (key === "/") {
        event.preventDefault();
        handleButton("÷");
      } else if (key === ".") {
        handleButton(".");
      } else if (key === "(" || key === ")") {
        handleButton(key);
      } else if (key === "%") {
        handleButton("%");
      } else if (key === "Enter" || key === "=") {
        handleButton("=");
      } else if (key === "Backspace") {
        handleButton("DEL");
      } else if (key === "Escape") {
        handleButton("C");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <main className="calculator-page">
      <section className="calculator-wrapper">

        <div className="calculator-header">
          <div>
            <h1>Calculator</h1>
            <p>Calculate smarter, study better.</p>
          </div>

          <span className="calculator-badge"><GraduationCap size={40} />CampusPlug</span>
        </div>

        <div className="calculator-content">

          <div className="calculator-box">

            <div className="display-area">
              <div className="previous-expression">
                {expression || "Ready"}
              </div>

              <div className="main-display">
                {display}
              </div>
            </div>

            <div className="top-controls">
              <button onClick={() => handleButton("C")}>
                C
              </button>

              <button onClick={() => handleButton("DEL")}>
                DEL
              </button>
            </div>

            <div className="calculator-buttons">
              {buttons.flat().map((button, index) => (
                <button
                  key={index}
                  className={`
                    calculator-button
                    ${button === "=" ? "equals-button" : ""}
                    ${["÷", "×", "−", "+"].includes(button)
                      ? "operator-button"
                      : ""}
                    ${["sin", "cos", "tan", "√"].includes(button)
                      ? "scientific-button"
                      : ""}
                  `}
                  onClick={() => handleButton(button)}
                >
                  {button}
                </button>
              ))}
            </div>

          </div>

          <aside className="history-box">
            <div className="history-header">
              <h2>History</h2>

              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="clear-history"
                >
                  Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="empty-history">
                <div className="history-icon">⌁</div>
                <p>No calculations yet</p>
                <span>
                  Your recent calculations will appear here.
                </span>
              </div>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <button
                    key={index}
                    className="history-item"
                    onClick={() => {
                      setExpression(item.result);
                      setDisplay(item.result);
                    }}
                  >
                    <span>{item.expression}</span>
                    <strong>= {item.result}</strong>
                  </button>
                ))}
              </div>
            )}
          </aside>

        </div>

        <p className="keyboard-hint">
          Tip: On PC, you can use your keyboard to calculate.
        </p>

      </section>
    </main>
  );
};

export default page;
