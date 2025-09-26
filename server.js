import express from 'express';
import fs from 'fs';

const app = express();
app.set('trust proxy', true); // om du kör bakom proxy

app.use(express.static('static'));

app.get('/', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
  const line = `${new Date().toISOString()} ${ip}\n`;
  // skriv synkront för enkelhet. Byt till async i produktion.
  fs.appendFileSync('ips.txt', line);
  res.sendFile(new URL('./static/index.html', import.meta.url));
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
