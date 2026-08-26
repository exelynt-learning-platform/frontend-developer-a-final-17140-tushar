import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCountriesApi } from '../api/employeeService';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCountriesApi();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch countries');
    }
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default countrySlice.reducer;
