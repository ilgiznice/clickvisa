import express from 'express';
import path from 'path';
import fs from 'fs';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import authorize from './auth';
import multer from 'multer';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: false
}));
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
	  cb(null, './my-uploads')
    },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    } 
})

router.route('/drive').post((req, res) => {
	
	let data = req.body;
	let folderId;
	let service = google.drive('v3');

	if(!data.important) {
		console.log(data.name);
		console.log(req.files);
	} else {
		console.log(data);
		fs.readFile(path.join(__dirname, './../../static/client_secret.json'), function processClientSecrets(err, content) {
			if (err) {
				console.log('Error loading client secret file: ' + err);
				return;
			}
			fs.writeFile('./static/localfiles/данные_о_пользователе.json', JSON.stringify(data), (err1) => {
				if(err1) return console.log(err1);
				console.log('done!');
				res.send(authorize(JSON.parse(content), createFolder));
			});
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
		let filesList = [];
		let mimeType = 'image/jpeg';
		fs.readdir('./static/localfiles', (err, files) => {
			files.forEach((file, i) => {
				console.log(file.split('.'));
				console.log(i);
				
				var fileMetadata = {
					'name': file,
					 parents: [ folderId ]
				};
				var media = {
					body: fs.createReadStream('./static/localfiles/' + file)
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
			});
		});
	}
});

module.exports = router;
