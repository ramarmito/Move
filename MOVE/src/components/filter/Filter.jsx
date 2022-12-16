import React, { useState } from "react";

// styles
import "./filter.scss";

const filterList = [
  "All",
  "Mine",
  // "Educational",
  // "Skills Development",
  "In Progress",
  "Completed",
];

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("All");

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  };

  return (
    <div className="filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
