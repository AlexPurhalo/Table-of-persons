import React from 'react';
import { TableCell } from "./TableCell";
import { PersonInput } from './Table';

interface NewPersonRowProps {
  values: PersonInput;
  loading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  onAddNew: () => void;
}

export const NewPersonRow: React.FC<NewPersonRowProps> = ({ values, loading, onInputChange, onAddNew }) => (
  <tr>
    <td>---</td>
    <td>
      <TableCell
        editing={true}
        value={values.name}
        onChange={(e) => onInputChange(e, "name")}
        loading={loading}
      />
    </td>
    <td>
      <TableCell
        editing={true}
        value={values.age}
        onChange={(e) => onInputChange(e, "age")}
        loading={loading}
      />
    </td>
    <td>
      <TableCell
        editing={true}
        value={values.about}
        onChange={(e) => onInputChange(e, "about")}
        loading={loading}
      />
    </td>
    <td>
      <button onClick={() => onAddNew()} disabled={loading}>
        Add
      </button>
    </td>
    <td></td>
  </tr>
);