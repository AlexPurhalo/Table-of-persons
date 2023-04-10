const mockData = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    about:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 45,
    about:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
  }
];

export const fetchPersons = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};

export const updatePerson = (personId, updatedData) => {
  return new Promise((resolve, reject) => {
    // find the person with the given id
    const personToUpdate = mockData.find((person) => person.id === personId);

    // if the person was found, update their data and resolve the promise
    if (personToUpdate) {
      setTimeout(() => {
        Object.assign(personToUpdate, updatedData);
        resolve(personToUpdate);
      }, 1500);
    } else {
      reject(new Error(`No person with id ${personId} found.`));
    }
  });
};

export const updatePersons = (person) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockData, { ...person, id: mockData.length + 1 }]);
    }, 1500);
  });
};

export const deletePerson = (personId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const persons = mockData.filter(({ id }) => id !== personId);
      resolve(persons);
    }, 1500);
  });
};
