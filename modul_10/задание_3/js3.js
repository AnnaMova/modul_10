const chat = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const sendLocationButton = document.getElementById('sendLocationButton');

const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

websocket.onopen = () => {
  console.log('Соединение установлено.');
};

websocket.onmessage = (event) => {
  
};

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    addMessage('user', message);
    websocket.send(message);
    messageInput.value = '';
  }
});

sendLocationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const message = `Гео-локация: ${latitude}, ${longitude}`;
      const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      addMessage('user', message, link); 
      websocket.send(message);
    }, error => {
      console.error('Ошибка при получении гео-локации:', error);
      alert('Не удалось получить гео-локацию.');
    });
  } else {
    alert('Гео-локация не поддерживается браузером.');
  }
});

function addMessage(type, message, link) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${type}-message`);

  if (type === 'user' && message.startsWith('Гео-локация')) {
    messageElement.classList.add('geo-message');
    const geoLocationElement = document.createElement('span');
    geoLocationElement.classList.add('geo-location');
    geoLocationElement.textContent = message;
    if (link) {
      const geoLinkElement = document.createElement('a');
      geoLinkElement.classList.add('geo-link');
      geoLinkElement.href = link;
      geoLinkElement.textContent = 'Открыть на карте';
      messageElement.appendChild(geoLinkElement);
    }
    messageElement.appendChild(geoLocationElement);
  } else {
    messageElement.textContent = message;
  }

  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}