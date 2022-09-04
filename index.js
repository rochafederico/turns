import fs from 'fs';
import http from 'node:http';
import mime from 'mime';

const host = 'localhost';
const port = 8000;
const requestListener = function (req, res) {
    let url = process.cwd() + req.url;
    if (url === `${process.cwd()}/`) {
        url += 'index.html';
    }
    console.debug(url);

    fs.readFile(url, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        const contentType = mime.getType(url);
        res.setHeader("Content-Type", contentType);
        res.writeHead(200);
        res.end(data);
    });
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});