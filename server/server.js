import express from "express";
import path from "path";

const app = express();

app.use('/static', express.static(path.join(__dirname, './../static')));
app.use((req, res, next) => { 
	res.header('Access-Control-Allow-Origin', "*"); 
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); 
	res.header('Access-Control-Allow-Headers', 'Content-Type'); 
	next();
})
app.post('/drive', require('./routes/to-drive.js'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './../static/index.html'));
});

app.listen(7000, () => {
	console.log('server on: 7000');
})
