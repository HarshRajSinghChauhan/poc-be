const notesService = require('./notes.services');

const createNote = async (req, res) => {
    try {
        const result = await notesService.createNote({ ...req.body, user_id: req.user.id });
        res.status(201).json({
            success: true,
            data: result,
            message: "resource created"
        });
    }catch(err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const getAllNotes = async (req, res) => {
    try {
        const result = await notesService.getAllNotes({...req.query, user_id: req.user.id})
        return res.status(200).json({
            success: true,
            data: result,
            message: "notes fetched successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const getNote = async (req, res) => {
    try {
        const result = await notesService.getNote({id:req.params.id, user_id: req.user.id})
        return res.status(200).json({
            success: true,
            data: result,
            message: "note fetched successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const updateNote = async (req, res) =>{
    try{
        const result = await notesService.updateNote({...req.body, user_id:req.user.id});
        return res.status(200).json({
            success:true,
            data: result,
            message: "resource updated"
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

const deleteNote = async (req, res) =>{
    try{
        console.log(req.params.id)
        const result = await notesService.deleteNote({...req.params, user_id:req.user.id});
        return res.status(200).json({
            success: true,
            data: result,
            message: "resource deleted"
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
}