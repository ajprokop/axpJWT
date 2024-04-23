const axios = require("axios");
const functions = require('@google-cloud/functions-framework');

/*
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('getJWT', (req, res) => {
    returnToken = {
        token: null
    }
    
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
        const CCAAS_ACCOUNT = req.body.account;   
        const BASE_URL = req.body.url;
        const CUSTOMER_ID = req.body.id;
        const INTEGRATION = req.body.integration;
        const CUSTOMER_NAME = req.body.name;
        const TOKEN = req.body.token;

        const data = {
          integrationId: INTEGRATION,
          customerId: CUSTOMER_ID,
          customerName: CUSTOMER_NAME
        }

        const CCAAS_CREATE_JWT = `api/digital/chat/v1beta/accounts/${CCAAS_ACCOUNT}/tokens`;

        res.set('Content-Type', 'application/json');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
            'User-Agent': 'Axios 1.1.3'
          }
        axios.post(`${BASE_URL}${CCAAS_CREATE_JWT}`, data, {headers})
        .then(function (response) {
            console.dir(response.data);
            returnToken.token = response.data.jwtToken;
            res.status(200).send(JSON.stringify(returnToken));
        })
        .catch((error) => {
            console.log("error");
            res.status(200).send(JSON.stringify(returnToken));
          })
    }

});   