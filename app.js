const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const keywordPanel = document.getElementById('keywordPanel');

const botReplies = [
  {
    keywords: ['hello', 'hi', 'hey'],
    reply: 'Hello! I am your chatbot. What can I help you with today?'
  },
  {
    keywords: ['help', 'problem', 'issue'],
    reply: 'Sure — tell me what you need and I will do my best to help.'
  },
  {
    keywords: ['name'],
    reply: 'I am a simple chatbot website built to answer questions and practice a conversation.'
  },
  {
    keywords: ['time', 'date'],
    reply: `Today is ${new Date().toLocaleDateString()} and the current time is ${new Date().toLocaleTimeString()}.`
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    reply: 'Goodbye! Feel free to chat again anytime.'
  }
];

function createMessage(text, sender) {
  const message = document.createElement('div');
  message.classList.add('message', sender);

  const bubble = document.createElement('span');
  bubble.textContent = text;

  message.appendChild(bubble);
  return message;
}

function addMessage(text, sender) {
  const message = createMessage(text, sender);
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendUserMessage(message) {
  if (!message.trim()) return;
  addMessage(message, 'user');
  messageInput.value = '';
  messageInput.focus();
  respondToUser(message);
}

function createKeywordChip(text) {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'keyword-chip';
  chip.textContent = text;
  chip.addEventListener('click', () => sendUserMessage(text));
  return chip;
}

function renderKeywordChips() {
  const keywords = Array.from(
    new Set(botReplies.flatMap((rule) => rule.keywords))
  );
  keywordPanel.innerHTML = '';
  keywords.forEach((keyword) => keywordPanel.appendChild(createKeywordChip(keyword)));
}

function getBotReply(message) {
  const normalized = message.toLowerCase();

  for (const rule of botReplies) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.reply;
    }
  }

  const fallbackReplies = [
    'That sounds interesting. Can you say more?',
    'I am still learning, but I can try to answer questions about this demo.',
    'Could you rephrase that so I can understand better?'
  ];

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

function respondToUser(message) {
  addMessage('Typing...', 'bot');

  setTimeout(() => {
    const botMessage = getBotReply(message);
    const lastBotMessage = chatWindow.querySelector('.message.bot:last-child');

    if (lastBotMessage) {
      lastBotMessage.querySelector('span').textContent = botMessage;
    }
  }, 800);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendUserMessage(messageInput.value);
});

renderKeywordChips();
addMessage('Hi there! I am a chatbot demo. Send me a message to start.', 'bot');
