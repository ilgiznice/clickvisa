import express from 'express';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import readline from 'readline';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import authorize from './auth.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: false
}));

router.route('/drive').post((req, res, next) => {
	mkdirp('./static/localfiles/user', (err) => {
		if (err) console.log(err);
		else console.log('norm');
	});
	
	console.log(req.body.photos);
	let data = req.body;
	let folderId;
	let service = google.drive('v3');
	console.log(data.photos[0]);
	
	fs.readFile(path.join(__dirname, './../../static/client_secret.json'), function processClientSecrets(err, content) {
	  if (err) {
		console.log('Error loading client secret file: ' + err);
		return;
	  }
	  res.send(authorize(JSON.parse(content), createFolder));
	});
	
	let createFolder = (auth) => {
		let fileMetadata = {
			'name': data.important[1],
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
				folderId = file.id;
				addFiles(auth);
				console.log(file.id);
			}
		});
	}

	let addFiles = (auth) => {
		var fileMetadata = {
		  'name': 'photo.jpg',
		  parents: [ folderId ]
		};
		var media = {
		  mimeType: 'image/jpeg',
		  body: fs.createReadStream(data.photos[0])
		};
		service.files.create({
		   auth: auth,
		   resource: fileMetadata,
		   media: media,
		   fields: 'id'
		}, function(err, file) {
			if(err) {
				console.log(err);	
			} else {
				console.log('File Id: ', file.id);
			}
		});
	}

});

module.exports = router;
