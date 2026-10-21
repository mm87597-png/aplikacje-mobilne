navigator.serviceWorker.register('./service-worker.js')
const permissionInfo = document.querySelector('#permission');

function updatePermissionInfo() {
  permissionInfo.textContent =
    'Notification' in window
      ? Notification.permission
      : 'brak obsługi w tej przeglądarce';
}

updatePermissionInfo();

document.querySelector('#enable').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('Ta przeglądarka nie obsługuje powiadomień.');
    return;
  }

  const permission = await Notification.requestPermission();
  console.log('Uprawnienie:', permission);
  updatePermissionInfo();
});

document.querySelector('#local').addEventListener('click', () => {
  if (Notification.permission !== 'granted') {
    alert('Najpierw włącz powiadomienia.');
    return;
  }

  try {
    const notification = new Notification('Powiadomienie ze strony', {
      body: 'To powiadomienie utworzyła otwarta strona.',
      icon: 'android.png',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    alert('Ta przeglądarka nie obsługuje powiadomienia ze strony: ' + error.message);
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .catch((error) => console.error('Błąd service workera:', error));
}

document.querySelector('#sw').addEventListener('click', async () => {
  if (Notification.permission !== 'granted') {
    alert('Najpierw włącz powiadomienia.');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification('Powiadomienie z service workera', {
    body: 'Kliknij, aby wrócić do aplikacji.',
    icon: 'android.png',
    data: { url: './' },
  });
});

document
  .querySelector('#notification-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();

    if (!title) {
      alert('Wpisz tytuł powiadomienia.');
      return;
    }

    if (Notification.permission !== 'granted') {
      alert('Najpierw włącz powiadomienia.');
      return;
    }

    const body = document.querySelector('#body').value;
    const icon = document.querySelector('#icon').value;
    const registration = await navigator.serviceWorker.ready;

    await registration.showNotification(title, {
      body,
      icon,
      data: { url: './' },
    });
  });

const VAPID_PUBLIC_KEY = 'BOkJT_aXysLq7Z-hitLrmdomcOIS7REsqu98xD86NCLvE313nTZzUlGrsEZjTVOfRErQjRsfmxNJpqlKMjgR0lc';
const subscriptionField = document.querySelector('#subscription');

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

async function subscribePush() {
  if (!('PushManager' in window)) {
    alert('Ta przeglądarka nie obsługuje Web Push.');
    return;
  }

  if (Notification.permission !== 'granted') {
    alert('Najpierw kliknij „Włącz powiadomienia”.');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    subscriptionField.value = JSON.stringify(subscription, null, 2);
  } catch (error) {
    alert('Nie udało się zasubskrybować: ' + error.message);
  }
}

async function unsubscribePush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();
  }

  subscriptionField.value = '';
}

document.querySelector('#subscribe').addEventListener('click', subscribePush);
document.querySelector('#unsubscribe').addEventListener('click', unsubscribePush);

document.querySelector('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(subscriptionField.value);
    alert('Skopiowano subskrypcję.');
  } catch {
    subscriptionField.select();
    alert('Tekst jest zaznaczony. Skopiuj go klawiszami Ctrl+C.');
  }
});