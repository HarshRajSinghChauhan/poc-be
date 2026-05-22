const express = require('express');
const router = express.Router();
const notesController = require('./notes.controller');
const {auth} = require('../../middlewares/auth.middleware.js')
const {authorize} = require('../../middlewares/authorize.middleware.js')

router.post('/create', auth, (req, res, next) => {
    notesController.createNote(req, res, next);
});

router.get('/', auth, (req, res, next)=>{
    notesController.getAllNotes(req,res,next);
});

router.get('/:id', auth, (req, res, next)=>{
    notesController.getNote(req,res,next);
});

router.patch('/:id', auth, (req, res, next)=>{
    notesController.updateNote(req,res,next);
});

router.delete('/:id', auth, (req, res, next)=>{
    notesController.deleteNote(req,res,next);
});

module.exports = router;