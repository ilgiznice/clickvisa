import express from 'express';
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import authorize from './auth.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: true
}));

router.route('/drive').get((req, res, next) => {
	console.log(req.body);
	fs.readFile(path.join(__dirname, './../../static/client_secret.json'), function processClientSecrets(err, content) {
	  if (err) {
		console.log('Error loading client secret file: ' + err);
		return;
	  }
	  res.send(authorize(JSON.parse(content), createFolder));
	});
	
	function createFolder(auth) {
		let service = google.drive('v3');
		let fileMetadata = {
			'name': 'Invoices',
			'mimeType': 'application/vnd.google-apps.folder'
		};

		service.files.create({
			auth: auth,
			resource: fileMetadata,
			field: 'id'
		}, (err, file) => {
			if(err) {
				console.log(err);
			} else {
				console.log(file);
			}
		});
	}
});

module.exports = router;
