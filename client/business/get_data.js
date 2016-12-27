import request from 'superagent';
import FormData from 'form-data';
import path from 'path';
import questions from './../configs/questions.json';

export default class WorkData {
	constructor(data) {
		this.data = {};
	}

	getPhotos(e) {
		console.log(e.files);
		let data = new FormData();
		data.append('file', e.files[0], e.id + '.jpg')
		console.log(data);
		request.post('/drive')
			.send(data)
			.end((err, res) => {
				if(err)	console.log(err);
				console.log(res);
			});
	}

	getData() {
		let data = this.data;
		let qInputs = document.getElementById('question-form').getElementsByTagName('input');
		let custInput = document.getElementById('customer-data').getElementsByTagName('input');
		
		for(let i = 0, len = qInputs.length; i < len; i++) {
			if(!qInputs[i].name) {
				data[qInputs[i].placeholder] = qInputs[i].value;
			} else if(qInputs[i].name) {
				if(qInputs[i].checked == true)
					data[questions[parseInt(qInputs[i].name, 10)].text] = qInputs[i].value;
			}
		}
		if(custInput) {
			data.important = [];
			data.important.push(custInput[0].name, custInput[0].value);
			data.important.push(custInput[1].name, custInput[1].value);
		}
		console.log(data);
		this.dataUpload(data);
	}
	
	dataUpload(data) {
		request.post('/drive')
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(data))
			.end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					console.log(res);
				}
		})
	}
}
