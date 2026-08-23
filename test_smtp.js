const fs = require('fs');
const nodemailer = require('nodemailer');
const envFile = fs.readFileSync('.env.test.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) {
    let v = m[2].trim();
    if (v.startsWith('\"') || v.startsWith('\'')) v = v.slice(1, -1);
    env[m[1]] = v;
  }
});
console.log('HOST:', env.SMTP_HOST);
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT||'587'),
  secure: env.SMTP_PORT==='465',
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
});
transporter.verify().then(() => console.log('OK')).catch(e => console.log('ERROR:', e.message));
