import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  document: null,
  editDocument: null,
};

const docSlice = createSlice({
  name: "doc",
  initialState: initialState,
  reducers: {
    setDocument: (state, action) => {
      state.document = action.payload;
    },
    setEditDocument: (state, action) => {
      state.editDocument = action.payload;
    },
  },
});

export const { setDocument, setEditDocument } = docSlice.actions;
export default docSlice.reducer;
