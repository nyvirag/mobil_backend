const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

var connection
function kapcsolat() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zaroedzes'
  })

  connection.connect()

}

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/gyakorlatok', (req, res) => {

  kapcsolat()
  connection.query('SELECT * FROM gyakorlatok', (err, rows, fields) => {
    if (err) throw err

    console.log(rows)
    res.send(rows)
  })
  connection.end()
});




//segedtabla------------------------------

app.get('/felhasznalo_cel', (req, res) => {

  kapcsolat()
  connection.query('SELECT * FROM felhasznalo_cel', (err, rows, fields) => {
    if (err) throw err

    console.log(rows)
    res.send(rows)
  })
  connection.end()
});


/*INSERT INTO `gyakorlatok` VALUES (NULL, 'alma', 'állkapocs', 'ráharapsz kitörik a fogad', 'alma.jpg');



app.post('/felvitelgyak', (req, res) => {
  kapcsolat()

  connection.query(`INSERT INTO gyakorlatok VALUES (NULL, 'alma', 'állkapocs', 'ráharapsz kitörik a fogad', 'alma.jpg')`, (err, rows, fields) => {
    if (err) {
      console.log("Hiba")
      res.send("Hiba")
    }
    else {
      console.log("Sikeres felvitel")
      res.send("Sikeres felvitel")
    }




  })
  connection.end()
})
*/






const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });



app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);

/*----------adatbbe valo feltoltes----------------*/
  kapcsolat()
  connection.query(`INSERT INTO gyakorlatok VALUES (NULL, '${req.body.bevitel1}', 'állkapocs', 'ráharapsz kitörik a fogad', '${req.files[0].filename}')`, (err, rows, fields) => {
    if (err) {
      console.log("Hiba")
      res.send("Hiba")
    }
    else {
      console.log("Sikeres felvitel")
      res.send("Sikeres felvitel")
    }




  })
  connection.end()




  
});









app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});