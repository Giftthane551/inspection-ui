import React from "react";
import styles from "./InspectionGrid.module.css";
import { FaCogs, FaCarCrash, FaTools } from "react-icons/fa";

const iconMap = {
  engine: <FaCogs size={30} color="#1e3a8a" />,
  brakes: <FaCarCrash size={30} color="#f59e0b" />,
  suspension: <FaTools size={30} color="#16a34a" />,
};

function InspectionGrid({ inspections, onSelect }) {
  return (
    <div className={styles.gridContainer}>
      {inspections.map((insp) => (
        <div
          key={insp.id}
          className={styles.card}
          onClick={() => onSelect(insp)}
        >
          <div className={styles.icon}>{iconMap[insp.icon]}</div>
          <h3 className={styles.name}>{insp.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default InspectionGrid;
