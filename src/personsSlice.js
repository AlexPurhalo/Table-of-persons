import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPersons, updatePerson, deletePerson, updatePersons } from './requests';

const initialState = {
    persons: [],
    loading: false,
    error: null
};

export const fetchPersonsAsync = createAsyncThunk(
    'persons/fetch',
    async () => {
        const response = await fetchPersons();
        return response;
    }
);

export const updatePersonAsync = createAsyncThunk(
    'persons/update',
    async ({ id, data }) => {
        const response = await updatePerson(id, data);
        return response;
    }
);

export const deletePersonAsync = createAsyncThunk(
    'persons/delete',
    async (id) => {
        const response = await deletePerson(id);
        return response.id;
    }
);

export const addPersonAsync = createAsyncThunk(
    'persons/add',
    async (data) => {
        const response = await updatePersons(data);
        return response;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
            });
            
    },
});

export const selectPersons = (state) => state.persons.persons;
export const selectPersonsLoading = (state) => state.persons.loading;
export const selectPersonsError = (state) => state.persons.error;

export default personsSlice.reducer;
