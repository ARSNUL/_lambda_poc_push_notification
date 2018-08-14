'use strict';

const apn = require('apn');

exports.handler = (event, context, callback) => {
    let options = {
        token: {
            key: __dirname + '/AuthKey_xxxxxxxx.p8',
            keyId: 'xxxxPVX4F2',
            teamId: 'xxxx39PQD2'
        },
        production: false
    };

    const apnProvider = new apn.Provider(options);
    const deviceToken = 'aa84cbaae60c947295bd02fe091d4c7ff076eb55f3878e61fc451e8a53130ad6';
    const notification = new apn.Notification();

    notification.expiry = Math.floor(Date.now() / 1000) + 3600;
    notification.badge = 1;
    notification.sound = 'default';
    notification.alert = 'Testing...';
    notification.topic = '<topic>';

    apnProvider.send(notification, deviceToken)
        .then((result) => {
            console.log(JSON.stringify(result, null, 2));
            apnProvider.client.endpointManager._endpoints.forEach(endpoint => endpoint.destroy());
            callback(null, result);
        })
        .catch(err => {
            console.warn(err);
            callback(err);
        });
};