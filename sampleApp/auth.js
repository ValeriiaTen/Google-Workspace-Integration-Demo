/* The auth.js file handles the Microsoft Login authentication using MSAL. */

const msal = require('@azure/msal-node');

// Define the Azure AD app credentials and configuration
const azureClientId = 'YOUR_AZURE_CLIENT_ID';
const azureAuthority = 'https://login.microsoftonline.com/YOUR_TENANT_ID';

// Define the app's redirect URI for Azure AD authentication callbacks
const redirectUri = 'YOUR_REDIRECT_URI';

// Define the scopes required for accessing Microsoft Graph API
const graphScopes = ['user.read'];

// Create the MSAL application configuration
const msalConfig = {
  auth: {
    clientId: azureClientId,
    authority: azureAuthority,
    redirectUri: redirectUri,
  },
};

// Create an MSAL application instance
const pca = new msal.PublicClientApplication(msalConfig);

async function signIn() {
  try {
    // Define the MSAL login request
    const loginRequest = {
      scopes: graphScopes,
    };

    // Initiate the MSAL login process
    const authResult = await pca.loginPopup(loginRequest);

    console.log('Authentication successful:', authResult);
  } catch (error) {
    console.error('Authentication error:', error);
  }
}

module.exports = {
  signIn,
};
