import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import LmsApiService from '../../app/services/LmsApiService';

export const fetchEnterpriseFromSlug = createAsyncThunk('enterprise/fetchEnterpriseFromSlug', async (slug) => {
  const result = await LmsApiService.fetchEnterpriseBySlug(slug);
  console.log(result, 'response from API');
  return result.data.results[0];
},
{
  condition: (slug, { getState }) => {
    const { enterprise } = getState();
    const currentSlug = enterprise.slug;
    const { status } = enterprise;
    if (status === 'loading' || slug === currentSlug) {
      return false;
    }
    return true;
  },
});

const initialState = {
  slug: null,
  uuid: null,
  name: null,
  id: null,
  status: 'initial', /* loading, reset, error, loaded */
};

const enterpriseSlice = createSlice({
  name: 'enterprise',
  initialState,
  reducers: {
    clear(state) {
      state.slug = null;
      state.uuid = null;
      state.name = null;
      state.id = null;
      state.status = 'initial';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchEnterpriseFromSlug.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchEnterpriseFromSlug.fulfilled, (state, action) => {
      console.log(action.payload, 'in reducer');
      const enterpriseInfo = action.payload;
      state.slug = enterpriseInfo.slug;
      state.uuid = enterpriseInfo.uuid;
      state.name = enterpriseInfo.name;
      state.id = enterpriseInfo.id;
      state.status = 'loaded';
    });
  },
});

export const { clear } = enterpriseSlice.actions;
export default enterpriseSlice.reducer;
