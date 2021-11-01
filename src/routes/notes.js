const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)

  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  let allNotes = `SELECT * FROM notes`

  let notes = []

  db.query(allNotes, (err, results)=>{
    if(err) {
      throw err
    }

    notes = results  // this is the response object, make sure to replace with actual value

    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNoteArray(notes)) {
      res.status(500).send('Invalid data type')
    }
    res.send({ notes })
    // --- end of succ flow ---


    // Upon fail, run the following line to respond with an error
    // --- begin of fail flow ---
    // res.status(500).send('Fail to query')
    // --- end of fail flow ---
  }) 
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey
  console.log(searchKey)

  let searchNote = `SELECT * FROM notes
                    WHERE text LIKE '%`+ searchKey +`%'`

  db.query(searchNote, (err, results)=>{
    if(err){
      throw err
    }

    const notes = results // this is the response object, make sure to replace with actual value


    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNoteArray(notes)) {
      res.status(500).send('Invalid data type')
    }
    res.send({ notes })
    // --- end of succ flow ---



    // Upon fail, run the following line to response with error

    // --- begin of fail flow ---
    // res.status(500).send('Fail to query')
    // --- end of fail flow ---
  })
  
})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */

  let deleteNotes = `TRUNCATE notes`

  db.query(deleteNotes, (err)=>{
    if(err){
      throw err
    }
  })

    // Upon succ, run the following lines to validate the response object and reponse to client

    // --- begin of succ flow ---
    res.send()
    // --- end of succ flow ---



    // Upon fail, run the following line to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to delete')
    // --- end of fail flow ---

})
/* -------------------------------------------------------------------------- */

module.exports = router