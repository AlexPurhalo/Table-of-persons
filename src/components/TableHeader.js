import React from "react";

export const TableHeader = ({ columnNames }) => {
  return (
    <thead>
      <tr>
        {columnNames.map((name) => (
          <th key={name}>{name}</th>
        ))}
      </tr>
    </thead>
  );
};
