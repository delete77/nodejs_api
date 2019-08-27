const express = require('express');
const bodyParser = require('body-parser');
const {Client} = require ('pg');
 //buat post
//const app= express();
const app= express();//instalasi express

app.use(bodyParser.json());
//tes koneksi pertama
/*app.get('/',(req, res)=>{
		res.end('siswa_list')
		});*/

//konfigurasi koneksi
const client = new Client({ //beda client dan Client //pemakaian modul postgre, client bebas, bisa ganti conn
	user: "postgres",
	password: 12345,
	host: "localhost", //127.0.0.1
	port: 5432,
	database: "nodejs_postgre"
});

//connect ke database
client.connect((err) =>{
	if(err) throw err;
	console.log('Connected Successfully');
});

//tampilkan isi dari table product
app.get('/api/siswa',(req, res)=>{
	let sql ="SELECT id, nama_lengkap,to_char (tanggal_lahir,'yyyy-mm-dd') tanggal_lahir,alamat from siswa";
	client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});

//tampilkan isi dari id ke- ..
app.get('/api/siswa/:id',(req, res)=>{
	let sql = "SELECT id, nama_lengkap,to_char (tanggal_lahir,'yyyy-mm-dd') tanggal_lahir,alamat from siswa WHERE id="+req.params.id;
	client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});

//tambah
app.post('/api/siswa/tambah',(req, res)=>{
	let sql ="INSERT INTO siswa (nama_lengkap,tanggal_lahir,alamat) values ('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"')";
	client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});

//edit
app.put('/api/edit/:id',(req, res)=>{
	let sql = "UPDATE siswa SET nama_lengkap='"+req.body.nama_lengkap+"', tanggal_lahir='"+req.body.tanggal_lahir+"', alamat='"+req.body.alamat_edit+"' WHERE id="+req.params.id;
	client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null,}));
	});
});

//delete
app.delete('/api/delete/:id', (req, res)=> {
	let sql = "DELETE FROM siswa WHERE id="+req.params.id;
	client.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, }));
	});
});



app.listen(8000,()=>{
	console.log('Server is running at port 8000');
});
