import React from "react";
import { FaCar, FaIndustry, FaWarehouse } from "react-icons/fa";
import "../App.css"; // or "./CategoryList.css" if you separated it


function CategoryList({ categories, onSelect }) {
  const getIcon = (category) => {
    switch (category) {
      case "Vehicle":
        return <FaCar className="icon" />;
      case "Site":
        return <FaWarehouse className="icon" />;
      case "Supplier":
        return <FaIndustry className="icon" />;
      default:
        return <FaCar className="icon" />;
    }
  };

  return (
    <div className="grid">
      {categories.map((cat) => (
        <div
          key={cat.category}
          className="card"
          onClick={() => onSelect(cat)}
        >
          {getIcon(cat.category)}
          <h3>{cat.category}</h3>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
