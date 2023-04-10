import React from "react";

export const TableHeader = ({ columnNames }) => {
  return (
    <thead>
      <tr>
        {columnNames.map((name, i) => (
          <th key={i}>{name}</th>
        ))}
      </tr>
    </thead>
  );
};
