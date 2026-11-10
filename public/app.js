/**
 * San Diego Padres Fan Portal - Application Logic
 * Handles view routing, countdown timer, theme switching, and chat functionality
 */

// ============================================
// Data Import (would be imported from padres_backup.json in production)
// ============================================
const backupData = {
  roster: [
    {
      id: 665487,
      name: "Fernando Tatis Jr.",
      position: "Right Fielder",
      positionAbbr: "RF",
      jerseyNumber: "23",
      headshotUrl: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/665487/headshot/67/current",
      stats: { season: { hr: 25, avg: ".276" } }
    },
    {
      id: 592518,
      name: "Manny Machado",
      position: "Third Baseman",
      positionAbbr: "3B",
      jerseyNumber: "13",
      headshotUrl: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/592518/headshot/67/current",
      stats: { season: { hr: 29, avg: ".275" } }
    },
    {
      id: 701538,
      name: "Jackson Merrill",
      position: "Center Fielder",
      positionAbbr: "CF",
      jerseyNumber: "3",
      headshotUrl: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/701538/headshot/67/current",
      stats: { season: { hr: 24, avg: ".292" } }
    },
    {
      id: 669221,
      name: "William Contreras",
      position: "Catcher",
      positionAbbr: "C",
      jerseyNumber: "24",
      headshotUrl: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/669221/headshot/67/current",
      stats: { season: { hr: 23, avg: ".281" } }
    }
  ],
  triviaFacts: [
    "Tony Gwynn won 8 National League batting titles during his legendary 20-year career with the San Diego Padres.",
    "Petco Park opened its doors in downtown San Diego in 2004, featuring the iconic Western Metal Supply Co. building.",
    "Trevor Hoffman recorded 552 of his 601 career saves wearing a Padres uniform to the iconic sound of 'Hells Bells'."
  ]
};

// ============================================
// Persona Data
// ============================================
const personas = {
  contreras: {
    name: "William Contreras",
    title: "Catcher & Playmaker",
    avatar: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/669221/headshot/67/current",
    position: "C",
    specialties: ["Pitch framing", "Game calling", "Plate discipline"],
    welcome: "Hey there! I'm William Contreras. Ask me anything about catching, pitch selection, or how to read a pitcher's mind. I've got your back behind the plate!"
  },
  tatis: {
    name: "Fernando Tatis Jr.",
    title: "Drip & Style Icon",
    avatar: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/665487/headshot/67/current",
    position: "RF",
    specialties: ["Custom cleats", "Batting gloves", "Game-day drip"],
    welcome: "What's good, fam? Tatis in the house! Want the hottest cleats? Need swag advice? I'm your guy. Let's talk style and baseball!"
  },
  machado: {
    name: "Manny Machado",
    title: "Hitting & Defense Specialist",
    avatar: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/592518/headshot/67/current",
    position: "3B",
    specialties: ["Swing mechanics", "Third base defense", "Leadership"],
    welcome: "Manny Machado here. Whether you need to fix your swing, improve your defense at the hot corner, or lead your team, I've got the experience to help you level up."
  },
  merrill: {
    name: "Jackson Merrill",
    title: "Stats & Fantasy Scout",
    avatar: "https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/701538/headshot/67/current",
    position: "CF",
    specialties: ["Breakout metrics", "Launch angles", "Outfield play"],
    welcome: "Jackson Merrill, stats nerd and fantasy baseball enthusiast! Ask me about launch angles, breakout players, or how to dominate your fantasy league. The numbers don't lie!"
  }
};

// ============================================
// Persona Response Generators
// ============================================
const personaResponses = {
  contreras: {
    "Fix My Swing": "For a catcher's perspective on hitting: focus on your load and timing. We see every pitch, so trust me - patience at the plate is key. Work on keeping your hands back and driving through the ball.",
    "Cleat Drip Recommendations": "I'm more about function than fashion, but I do appreciate a good pair of cleats. Look for something with ankle support - we catchers need that stability. Nike Alpha Huarache or Under Armour Harper are solid choices.",
    "Petco Park Tips": "At Petco, the ball carries well to right-center. As a catcher, I can tell you the pitchers love the spacious outfield. Work the gaps and use the whole field. And always respect the park's dimensions!",
    "Breakout Stats": "For catchers, look at pitch framing runs and caught stealing percentage. But the most underrated stat? Blocking pitches in the dirt. That's how you earn a pitcher's trust and win games."
  },
  tatis: {
    "Fix My Swing": "Bro, it's all about the swag in your swing! Keep it loose, let those hips rotate, and finish high. And don't forget - confidence is everything. Step in that box like you own it!",
    "Cleat Drip Recommendations": "Oh you know I got you! Right now I'm rocking the Nike Alpha Huarache Elite with custom gold and brown accents. But if you want real heat, check out my signature line dropping soon. Trust me, they'll turn heads!",
    "Petco Park Tips": "Petco is my house! The left field wall is tall, so don't try to muscle up. Go opposite field, use the alleys. And when you're on defense, respect the gaps - that ball can carry!",
    "Breakout Stats": "Stats? I'm more about the vibes! But I'll tell you this - exit velocity and barrel rate matter. If you're squaring up the ball, the numbers will follow. Just stay locked in!"
  },
  machado: {
    "Fix My Swing": "Let's break this down. First, your stance should be balanced. Hands high, elbow up. As the pitch comes, stride forward and keep your weight back. Then - BOOM - explode through the ball. Stay on top, don't uppercut. And always, always keep your head still.",
    "Cleat Drip Recommendations": "For hitting, you need cleats that give you traction but allow for quick pivoting. I wear the New Balance 3000v5 - great support, lightweight. And make sure they're broken in before game day.",
    "Petco Park Tips": "At Petco, the infield plays fast. As a third baseman, I can tell you the ball comes hot off the bat. Stay on your toes, anticipate the hop. And at the plate, the background can be tough - focus on the pitcher's release point.",
    "Breakout Stats": "Look at hard hit percentage and line drive rate. Those tell you if a hitter is really making quality contact. And for defense at third, range factor and defensive runs saved separate the good from the great."
  },
  merrill: {
    "Fix My Swing": "Data shows that optimal launch angle is between 10-25 degrees for line drives. Work on your attack angle - you want to match the plane of the pitch. And don't forget: the best hitters have a plan. Know the count, know the pitcher.",
    "Cleat Drip Recommendations": "From a metrics standpoint, lighter cleats can improve your first-step quickness. The Adidas Adizero Afterburner 6 weighs just 9.5 oz. But comfort is key - you don't want to sacrifice stability for weight.",
    "Petco Park Tips": "Petco Park has a park factor of 98 for runs, slightly below average. The marine layer keeps the ball from carrying as much. So focus on hard contact rather than trying to hit it out. The gaps are your friend here.",
    "Breakout Stats": "For fantasy, look at xwOBA (expected weighted on-base average) and xSLG (expected slugging). These metrics remove luck and tell you a player's true talent. Also, pay attention to BABIP - if it's too high or low, regression is coming."
  }
};

// Generic responses for custom questions
const genericResponses = {
  contreras: [
    "As a catcher, I see everything on the field. Communication is key - make sure you're on the same page with your pitcher.",
    "Pitch framing is an art. Work on presenting the ball low and away - that's where you get the most calls.",
    "Blocking pitches in the dirt wins games. It's not glamorous, but it saves runs and keeps your pitcher confident.",
    "Game calling requires knowing your pitcher's strengths and the hitter's weaknesses. Study the scouting reports!"
  ],
  tatis: [
    "It's all about the energy! Bring that positive vibe to the park every day. Baseball is a game - have fun with it!",
    "My style? It's authentic. Be yourself, play hard, and the fans will love you. That's what Padres baseball is about.",
    "I love San Diego! The weather, the fans, the vibe. It's the perfect place to play baseball.",
    "Confidence is everything. When you step on that field, believe you're the best. Because you are!"
  ],
  machado: [
    "Defense wins championships. At third base, every play matters. Stay ready, stay focused.",
    "Hitting is timing and mechanics. When you're struggling, go back to basics. Check your grip, your stance, your swing path.",
    "Leadership isn't about talking - it's about doing. Show up every day, work hard, and your teammates will follow.",
    "I take pride in my defense. The hot corner is where plays are made. Be ready for anything!"
  ],
  merrill: [
    "The numbers tell a story. If you know how to read them, you can find hidden value in any player.",
    "Fantasy baseball is won with research. Look at the matchups, the park factors, the recent trends.",
    "Launch angle and exit velocity are the most predictive hitting metrics. But don't forget about plate discipline!",
    "Outfield play is about reads and routes. The best outfielders make it look effortless because they take the right path."
  ]
};

// ============================================
// Global State
// ============================================
let targetCountdownDate = new Date("2027-03-26T20:10:00Z").getTime();
let currentPersona = null;

// ============================================
// Initialization Functions
// ============================================

/**
 * Initialize floating particles background
 */
function initParticles() {
  const particleBg = document.getElementById('particleBg');
  if (!particleBg) return;
  
  const particleCount = 25;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = `${Math.random() * 15 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100 + 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.opacity = Math.random() * 0.4 + 0.2;
    particleBg.appendChild(particle);
  }
}

/**
 * Initialize theme settings
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!themeToggleBtn || !themeIcon) return;
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.textContent = '🌙';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  });
}

/**
 * Start the countdown timer
 */
function startCountdown() {
  const updateClock = () => {
    const now = new Date().getTime();
    const diff = targetCountdownDate - now;

    if (diff <= 0) {
      const countdownTitle = document.getElementById('countdownTitle');
      if (countdownTitle) {
        countdownTitle.textContent = "Game Time / Season Active!";
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Animate number changes
    animateValue('timerDays', String(days).padStart(2, '0'));
    animateValue('timerHours', String(hours).padStart(2, '0'));
    animateValue('timerMinutes', String(minutes).padStart(2, '0'));
    animateValue('timerSeconds', String(seconds).padStart(2, '0'));
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * Animate value changes with smooth transition
 */
function animateValue(elementId, newValue) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.style.transform = 'translateY(-10px)';
  element.style.opacity = '0.5';
  element.style.transition = 'all 0.3s ease';
  
  setTimeout(() => {
    element.textContent = newValue;
    element.style.transform = 'translateY(0)';
    element.style.opacity = '1';
  }, 150);
}

/**
 * Render trivia fact
 */
function renderTrivia() {
  const facts = backupData.triviaFacts;
  const randomIndex = Math.floor(Math.random() * facts.length);
  const factElement = document.getElementById('funFactText');
  
  if (!factElement) return;
  
  factElement.style.opacity = '0';
  factElement.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    factElement.textContent = `"${facts[randomIndex]}"`;
    factElement.style.opacity = '1';
    factElement.style.transform = 'translateY(0)';
    factElement.style.transition = 'all 0.5s ease';
  }, 200);
}

/**
 * Render featured roster cards
 */
function renderHeroRoster(players) {
  const grid = document.getElementById('heroRosterGrid');
  if (!grid) return;
  
  grid.innerHTML = players.map((p, index) => `
    <div class="tilt-card bg-slate-50/80 dark:bg-padresDarkBg/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 dark:border-padresGold/20 flex flex-col items-center text-center animate-fade-in shimmer-effect" style="animation-delay: ${index * 0.1}s">
      <div class="relative mb-2">
        <img src="${p.headshotUrl}" alt="${p.name}" class="w-16 h-16 rounded-full border-2 border-padresGold mb-2 object-cover">
        <div class="absolute inset-0 bg-gradient-to-br from-padresGold/30 to-transparent rounded-full animate-spin-slow"></div>
      </div>
      <h4 class="font-bold text-sm text-padresGold" style="font-family: 'Bebas Neue', sans-serif;">${p.name}</h4>
      <span class="text-xs text-padresGold font-semibold">#${p.jerseyNumber} | ${p.positionAbbr}</span>
      <span class="text-[11px] text-slate-400 mt-1">AVG: ${p.stats.season.avg} | HR: ${p.stats.season.hr}</span>
    </div>
  `).join('');
}

/**
 * Load chat history from localStorage
 */
function loadChatHistory() {
  // Chat history is loaded per-persona when selected
}

// ============================================
// View Router
// ============================================

/**
 * Switch between views
 * @param {string} viewId - The view to switch to
 */
function switchView(viewId) {
  const views = ['dashboard', 'clubhouse', 'gear', 'lineup', 'compare'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.classList.toggle('hidden', v !== viewId);
  });
  
  // Hide chat section when leaving clubhouse
  if (viewId !== 'clubhouse') {
    const chatSection = document.getElementById('chatSection');
    if (chatSection) {
      chatSection.classList.add('hidden');
    }
  }
}

// ============================================
// Persona Selection & Chat Functions
// ============================================

/**
 * Select a persona for chatting
 * @param {string} personaKey - The persona identifier
 */
function selectPersona(personaKey) {
  currentPersona = personaKey;
  const persona = personas[personaKey];
  
  // Show chat section
  const chatSection = document.getElementById('chatSection');
  if (chatSection) {
    chatSection.classList.remove('hidden');
  }
  
  // Update UI with animation
  const avatar = document.getElementById('activePersonaAvatar');
  const name = document.getElementById('activePersonaName');
  const title = document.getElementById('activePersonaTitle');
  
  if (avatar && name && title) {
    avatar.style.transform = 'scale(0)';
    name.style.transform = 'translateX(-20px)';
    title.style.transform = 'translateX(-20px)';
    avatar.style.opacity = '0';
    name.style.opacity = '0';
    title.style.opacity = '0';
    
    setTimeout(() => {
      avatar.src = persona.avatar;
      name.textContent = persona.name;
      title.textContent = persona.title;
      avatar.style.transform = 'scale(1)';
      name.style.transform = 'translateX(0)';
      title.style.transform = 'translateX(0)';
      avatar.style.opacity = '1';
      name.style.opacity = '1';
      title.style.opacity = '1';
    }, 200);
  }
  
  // Update persona cards - remove previous selection
  document.querySelectorAll('.persona-card').forEach(card => {
    card.classList.remove('persona-card-selected', 'gold-glow');
  });
  
  // Highlight selected card
  const selectedCard = document.querySelector(`[data-persona="${personaKey}"]`);
  if (selectedCard) {
    selectedCard.classList.add('persona-card-selected', 'gold-glow');
  }
  
  // Load chat history for this persona
  loadPersonaChatHistory(personaKey);
  
  // Scroll to chat section
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Use a quick topic for chatting
 * @param {string} topic - The pre-defined topic
 */
function useQuickTopic(topic) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = topic;
    sendMessage();
  }
}

/**
 * Send a message in the chat
 */
function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  
  const message = input.value.trim();
  
  if (!message || !currentPersona) return;
  
  input.value = '';
  const persona = personas[currentPersona];
  
  // Display user message with animation
  displayMessage(message, 'user');
  
  // Show typing indicator with animation
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.textContent = `${persona.name} is typing`;
    typingIndicator.classList.remove('hidden');
    
    // Animate typing dots
    let dots = '';
    const typingInterval = setInterval(() => {
      dots += '.';
      if (dots.length > 3) dots = '';
      typingIndicator.textContent = `${persona.name} is typing${dots}`;
    }, 300);
    
    setTimeout(() => {
      clearInterval(typingInterval);
      typingIndicator.classList.add('hidden');
      
      // Generate response
      const response = generatePersonaResponse(currentPersona, message);
      displayMessage(response, 'persona', persona.avatar);
      
      // Save to history
      saveMessageToHistory(currentPersona, message, response);
    }, 1000);
  }
  
  // Call backend API if available
  try {
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, persona: currentPersona })
    }).catch(() => {
      // Fallback to mock responses (already handled above)
    });
  } catch (e) {
    // Backend not available, using mock responses
  }
}

/**
 * Generate a response based on persona and message
 * @param {string} personaKey - The persona identifier
 * @param {string} message - The user message
 * @returns {string} The generated response
 */
function generatePersonaResponse(personaKey, message) {
  const quickTopics = [
    "Fix My Swing",
    "Cleat Drip Recommendations", 
    "Petco Park Tips",
    "Breakout Stats"
  ];
  
  // Check for exact matches
  for (const topic of quickTopics) {
    if (message === topic && personaResponses[personaKey] && personaResponses[personaKey][topic]) {
      return personaResponses[personaKey][topic];
    }
  }
  
  // Check for partial matches
  for (const topic of quickTopics) {
    if (message.toLowerCase().includes(topic.toLowerCase()) && personaResponses[personaKey] && personaResponses[personaKey][topic]) {
      return personaResponses[personaKey][topic];
    }
  }
  
  // Generate a generic response based on persona
  const persona = personas[personaKey];
  const generic = genericResponses[personaKey];
  
  if (generic && generic.length > 0) {
    const randomIndex = Math.floor(Math.random() * generic.length);
    return generic[randomIndex];
  }
  
  return `Thanks for your question! As ${persona.name}, ${persona.title}, I'll do my best to help.`;
}

/**
 * Display a message in the chat
 * @param {string} text - The message text
 * @param {string} type - 'user' or 'persona'
 * @param {string} avatar - Avatar URL for persona messages
 */
function displayMessage(text, type, avatar = null) {
  const chatDisplay = document.getElementById('chatDisplay');
  if (!chatDisplay) return;
  
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (type === 'user' && welcomeMessage) {
    welcomeMessage.classList.add('hidden');
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('flex', 'items-start', 'space-x-3', 'opacity-0', 'translate-y-2');
  messageDiv.style.transition = 'all 0.4s ease';
  
  setTimeout(() => {
    messageDiv.classList.remove('opacity-0', 'translate-y-2');
    messageDiv.classList.add('opacity-100', 'translate-y-0');
  }, 10);
  
  if (type === 'user') {
    messageDiv.classList.add('justify-end', 'flex-row-reverse');
    messageDiv.innerHTML = `<div class="max-w-[80%] rounded-2xl px-4 py-2 chat-bubble-user text-slate-900 shadow-lg"><p>${text}</p></div>`;
  } else {
    messageDiv.innerHTML = `
      <img src="${avatar}" alt="Persona" class="w-8 h-8 rounded-full border-2 border-padresGold object-cover">
      <div class="max-w-[80%] rounded-2xl px-4 py-2 chat-bubble-persona text-slate-100 shadow-lg"><p>${text}</p></div>
    `;
  }
  
  chatDisplay.appendChild(messageDiv);
  
  setTimeout(() => {
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }, 200);
}

/**
 * Save message to localStorage
 * @param {string} personaKey - The persona identifier
 * @param {string} userMessage - User's message
 * @param {string} personaResponse - Persona's response
 */
function saveMessageToHistory(personaKey, userMessage, personaResponse) {
  let chatHistory = JSON.parse(localStorage.getItem('clubhouseChatHistory')) || {};
  
  if (!chatHistory[personaKey]) {
    chatHistory[personaKey] = [];
  }
  
  chatHistory[personaKey].push({
    user: userMessage,
    persona: personaResponse,
    timestamp: new Date().toISOString()
  });
  
  localStorage.setItem('clubhouseChatHistory', JSON.stringify(chatHistory));
}

/**
 * Load chat history for a specific persona
 * @param {string} personaKey - The persona identifier
 */
function loadPersonaChatHistory(personaKey) {
  const chatDisplay = document.getElementById('chatDisplay');
  if (!chatDisplay) return;
  
  const chatHistory = JSON.parse(localStorage.getItem('clubhouseChatHistory')) || {};
  const persona = personas[personaKey];
  
  chatDisplay.innerHTML = '';
  
  if (chatHistory[personaKey] && chatHistory[personaKey].length > 0) {
    chatHistory[personaKey].forEach(entry => {
      displayMessage(entry.user, 'user');
      displayMessage(entry.persona, 'persona', persona.avatar);
    });
  } else {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.classList.add('text-center', 'text-slate-400', 'dark:text-slate-500', 'text-sm', 'py-4', 'welcome-message');
    welcomeDiv.textContent = persona.welcome;
    chatDisplay.appendChild(welcomeDiv);
  }
}

/**
 * Clear the current chat
 */
function clearChat() {
  if (!currentPersona) return;
  
  const chatDisplay = document.getElementById('chatDisplay');
  if (!chatDisplay) return;
  
  const persona = personas[currentPersona];
  
  chatDisplay.innerHTML = '';
  
  let chatHistory = JSON.parse(localStorage.getItem('clubhouseChatHistory')) || {};
  if (chatHistory[currentPersona]) {
    delete chatHistory[currentPersona];
    localStorage.setItem('clubhouseChatHistory', JSON.stringify(chatHistory));
  }
  
  const welcomeDiv = document.createElement('div');
  welcomeDiv.classList.add('text-center', 'text-slate-400', 'dark:text-slate-500', 'text-sm', 'py-4', 'welcome-message');
  welcomeDiv.textContent = persona.welcome;
  chatDisplay.appendChild(welcomeDiv);
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  const nextFactBtn = document.getElementById('nextFactBtn');
  const chatInput = document.getElementById('chatInput');
  
  if (nextFactBtn) {
    nextFactBtn.addEventListener('click', renderTrivia);
  }
  
  if (chatInput) {
    chatInput.addEventListener('focus', () => {
      const typingIndicator = document.getElementById('typingIndicator');
      if (typingIndicator) {
        typingIndicator.classList.add('hidden');
      }
    });
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  // Add hover effects
  document.querySelectorAll('.persona-card, .btn-gold, .countdown-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-3px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTheme();
  renderTrivia();
  renderHeroRoster(backupData.roster);
  startCountdown();
  setupEventListeners();
  loadChatHistory();
});
