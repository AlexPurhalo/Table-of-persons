import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { useQuery } from "react-query";
import { TableWrapper } from "../styles/TableWrapper";
import { TableRow } from "./TableRow";
import { NewPersonRow } from "./NewPersonRow";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { fetchPersonsAsync, addPersonAsync, deletePersonAsync, updatePersonAsync } from '../personsSlice'
import { selectPersons, selectPersonsLoading, Person } from '../personsSlice'
import { RootState } from '../index'

export interface PersonInput {
  name: string;
  age: string;
  about: string;
}

const COLUMN_NAMES: string[] = ["ID", "Name", "Age", "About", "", ""];
const FIELD_INIT_DATA: PersonInput = { name: "", age: "", about: "" }

const Table = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const persons = useSelector(selectPersons);
  const loading = useSelector(selectPersonsLoading)

  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [editedPersonValues, setEditedPersonValues] = useState(FIELD_INIT_DATA);
  const [newPersonValues, setNewPersonValues] = useState(FIELD_INIT_DATA);

  useQuery("persons", () => dispatch(fetchPersonsAsync()));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setEditedPersonValues({
      ...editedPersonValues,
      [fieldName]: event.target.value
    });
  };

  const handleNewInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setNewPersonValues({
      ...newPersonValues,
      [fieldName]: event.target.value
    });
  };
 
  const handleAddNew = () => {
    dispatch(addPersonAsync(newPersonValues));
    setNewPersonValues(FIELD_INIT_DATA);
  };

  const handleEdit = (person: Person) => {
    if (editingPersonId === person.id) {
      dispatch(updatePersonAsync({ id: person.id, data: editedPersonValues }))
      setEditingPersonId(null);
    } else {
      setEditingPersonId(person.id);
      setEditedPersonValues({ ...person });
    }
  };
  
  const handleDelete = (id: string) => {
    dispatch(deletePersonAsync(id))
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
