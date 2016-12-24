import express from 'express';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import authorize from './auth.js';
import multer from 'multer';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: false
}));
let storage =   multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './uploads');
    },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
});
let upload = multer({storage : storage}).array('userPhoto', 2);

router.route('/drive').post((req, res, next) => {
	let data = req.body;
	let folderId;
	let service = google.drive('v3');

	if(!data.important) {
		upload(req, res, (err) => {
			console.log(req.body);
			console.log(req.files);
			//if(err) console.log(err)
			res.end('yeaaah');
		});
			/*fs.readFile(req.body.photos[0], (err, data) => {
			let newPath = __dirname + '/static/localfiles/file.jpg';
			fs.writeFile(newPath, data, (err) => {
				console.log(err);
			})
			console.log(err);
		});*/
	} else {
		fs.readFile(path.join(__dirname, './../../static/client_secret.json'), function processClientSecrets(err, content) {
		  if (err) {
			console.log('Error loading client secret file: ' + err);
			return;
		  }
		  res.send(authorize(JSON.parse(content), createFolder));
		});
	}
	
	let createFolder = (auth) => {
		let fileMetadata = {
			'name': data.important[1],
			'mimeType': 'application/vnd.google-apps.folder'
		};

		service.files.create({
			auth: auth,
			resource: fileMetadata,
			field: 'id'
		}, (err, folder) => {
			if(err) {
				console.log(err);
			} else {
				folderId = folder.id;
				addFiles(auth);
				console.log(folder.id);
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
			body: fs.createReadStream(__dirname + '/1.jpg')
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
