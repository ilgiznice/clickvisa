import google from 'googleapis';
import googleAuth from 'google-auth-library';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
	process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

export default function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  fs.readFile(TOKEN_PATH, function(err, token) {
	if (err) {
	  getNewToken(oauth2Client, callback);
	} else {
	  oauth2Client.credentials = JSON.parse(token);
	  callback(oauth2Client);
	}
  });
}

function getNewToken(oauth2Client, callback) {  
	var authUrl = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
	rl.close();
	oauth2Client.getToken(code, function(err, token) {
	  if (err) {
		console.log('Error while trying to retrieve access token', err);
		return;
	  }
	  oauth2Client.credentials = token;
	  storeToken(token);
	  callback(oauth2Client);
	});
  });
}

function storeToken(token) {
  try {
	fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
	if (err.code != 'EEXIST') {
	  throw err;
	}
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}
