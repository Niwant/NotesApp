import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./noteService";

let initialState = {
  notes: [],
  currentPage: 0,
  numberofPages: 0,
  isError: false,
  isSuccess: false,
  isSuccessNote: false,
  isLoading: false,
  message: "",
};

export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (queries, thunkAPI) => {
    try {
      console.log(queries);
      const page = queries.page ? queries.page : 1;
      console.log(page);
      const searchTerm = queries.searchTerm ? queries.searchTerm : "";
      const tags = queries.tags ? queries.tags.join(",") : "";
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes({ page, searchTerm, tags }, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const getNotesSearch = createAsyncThunk(
//   "notes/getNotesSearch",
//   async (searchTerm, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       console.log(searchTerm);
//       return await noteService.getNotesbySearch(searchTerm, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.updateNote(updateData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.deleteNote(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.unshift(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload.notes;
        state.currentPage = action.payload.currentPage;
        state.numberofPages = action.payload.numberofPages;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("success");
        state.notes = state.notes.map((note) =>
          note._id === action.payload._id
            ? {
                ...action.payload,
              }
            : note
        );
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessNote = true;
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // .addCase(getNotesSearch.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getNotesSearch.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   console.log(action.payload);
    //   state.notes = action.payload;
    // })
    // .addCase(getNotesSearch.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
