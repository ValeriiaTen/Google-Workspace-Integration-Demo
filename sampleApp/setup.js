/*The setup.js file handles the Google Workspace JavaScript App setup */

const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const { signIn } = require('./auth');
const fs = require('fs');
const readline = require('readline');

// Replace with the actual OAuth 2.0 client ID and client secret
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URL = 'YOUR_REDIRECT_URL';

// Scopes for accessing Gmail and Google Drive
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/drive.readonly'];

async function setupApp() {
  try {
    // Create a new OAuth2 client
    const oauth2Client = new OAuth2Client({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URL,
    });

    // Generate the consent screen URL
    const authURL = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('Authorize this app by visiting the following URL:', authURL);

    // Ask user to enter the authorization code securely

    /* The readLine module with 'terminal: false' and 'historySize: 0' prevent the code from being stored in the shell history. 
    It's essential to implement proper file permissions and storage mechanisms to protect sensitive data. */
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      historySize: 0,
    });

    rl.question('Enter the authorization code: ', async (code) => {
      rl.close();

      // Exchange the authorization code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Save the credentials to a file
      fs.writeFileSync('credentials.json', JSON.stringify(tokens));
      console.log('Credentials saved to credentials.json');
    });
  } catch (error) {
    console.error('Error setting up the app:', error);
  }
}

setupApp();
signIn();