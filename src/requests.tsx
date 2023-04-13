const API_URL = 'https://6433d2e7582420e2316c56f6.mockapi.io/persons';
import { Person } from './personsSlice'

export const fetchPersons = (): Promise<Person[]> => {
  return fetch(API_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .catch(error => { console.error(error); throw error });
};

export const updatePerson = (personId: string, personData: Partial<Person>): Promise<Person> => {
  return fetch(`${API_URL}/${personId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personData)
  })
    .then(response => response.json())
    .catch(error => { console.error(error); throw error });
};

export const updatePersons = (personData: Partial<Person>): Promise<Person> => {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personData)
  })
    .then(response => response.json())
    .catch(error => { console.error(error); throw error });
};

export const deletePerson = (personId: string): Promise<Person> => {
  return fetch(`${API_URL}/${personId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .catch(error => { console.error(error); throw error });
};
