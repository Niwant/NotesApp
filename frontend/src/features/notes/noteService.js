import axios from "axios";

const API_URL = "/api/notes/";

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
};

const getNotes = async ({ page, searchTerm, tags }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + `notes?page=${page}&searchTerm=${searchTerm}&tags=${tags}`,
    config
  );

  return response.data;
};
const getNotesbySearch = async (searchTerm, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + `search?search=${searchTerm}`,
    config
  );

  return response.data;
};

const updateNote = async (updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + updateData[0],
    updateData[1],
    config
  );

  return response.data;
};

const deleteNote = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const noteService = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNotesbySearch,
};

export default noteService;
