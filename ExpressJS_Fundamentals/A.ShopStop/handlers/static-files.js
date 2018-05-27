const fs = require('fs');
const url = require('url');
const path = require('path');

function getContentType(url) {
    if (url.endsWith('.css')) {
        return 'text/css';
    } else if (url.endsWith('.ico')) {
        return 'image/x-icon';
    } else if (url.endsWith('.jpg')) {
        return 'image/jpg';
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`));
        res.writeHead(200, {
            'Content-Type': getContentType(req.pathname)
        })

        const read = fs.createReadStream(filePath);
        read.pipe(res);
    } else {
        return true;
    }
}