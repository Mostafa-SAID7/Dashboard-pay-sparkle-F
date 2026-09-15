import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let server;

async function getServer() {
  if (!server) {
    const { default: handler } = await import(join(__dirname, '../.output/server/index.mjs'));
    server = handler;
  }
  return server;
}

export default async (req, res) => {
  try {
    const handler = await getServer();
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const response = await handler.fetch(
      new Request(url, {
        method: req.method,
        headers: new Headers(req.headers),
        body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
      })
    );

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.end(await response.text());
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
