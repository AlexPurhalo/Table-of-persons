import { useState } from "react";
import { useQuery } from "react-query";
import { TableWrapper } from "../styles/TableWrapper";
import { updatePerson, deletePerson, updatePersons, fetchPersons } from "../requests";
import { TableRow } from "./TableRow";
import { NewPersonRow } from "./NewPersonRow";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

const COLUMN_NAMES = ["ID", "Name", "Age", "About", "", ""];
const FIELD_INIT_DATA = {name: "", age: '', about: ""}

const Table = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editedPersonValues, setEditedPersonValues] = useState(FIELD_INIT_DATA);
  const [newPersonValues, setNewPersonValues] = useState(FIELD_INIT_DATA);

  useQuery('persons', fetchPersons, {
    refetchOnWindowFocus: false, 
    onSuccess: (data) => {
      setPersons(data.reverse())
      setLoading(false);
    },
  });

  const handleNewInputChange = (event, fieldName) => {
    setNewPersonValues({
      ...newPersonValues,
      [fieldName]: event.target.value
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const { id: personId } = await deletePerson(id);
    const filteredPersons = persons.filter(({ id }) => id !== personId) 
    setPersons(filteredPersons);
    setLoading(false);
  };

  const handleEdit = async (person) => {
    setLoading(true);
    if (editingPersonId === person.id) {
      const updatedPerson = await updatePerson(person.id, editedPersonValues);
      const updatedPersons = persons.map(
        person =>
          person.id === updatedPerson.id
            ? updatedPerson
            : person
      )

      setPersons(updatedPersons);
      setEditingPersonId(null);
    } else {
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

  const handleAddNew = async () => {
    setLoading(true);
    const person = await updatePersons(newPersonValues);
    setPersons([person , ...persons]);
    setLoading(false);
    setNewPersonValues(FIELD_INIT_DATA)
  };

    
  return (
    <TableWrapper>
      <TableHeader columnNames={COLUMN_NAMES} />
      <TableBody>
        <NewPersonRow
          values={newPersonValues}
          loading={loading}
          onInputChange={handleNewInputChange}
          onAddNew={handleAddNew}
        />
        {persons.map((person) => (
          <TableRow
            key={person.id}
            person={person}
            editingPersonId={editingPersonId}
            editedPersonValues={editedPersonValues}
            handleEdit={handleEdit}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
            loading={loading}
          />
        ))}
      </TableBody>
    </TableWrapper>
  );
};

export default Table;
