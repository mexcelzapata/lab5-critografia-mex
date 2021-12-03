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
  let datos ={};
  
  client.query('SELECT * from cripto', (err, res) => {

	  // console.log(err, res) 
	  //console.log(res.Result.rows)
	  datos = res
	  console.log(res)
	  client.end()

	  })

  app.get('/tabla', (req,res)=>{

		res.send(datos.rows)
		return (`
			<table >
				<caption>Ejemplo de tabla</caption>
				<tbody>
					<tr>
					<td></td>
					<th>A</th>
					<th>B</th>
					</tr>
					<tr>
					<th>1</th>
					<td>A1</td>
					<td>B1</td>
					</tr>
					<tr>
					<th>2</th>
					<td>A2</td>
					<td>B2</td>
					</tr>
				</tbody>
			</table>
		`)




 	})








app.listen(process.env.PORT,()=>{
	console.log("funcionando");
})
