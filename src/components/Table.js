import { useState, useEffect } from "react";
import { TableWrapper } from "../styles/TableWrapper";
import {
  updatePerson,
  deletePerson,
  updatePersons,
  fetchPersons
} from "../requests";
import { TableRow } from "./TableRow";
import { NewPersonRow } from "./NewPersonRow";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

const COLUMN_NAMES = ["ID", "Name", "Age", "About", "", ""];

const Table = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editedPersonValues, setEditedPersonValues] = useState({
    name: "",
    age: null,
    about: ""
  });

  const [newPersonValues, setNewPersonValues] = useState({
    name: "",
    age: null,
    about: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPersons();
      setPersons(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNewInputChange = (event, fieldName) => {
    setNewPersonValues({
      ...newPersonValues,
      [fieldName]: event.target.value
    });
  };

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
    const persons = await updatePersons(newPersonValues);
    setPersons(persons);
    setLoading(false);
    setNewPersonValues({  name: "", age: null, about: "" })
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
