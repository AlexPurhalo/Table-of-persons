import React from "react";

interface Props {
  editing: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

export const TableCell: React.FC<Props> = ({ editing, value, onChange, loading }) => {
  if (editing) {
    return (
      <input type="text" value={value} onChange={onChange} disabled={loading} />
    );
  } else {
    return <>{value}</>;
  }
};
