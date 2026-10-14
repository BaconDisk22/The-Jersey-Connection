'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..', 'website');
const HOST = '127.0.0.1';
const PORT = 8765;
const TYPES = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
const MAX_FILE = 12 * 1024 * 1024;
const dataFile = process.env.JERSEY_NODES_FILE ? path.resolve(process.env.JERSEY_NODES_FILE) : null;
const server = http.createServer((req,res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {res.writeHead(405);return res.end();}
  let pathname;
  try {pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
  if (pathname === '/nodes.json') {
    if (!dataFile) {res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});return res.end('{}');}
    return fs.readFile(dataFile,(err,data)=>{
      if(err){res.writeHead(503,{'Content-Type':'application/json'});return res.end('{"error":"Node snapshot unavailable"}');}
      try{const parsed=JSON.parse(data);if(!parsed || Array.isArray(parsed) || typeof parsed!=='object')throw Error('Expected object');}
      catch{res.writeHead(422);return res.end('Invalid node snapshot');}
      res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(data);
    });
  }
  const rel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const full = path.resolve(ROOT, rel);
  if (!full.startsWith(ROOT + path.sep)) {res.writeHead(403);return res.end();}
  fs.stat(full,(err,stat)=>{
    if(err || !stat.isFile()){res.writeHead(404);return res.end();}
    if(stat.size>MAX_FILE){res.writeHead(413);return res.end();}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(full)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD')return res.end();
    fs.createReadStream(full).pipe(res);
  });
});
server.listen(PORT,HOST,()=>console.log('Jersey map development server: http://'+HOST+':'+PORT+' (empty node data unless JERSEY_NODES_FILE is set)'));
