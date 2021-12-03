const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());



const client = new Client({
	connectionString: process.env.DATABASE_URL, //
	ssl: {rejectUnauthorized: false}
  })
  client.connect()



  app.get('/tabla', (req,res)=>{
	let datos = {}

	client.query('SELECT * from cripto', (err, res) => {
		// console.log(err, res) 
		console.log(res.Result.rows)
		datos = res.json()
		console.log("ayudaaaa")
		client.end()
		})
		res.send(datos)
 	})








app.listen(process.env.PORT,()=>{
	console.log("funcionando");
})
