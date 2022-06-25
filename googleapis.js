// import { googleapis } from 'googleapis';
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = '448429228830-sq3f2i1ur7sr1vhb0r2mtcvnunk10o4j.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = '1//047DwXPe2bffnCgYIARAAGAQSNwF-L9IrAJnlac3zanakWTHyWq3VXLTC7V2Sc0ecg97bbdWZ2gVvUfP55tVX2_UoLIVorvmRxZk';
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});
const filePath = path.join(__dirname, '../../../IMG20220420141800_01.jpg');
// console.log(filePath);
async function upload() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: "nameoffile.png",
                mineType: "image/jpg"
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath),
            }
        });
        console.log(response.data);
    } catch (e) {
        console.log(e.message);
    }
}

// upload();


async function generatePublicUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const { data } = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink'
        });
        console.dir(data);
    } catch (e) {
        console.dir(e)
    }
}

// generatePublicUrl('12De2hnaEPrqlzs0m7I7y-ZmoAOhNSqIw');


// delete file

async function deleteFile(fileId) {
    try {

        const { data, status } = await drive.files.delete({
            fileId
        });
        console.dir('delete result', data, status);
    } catch (e) {
        console.dir('error', e)
    }
}

// deleteFile('12De2hnaEPrqlzs0m7I7y-ZmoAOhNSqIw');
