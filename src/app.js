const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mysql = require('mysql')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")
const { text } = require('express')

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/
// create connection to database
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notesapp'
});

// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});

global.db = db;

/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/
let createTable = `CREATE TABLE IF NOT EXISTS notes
                  (id int not null auto_increment primary key,
                  text varchar(200),
                  dateCreated timestamp default current_timestamp,
                  lastModified timestamp default current_timestamp);`

db.query(createTable, function(err){
  if(err) {
    console.log(err.message);
  }
})

global.db = db

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
