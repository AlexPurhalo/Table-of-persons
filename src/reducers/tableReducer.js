export const initialState = {
    persons: [],
    loading: true
}

export const tableReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                persons: [...action.payload].reverse(),
                loading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'UPDATE_PERSONS':
            return {
                ...state,
                persons: [action.payload, ...state.persons],
                loading: false
            }
        case 'DELETE_PERSON':
            return {
                ...state,
                persons: state.persons.filter(
                    ({ id }) => id !== action.payload.id
                ),
                loading: false
            }
        case 'UPDATE_PERSON':
            return {
                ...state,
                persons: state.persons.map(
                    person =>
                        person.id === action.payload.id
                            ? action.payload
                            : person
                ),
                loading: false
            }
        default:
            return state
    }
}  