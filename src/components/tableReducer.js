export const initialState = {
  persons: [],
  loading: true,
  editingPersonId: null,
  editedPersonValues: {
    name: "",
    age: null,
    about: ""
  },
  newPersonValues: {
    name: "",
    age: null,
    about: ""
  }
};

export const tableReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PERSONS_SUCCESS":
      return {
        ...state,
        persons: action.payload,
        loading: false
      };
    case "SET_NEW_PERSON_VALUE":
      return {
        ...state,
        newPersonValues: {
          ...state.newPersonValues,
          [action.fieldName]: action.payload
        }
      };
    case "SET_EDITED_PERSON_VALUE":
      return {
        ...state,
        editedPersonValues: {
          ...state.editedPersonValues,
          [action.fieldName]: action.payload
        }
      };
    case "SET_EDITING_PERSON_ID":
      return {
        ...state,
        editingPersonId: action.payload
      };
    case "SET_EDITED_PERSON":
      return {
        ...state,
        editedPersonValues: { ...action.payload }
      };
    case "ADD_PERSON_SUCCESS":
      return {
        ...state,
        persons: [...state.persons, action.payload],
        loading: false
      };
    case "UPDATE_PERSON_SUCCESS":
      return {
        ...state,
        persons: state.persons.map((person) =>
          person.id === action.payload.id ? action.payload : person
        ),
        editingPersonId: null,
        loading: false
      };
    case "DELETE_PERSON_SUCCESS":
      return {
        ...state,
        persons: state.persons.filter((person) => person.id !== action.payload),
        loading: false
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};


"FETCH_PERSONS_SUCCESS"
"SET_NEW_PERSON_VALUE"
"SET_EDITED_PERSON_VALUE"
"SET_EDITING_PERSON_ID"
"SET_EDITED_PERSON"
"ADD_PERSON_SUCCESS"
"UPDATE_PERSON_SUCCESS"
"DELETE_PERSON_SUCCESS"
"SET_LOADING"
