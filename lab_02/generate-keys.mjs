import { readFileSync } from 'node:fs';
import webpush from 'web-push';

function readJson(file) {
  const text = readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(text);
}

const keys = readJson('vapid-keys.json');
const subscription = readJson('subscription.json');

webpush.setVapidDetails(
  'mailto:mm87597@stud.uws.edu.pl',
  keys.publicKey,
  keys.privateKey
);

const [title = 'Web Push', body = 'Wiadomość wysłana z serwera'] =
  process.argv.slice(2);

try {
  const result = await webpush.sendNotification(
    subscription,
    JSON.stringify({ title, body })
  );

  console.log('Wysłano, status:', result.statusCode);
} catch (error) {
  console.error('Błąd wysyłania:', error.statusCode, error.body || error.message);
}