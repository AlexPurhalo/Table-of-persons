import React from "react";

interface TableHeaderProps {
  columnNames: string[];
}

export const TableHeader = ({ columnNames }: TableHeaderProps) => {
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
