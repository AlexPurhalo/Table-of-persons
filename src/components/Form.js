import React, { useState } from "react";
import { FormWrapper } from "../styles/FormWrapper";
import { updatePersons } from "../requests";

const Form = ({}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const persons = await updatePersons({ name, age, about });
    console.log(`persons`, persons);
    setPersons(persons);

    setName("");
    setAge("");
    setAbout("");
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>Add Person</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <br />
      <label>
        About:
        <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add</button>
    </FormWrapper>
  );
};

export default Form;
