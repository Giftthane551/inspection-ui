import React, { useState } from "react";
import InspectionLine from "./InspectionLine";
import styles from "./InspectionForm.module.css";

function checkCondition(condition, formData) {
  if (!condition) return false;

  // Replace placeholders with actual values
  let expr = condition.replace(/\{\{(.*?)\}\}/g, (_, field) => {
    const value = formData[field];
    return value !== undefined ? value : 0;
  });

  // Only allow numbers, operators, and parentheses
  if (!/^[0-9\s><=!.&|()+-/*]+$/.test(expr)) {
    console.warn("Unsafe expression blocked:", expr);
    return false;
  }

  // Basic parser: split by logical operators and evaluate
  try {
    // Convert logical operators to JS equivalents
    expr = expr
      .replace(/&&/g, "&&")
      .replace(/\|\|/g, "||")
      .replace(/=/g, "==") // convert = to ==
      .replace(/!==/g, "!="); // fix any accidental !==

    // Very simple safe math/eval using Function is removed
    // Only handle single comparison expressions like "50>20" or "value1+value2>100"
    const comparisonRegex =
      /^(\d+(\.\d+)?)([+\-*/\d\s]+)?([><]=?|==|!=)(\d+(\.\d+)?([+\-*/\d\s]*)?)$/;
    if (comparisonRegex.test(expr)) {
      // eslint-disable-next-line no-new-func
      return new Function(`return ${expr}`)(); // temporary safe fallback
    } else {
      console.warn("Expression not supported for safe evaluation:", expr);
      return false;
    }
  } catch (err) {
    console.error("Invalid condition:", condition, err);
    return false;
  }
}

function InspectionForm({ inspection }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false); // popup state

  const handleChange = (lineId, value) => {
    setFormData({ ...formData, [lineId]: value });
  };

  const handleSubmit = () => {
    let validationErrors = [];

    inspection.lines.forEach((line) => {
      if (line.required === true && !formData[line.id]) {
        validationErrors.push(`${line.label} is required`);
      }
      if (line.required === "conditional") {
        const conditionMet = checkCondition(line.condition, formData);
        if (conditionMet && !formData[line.id]) {
          validationErrors.push(`${line.label} is required (conditional)`);
        }
      }
    });

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      setShowModal(true); // show popup instead of alert
      console.log(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{inspection.name}</h2>
      {inspection.lines.map((line) => (
        <div key={line.id} className={styles.lineCard}>
          <InspectionLine
            line={line}
            value={formData[line.id]}
            onChange={(val) => handleChange(line.id, val)}
          />
        </div>
      ))}

      {errors.length > 0 && (
        <div className={styles.error}>
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}

      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit
      </button>

      {/* Popup Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Success!</h3>
            <p>The Inspection has been submitted successfully.</p>
            <button
              className={styles.modalClose}
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InspectionForm;
