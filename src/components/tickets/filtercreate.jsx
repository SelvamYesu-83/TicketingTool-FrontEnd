import React, { useState } from "react";
import "../../style/tickets/filtercreate.css"; // Importing the CSS file

const Filter = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="filter-container">
      <form className="filter-form">
        {/* Project Selection */}
        <select
          className="filter-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          <option value="Sales Executive App">Sales Executive App</option>
          <option value="PSMART Customer App">PSMART Customer App</option>
          <option value="Zoho Analytics">Zoho Analytics</option>
          <option value="Focuz ERP">Focuz ERP</option>
          <option value="Customer Web">Customer Web</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          className="filter-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Category Selection */}
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Level 1">Level 1</option>
          <option value="Level 2">Level 2</option>
          <option value="Level 3">Level 3</option>
        </select>

        {/* Create Button */}
        <button className="filter-button">Create</button>
      </form>
    </div>
  );
};

export default Filter;
