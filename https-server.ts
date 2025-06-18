import fs from 'fs';
import http from 'http';
import https from 'https';
import { parse } from 'url';
import next from 'next';
import path from 'path';

const port = parseInt(process.env.PORT ?? '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  turbo: true,
  turbopack: true,
});
const handle = app.getRequestHandler();

const certPath = path.resolve(__dirname, 'ssl', 'localhost.pem');
const keyPath = path.resolve(__dirname, 'ssl', 'localhost-key.pem');

app.prepare().then(() => {
  const hasSSL = fs.existsSync(certPath) && fs.existsSync(keyPath);

  if (hasSSL) {
    const httpsOptions = {
      cert: fs.readFileSync(certPath),
      key: fs.readFileSync(keyPath),
    };

    https
      .createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url ?? '', true);
        handle(req, res, parsedUrl);
      })
      .listen(port, () => {
        console.log(`HTTPS ready at https://localhost:${port}`);
      });
  } else {
    http
      .createServer((req, res) => {
        const parsedUrl = parse(req.url ?? '', true);
        handle(req, res, parsedUrl);
      })
      .listen(port, () => {
        console.log(`HTTP running at http://localhost:${port}`);
      });
  }
});
