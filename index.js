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
  const datos ={};
  
  client.query('SELECT * from cripto', (err, res) => {

	  // console.log(err, res) 
	  //console.log(res.Result.rows)
	  datos = res
	  console.log(res)
	  client.end()

	  })

  app.get('/tabla', (req,res)=>{

		res.send(datos)
 	})








app.listen(process.env.PORT,()=>{
	console.log("funcionando");
})
