import request from 'superagent';
import fs from 'fs';
import questions from './../configs/questions.json';

export default class WorkData {
	constructor(data) {
		this.data = {};
	}

	getData() {
		let data = this.data;
		let fileInput = document.getElementById('photo-form').getElementsByTagName('input');
		for(let i = 0, len = fileInput.length; i < len; i++)
			data[fileInput[i].name] = fileInput[i].value;

		let qInputs = document.getElementById('question-form').getElementsByTagName('input');
		for(let i = 0, len = qInputs.length; i < len; i++) {
			if(!qInputs[i].name) {
				data[qInputs[i].placeholder] = qInputs[i].value;
			} else if(qInputs[i].name) {
				if(qInputs[i].checked == true)
					data[questions[parseInt(qInputs[i].name, 10)].text] = qInputs[i].value;
			}
		}
		let custInput = document.getElementById('customer-data').getElementsByTagName('input');
		for(let i = 0, len = custInput.length; i < len; i++)
			if(custInput[i].type == "text")
				data[custInput[i].name] = custInput[i].value;

		this.dataUpload(data);
	}
	
	dataUpload(work) {
		request.post('/drive')
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(work))
			.end((err, res) => {
				if(err) {
					console.log(err);
				} else {
					console.log(res);
				}
			})
	}
}
