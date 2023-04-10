import React, { useState, useReducer } from "react";
import { useQuery } from "react-query";
import { TableWrapper } from "../styles/TableWrapper";
import { updatePerson, deletePerson, updatePersons, fetchPersons } from "../requests";
import { TableRow } from "./TableRow";
import { NewPersonRow } from "./NewPersonRow";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { tableReducer, initialState } from '../reducers/tableReducer';

const COLUMN_NAMES = ["ID", "Name", "Age", "About", "", ""];
const FIELD_INIT_DATA = {name: "", age: '', about: ""}

const Table = () => {
  const [{ persons, loading }, dispatch] = useReducer(tableReducer, initialState);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editedPersonValues, setEditedPersonValues] = useState(FIELD_INIT_DATA);
  const [newPersonValues, setNewPersonValues] = useState(FIELD_INIT_DATA);

  useQuery('persons', fetchPersons, {
    refetchOnWindowFocus: false, 
    onSuccess: (data) => {
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    },
  });

  const handleInputChange = (event, fieldName) => {
    setEditedPersonValues({
      ...editedPersonValues,
      [fieldName]: event.target.value
    });
  };

  const handleNewInputChange = (event, fieldName) => {
    setNewPersonValues({
      ...newPersonValues,
      [fieldName]: event.target.value
    });
  };

  const handleAddNew = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const person = await updatePersons(newPersonValues);
    dispatch({ type: 'UPDATE_PERSONS', payload: person });
    setNewPersonValues(FIELD_INIT_DATA)
  };

  const handleEdit = async (person) => {
    if (editingPersonId === person.id) {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedPerson = await updatePerson(person.id, editedPersonValues);
      dispatch({ type: 'UPDATE_PERSON', payload: updatedPerson });
      setEditingPersonId(null);
    } else {
      setEditingPersonId(person.id);
      setEditedPersonValues({ ...person });
    }
  };

  const handleDelete = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const { id: personId } = await deletePerson(id);
    dispatch({ type: 'DELETE_PERSON', payload: { id: personId } });
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
