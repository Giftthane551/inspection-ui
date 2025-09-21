import React, { useState } from "react";
import { FaHome, FaArrowLeft, FaClipboardList } from "react-icons/fa";
import sampleData from "./data/sampleInspections.json";
import CategoryList from "./Components/CategoryList";
import InspectionList from "./Components/InspectionList";
import InspectionForm from "./Components/InspectionForm";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);

  const goHome = () => {
    setSelectedCategory(null);
    setSelectedInspection(null);
  };

  const goBack = () => {
    if (selectedInspection) {
      setSelectedInspection(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <nav className="navbar">
        <div className="nav-left">
          <FaHome className="nav-icon" onClick={goHome} title="Home" />
          {selectedCategory && (
            <FaArrowLeft className="nav-icon" onClick={goBack} title="Back" />
          )}
        </div>
        <div className="nav-title">
          <FaClipboardList /> Inspection UI
        </div>
      </nav>

      <main className="content">
        {!selectedCategory && (
          <CategoryList
            categories={sampleData}
            onSelect={(cat) => setSelectedCategory(cat)}
          />
        )}

        {selectedCategory && !selectedInspection && (
          <InspectionList
            inspections={selectedCategory.inspections}
            onSelect={(insp) => setSelectedInspection(insp)}
          />
        )}

        {selectedInspection && (
          <InspectionForm inspection={selectedInspection} />
        )}
      </main>
    </div>
  );
}

export default App;
