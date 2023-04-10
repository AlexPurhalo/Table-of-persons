import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { TableWrapper } from "../styles/TableWrapper";
import { TableRow } from "./TableRow";
import { NewPersonRow } from "./NewPersonRow";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { fetchPersonsAsync, addPersonAsync, deletePersonAsync, updatePersonAsync } from '../personsSlice'
import { selectPersons, selectPersonsLoading } from '../personsSlice'

const COLUMN_NAMES = ["ID", "Name", "Age", "About", "", ""];
const FIELD_INIT_DATA = {name: "", age: '', about: ""}

const Table = () => {
  const dispatch = useDispatch();
  const persons = useSelector(selectPersons);
  const loading = useSelector(selectPersonsLoading)

  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editedPersonValues, setEditedPersonValues] = useState(FIELD_INIT_DATA);
  const [newPersonValues, setNewPersonValues] = useState(FIELD_INIT_DATA);

  useQuery("persons", () => dispatch(fetchPersonsAsync()));

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

  const handleAddNew = () => {
    dispatch(addPersonAsync(newPersonValues));
    setNewPersonValues(FIELD_INIT_DATA);
  };

  const handleEdit = (person) => {
    if (editingPersonId === person.id) {
      dispatch(updatePersonAsync({ id: person.id, data: editedPersonValues }))
      setEditingPersonId(null);
    } else {
      setEditingPersonId(person.id);
      setEditedPersonValues({ ...person });
    }
  };

  const handleDelete = (id) => {
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
