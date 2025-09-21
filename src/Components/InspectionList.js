import React from "react";
import { FaCogs, FaCarCrash, FaTools, FaCheckSquare } from "react-icons/fa";

function InspectionList({ inspections, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case "engine":
        return <FaCogs className="icon" />;
      case "brakes":
        return <FaCarCrash className="icon" />;
      case "suspension":
        return <FaTools className="icon" />;
      default:
        return <FaCheckSquare className="icon" />;
    }
  };

  return (
    <div className="grid">
      {inspections.map((insp) => (
        <div
          key={insp.id}
          className="card"
          onClick={() => onSelect(insp)}
        >
          {getIcon(insp.id)}
          <h3>{insp.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default InspectionList;
