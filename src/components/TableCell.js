import React from "react";

export const TableCell = ({ editing, value, onChange, loading }) => {
  if (editing) {
    return (
      <input type="text" value={value} onChange={onChange} disabled={loading} />
    );
  } else {
    return <>{value}</>;
  }
};
