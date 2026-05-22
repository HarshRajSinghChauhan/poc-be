const NotesRepository = require('./notes.repository');

const createNote = async (data) => {
    return await NotesRepository.createNote(data);
};

const getAllNotes = async (data) => {
    return await NotesRepository.getAllNotes(data);
}

const getNote = async (data) => {
    return await NotesRepository.getNote(data);
}

const updateNote = async (data) => {
    return await NotesRepository.updateNote(data);
}

const deleteNote = async (data) => {
    return await NotesRepository.deleteNote(data);
}
module.exports = {
    createNote, getAllNotes, getNote, updateNote, deleteNote
}