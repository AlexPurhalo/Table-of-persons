import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from './index'
import { fetchPersons, updatePerson, deletePerson, updatePersons } from './requests';


export interface Person {
    id: string;
    name: string;
    age: string;
    about: string;
}

interface PersonsState {
    persons: Person[];
    loading: boolean;
    error: null | string;
}

const initialState: PersonsState = {
    persons: [],
    loading: false,
    error: null
};

export const addPersonAsync = createAsyncThunk(
    'persons/add',
    async (data: Partial<Person>) => {
        const response = await updatePersons(data);
        return response as Person;
    }
);

export const fetchPersonsAsync = createAsyncThunk(
    'persons/fetch',
    async () => {
        const response = await fetchPersons();
        return response as Person[];
    },
);

export const updatePersonAsync = createAsyncThunk(
    'persons/update',
    async ({ id, data }: ({ id: string, data: Partial<Person> })) => {
        const response = await updatePerson(id, data);
        return response as Person;
    }
);

export const deletePersonAsync = createAsyncThunk(
    'persons/delete',
    async (id: string) => {
        const response = await deletePerson(id);
        return response.id as string;
    }
);

export const personsSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(addPersonAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPersonAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.persons.unshift(action.payload);
            })
            .addCase(addPersonAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while trying to add a new person'
            })

            // READ
            .addCase(fetchPersonsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPersonsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.persons = action.payload.reverse();
            })
            .addCase(fetchPersonsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while trying to get the persons list';
            })

            // UPDATE
            .addCase(updatePersonAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePersonAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.persons.findIndex(person => person.id === action.payload.id);
                state.persons[index] = action.payload;
            })
            .addCase(updatePersonAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'error while trying to update the person';
            })
            
            // DELETE
            .addCase(deletePersonAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePersonAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.persons = state.persons.filter(person => person.id !== action.payload);
            })
            .addCase(deletePersonAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'error while trying to delete the person';
            });
            
    },
});

export const selectPersons = (state: RootState) => state.persons.persons;
export const selectPersonsLoading = (state: RootState) => state.persons.loading;
export const selectPersonsError = (state: RootState) => state.persons.error;

export const personsReducer = personsSlice.reducer;