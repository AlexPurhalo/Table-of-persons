import { useState } from "react";
import { TableWrapper } from "../styles/TableWrapper";
import { updatePerson, deletePerson } from "../requests";

const Table = ({ persons, setPersons }) => {
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editedPersonValues, setEditedPersonValues] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const persons = await deletePerson(id);
    setPersons(persons);
    setLoading(false);
  };

  const handleEdit = async (person) => {
    setLoading(true);
    if (editingPersonId === person.id) {
      const updatedPerson = await updatePerson(person.id, editedPersonValues);

      setPersons((persons) => {
        return persons.map((person) =>
          person.id === updatePerson.id ? updatedPerson : person
        );
      });

      setEditingPersonId(null);
    } else {
      // Start editing
      console.log("Editing person with ID", person.id);
      setEditingPersonId(person.id);
      setEditedPersonValues({ ...person });
    }
    setLoading(false);
  };

  const handleInputChange = (event, fieldName) => {
    setEditedPersonValues({
      ...editedPersonValues,
      [fieldName]: event.target.value
    });
  };

  return (
    <TableWrapper loading={loading}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>About</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>
              {editingPersonId === person.id ? (
                <input
                  type="text"
                  value={editedPersonValues.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  disabled={loading}
                  className={"disabled"}
                />
              ) : (
                person.name
              )}
            </td>
            <td>
              {editingPersonId === person.id ? (
                <input
                  type="number"
                  value={editedPersonValues.age}
                  onChange={(e) => handleInputChange(e, "age")}
                  disabled={loading}
                />
              ) : (
                person.age
              )}
            </td>
            <td>
              {editingPersonId === person.id ? (
                <textarea
                  value={editedPersonValues.about}
                  onChange={(e) => handleInputChange(e, "about")}
                  disabled={loading}
                ></textarea>
              ) : (
                person.about
              )}
            </td>
            <td>
              <button onClick={() => handleEdit(person)} disabled={loading}>
                {editingPersonId === person.id ? "Save" : "Edit"}
              </button>
            </td>
            <td>
              <button
                className={"disabled"}
                onClick={() => handleDelete(person.id)}
                disabled={loading}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default Table;
