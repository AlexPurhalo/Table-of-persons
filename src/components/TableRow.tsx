import React from "react";
import { TableCell } from "./TableCell";
import { PersonInput } from './Table';

interface Person {
  id: string;
  name: string;
  age: string;
  about: string;
}

interface Props {
  person: Person;
  editingPersonId: string | null;
  editedPersonValues: PersonInput;
  handleEdit: (person: Person) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleDelete: (id: string) => void;
  loading?: boolean;
}

export const TableRow: React.FC<Props> = ({
  person,
  editingPersonId,
  editedPersonValues,
  handleEdit,
  handleInputChange,
  handleDelete,
  loading
}) => {
  return (
    <tr key={person.id}>
      <td>{person.id}</td>
      <td>
        <TableCell
          editing={editingPersonId === person.id}
          value={
            editingPersonId === person.id
              ? editedPersonValues.name
              : person.name
          }
          onChange={(e) => handleInputChange(e, "name")}
          loading={loading}
        />
      </td>
      <td>
        <TableCell
          editing={editingPersonId === person.id}
          value={
            editingPersonId === person.id ? editedPersonValues.age : person.age
          }
          onChange={(e) => handleInputChange(e, "age")}
          loading={loading}
        />
      </td>
      <td>
        <TableCell
          editing={editingPersonId === person.id}
          value={
            editingPersonId === person.id
              ? editedPersonValues.about
              : person.about
          }
          onChange={(e) => handleInputChange(e, "about")}
          loading={loading}
        />
      </td>
      <td>
        <button onClick={() => handleEdit(person)} disabled={loading}>
          {editingPersonId === person.id ? "Save" : "Edit"}
        </button>
      </td>
      <td>
        <button onClick={() => handleDelete(person.id)} disabled={loading}>
          Delete
        </button>
      </td>
    </tr>
  );
};
