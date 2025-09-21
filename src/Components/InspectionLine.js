import React, { useRef } from "react";
import { ImageUp } from "lucide-react";
import styles from "./InspectionForm.module.css";

function InspectionLine({ line, value, onChange }) {
  const fileInputRef = useRef(null);

  const renderInput = () => {
    switch (line.type) {
      case "state":
        return (
          <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select</option>
            {line.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "photo":
        return (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => onChange(e.target.files[0])}
            />
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current.click()}
            >
              <ImageUp size={18} />
              {value ? "Change File" : "Upload Picture"}
            </button>
            {value && <span style={{ marginLeft: "8px" }}>{value.name}</span>}
          </div>
        );
      case "text":
        return <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} />;
      case "yesno":
        return (
          <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label>
        {line.label} {line.required ? "*" : ""}
      </label>
      {renderInput()}
    </div>
  );
}

export default InspectionLine;
