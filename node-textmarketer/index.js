'use strict';
const axios = require("axios");
const qs = require("qs");
const https = require("https"); 

var apiURL = "https://api.textmarketer.co.uk/gateway/";

//this only uses the non xml return at the moment.

function sendSms(config) {
    return new Promise((resolve, reject) => {
        axios(config).then(function (response) {

            var txtResponse = response.data.split('\r\n');
            if (txtResponse[0] === "SUCCESS") {
                resolve({
                    "status": "ok",
                    "balance": parseInt(txtResponse[1]) || 0
                });
            } else if (txtResponse[0] === "FAILED") {
                reject({
                    "error": txtResponse[1].split("Error: ")[1],
                    "status": "error"
                });
            }
        }).catch(function (error) {
            reject(error);
        });
    });
}

class textmarketer {
    constructor(username, password, options) {

        this.options = options ||
            {
                method: 'POST',
                paramsSerializer: function (params) {
                    return qs.stringify(params, { arrayFormat: 'brackets' });
                },
                baseURL: apiURL,
                url: "?username=" + username + "&password=" + password,
                timeout: 2000,
                withCredentials: false,
                responseType: 'json',
                responseEncoding: 'utf8',
                maxContentLength: 2000,
                validateStatus: function (status) {

                    return status >= 200 && status < 300; // 
                },
                maxRedirects: 0,
                httpsAgent: new https.Agent({ 
                    keepAlive: false,
                    "rejectUnauthorized": false
                })
            };
    }
}

textmarketer.prototype.send = function (params) {
    var config = this.options; 
    config.params = params;
    return sendSms(config);
};

module.exports = textmarketer;