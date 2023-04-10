const API_URL = 'https://6433d2e7582420e2316c56f6.mockapi.io/persons';

export const fetchPersons = () => {
  return fetch(API_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .catch(error => { console.error(error) });
};

export const updatePerson = (personId, { name, age, about }) => {
  return fetch(`${API_URL}/${personId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, about })
  })
    .then(response => response.json())
    .catch(error => console.error(error))
};

export const updatePersons = ({ age, name, about }) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ age, name, about })
  })
    .then(response => response.json())
    .catch(error => { console.error(error) });
};

export const deletePerson = (personId) => {
  return fetch(`${API_URL}/${personId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .catch(error => { console.error(error) });
};
