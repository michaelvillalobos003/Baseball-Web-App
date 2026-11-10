/**
 * San Diego Padres Fan Portal - Application Logic
 * Handles view routing, countdown timer, theme switching, chat, and Phase 3 Gear Locker
 */

// ============================================
// Data Import
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
    "Trevor Hoffman recorded 552 of his 601 career saves wearing a Padres uniform to the iconic sound of 'Hells Bells'.",
    "The Padres were founded in 1969 as an expansion team, making them one of the younger franchises in Major League Baseball.",
    "Dave Winfield was the first player to be elected to the Baseball Hall of Fame as a Padre in 2001.",
    "The Padres' team colors of brown and gold were inspired by the colors of the California flag and the state's golden history.",
    "In 1984, the Padres won their first National League pennant, led by manager Dick Williams.",
    "Petco Park is known for its spacious outfield, which makes it one of the most pitcher-friendly parks in the National League."
  ],
  // Phase 3: Gear Catalog
  gear: [
    {
      id: "gear-001",
      title: "Nike Alpha Huarache Elite 3",
      category: "Cleats",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      description: "Premium baseball cleats with dynamic fit system and responsive cushioning. Designed for explosive starts and quick cuts on the diamond.",
      priceBadge: "$149.99",
      recommendedBy: "Fernando Tatis Jr.",
      initialRating: 4.9,
      ratingCount: 128,
      addedDate: "2024-03-15"
    },
    {
      id: "gear-002",
      title: "Rawlings Heart of the Hide PRO",
      category: "Gloves",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Professional-grade baseball glove with premium leather and custom fit. Perfect for infielders and outfielders alike.",
      priceBadge: "$249.99",
      recommendedBy: "Manny Machado",
      initialRating: 4.8,
      ratingCount: 95,
      addedDate: "2024-02-20"
    },
    {
      id: "gear-003",
      title: "Under Armour Harper 4 RM",
      category: "Cleats",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
      description: "Lightweight cleats with UA Rotational Traction for superior grip. Built for speed and agility on the basepaths.",
      priceBadge: "$129.99",
      recommendedBy: "Fernando Tatis Jr.",
      initialRating: 4.7,
      ratingCount: 89,
      addedDate: "2024-01-10"
    },
    {
      id: "gear-004",
      title: "Nike Padres Authentic Jersey",
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1524253489173-64374451949d?w=400&h=300&fit=crop",
      description: "Official San Diego Padres jersey with authentic team colors and graphics. Show your team pride in style.",
      priceBadge: "$129.99",
      recommendedBy: "Jackson Merrill",
      initialRating: 4.9,
      ratingCount: 203,
      addedDate: "2024-03-01"
    },
    {
      id: "gear-005",
      title: "Franklin CFX Pro Batting Gloves",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Premium batting gloves with enhanced grip and durability. Designed to improve bat control and reduce vibration.",
      priceBadge: "$39.99",
      recommendedBy: "Manny Machado",
      initialRating: 4.6,
      ratingCount: 72,
      addedDate: "2024-02-01"
    },
    {
      id: "gear-006",
      title: "New Era Padres 59FIFTY Cap",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=300&fit=crop",
      description: "Classic fitted baseball cap with official Padres logo. Structured fit with flat brim for a clean, professional look.",
      priceBadge: "$34.99",
      recommendedBy: "Fernando Tatis Jr.",
      initialRating: 4.8,
      ratingCount: 156,
      addedDate: "2024-03-10"
    },
    {
      id: "gear-007",
      title: "Wilson A2K Baseball Glove",
      category: "Gloves",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Elite baseball glove with Pro Stock Select leather and Dual-Welting for durability. Used by pros at all levels.",
      priceBadge: "$299.99",
      recommendedBy: "William Contreras",
      initialRating: 4.9,
      ratingCount: 67,
      addedDate: "2024-02-15"
    },
    {
      id: "gear-008",
      title: "Padres Home Run Jacket",
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
      description: "Premium Padres jacket with team graphics and water-resistant fabric. Perfect for game days and beyond.",
      priceBadge: "$89.99",
      recommendedBy: "Jackson Merrill",
      initialRating: 4.7,
      ratingCount: 42,
      addedDate: "2024-03-20"
    }
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
    "Cleat Drip Recommendations": "I'm more about function than fashion, but I do appreciate a good pair of cleats. Look for something with ankle support - we catchers need that stability.",
    "Petco Park Tips": "At Petco, the ball carries well to right-center. As a catcher, I can tell you the pitchers love the spacious outfield. Work the gaps and use the whole field.",
    "Breakout Stats": "For catchers, look at pitch framing runs and caught stealing percentage. But the most underrated stat? Blocking pitches in the dirt."
  },
  tatis: {
    "Fix My Swing": "Bro, it's all about the swag in your swing! Keep it loose, let those hips rotate, and finish high. And don't forget - confidence is everything!",
    "Cleat Drip Recommendations": "Oh you know I got you! Right now I'm rocking the Nike Alpha Huarache Elite with custom gold and brown accents. They'll turn heads!",
    "Petco Park Tips": "Petco is my house! The left field wall is tall, so don't try to muscle up. Go opposite field, use the alleys.",
    "Breakout Stats": "Stats? I'm more about the vibes! But I'll tell you this - exit velocity and barrel rate matter. If you're squaring up the ball, the numbers will follow."
  },
  machado: {
    "Fix My Swing": "Let's break this down. First, your stance should be balanced. Hands high, elbow up. As the pitch comes, stride forward and keep your weight back.",
    "Cleat Drip Recommendations": "For hitting, you need cleats that give you traction but allow for quick pivoting. I wear the New Balance 3000v5.",
    "Petco Park Tips": "At Petco, the infield plays fast. As a third baseman, I can tell you the ball comes hot off the bat. Stay on your toes.",
    "Breakout Stats": "Look at hard hit percentage and line drive rate. Those tell you if a hitter is really making quality contact."
  },
  merrill: {
    "Fix My Swing": "Data shows that optimal launch angle is between 10-25 degrees for line drives. Work on your attack angle.",
    "Cleat Drip Recommendations": "From a metrics standpoint, lighter cleats can improve your first-step quickness. The Adidas Adizero Afterburner 6 weighs just 9.5 oz.",
    "Petco Park Tips": "Petco Park has a park factor of 98 for runs. The marine layer keeps the ball from carrying as much. Focus on hard contact.",
    "Breakout Stats": "For fantasy, look at xwOBA and xSLG. These metrics remove luck and tell you a player's true talent."
  }
};

const genericResponses = {
  contreras: ["As a catcher, I see everything on the field. Communication is key.", "Pitch framing is an art. Work on presenting the ball low and away.", "Blocking pitches in the dirt wins games."],
  tatis: ["It's all about the energy! Bring that positive vibe.", "My style? It's authentic. Be yourself, play hard.", "I love San Diego! The weather, the fans, the vibe."],
  machado: ["Defense wins championships. At third base, every play matters.", "Hitting is timing and mechanics. Go back to basics.", "Leadership isn't about talking - it's about doing."],
  merrill: ["The numbers tell a story. If you know how to read them.", "Fantasy baseball is won with research.", "Launch angle and exit velocity are the most predictive hitting metrics."]
};

// ============================================
// Global State
// ============================================
let targetCountdownDate = new Date("2027-03-26T20:10:00Z").getTime();
let currentPersona = null;
let gearData = [...backupData.gear];
let filteredGear = [...backupData.gear];
let currentSearch = '';
let currentCategory = 'all';
let currentSort = 'default';
let showingFavorites = false;

// ============================================
// Initialization Functions
// ============================================

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

    animateValue('timerDays', String(days).padStart(2, '0'));
    animateValue('timerHours', String(hours).padStart(2, '0'));
    animateValue('timerMinutes', String(minutes).padStart(2, '0'));
    animateValue('timerSeconds', String(seconds).padStart(2, '0'));
  };

  updateClock();
  setInterval(updateClock, 1000);
}

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

// ============================================
// View Router
// ============================================
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
  
  // Show/hide search bar based on view
  const searchBar = document.getElementById('searchBar');
  if (searchBar) {
    searchBar.classList.toggle('hidden', viewId !== 'gear');
    
    if (viewId === 'gear') {
      // Initialize gear view
      renderGear();
      updateResultsCount();
    }
  }
}

// ============================================
// Persona Selection & Chat Functions
// ============================================
function selectPersona(personaKey) {
  currentPersona = personaKey;
  const persona = personas[personaKey];
  
  const chatSection = document.getElementById('chatSection');
  if (chatSection) {
    chatSection.classList.remove('hidden');
  }
  
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
  
  document.querySelectorAll('.persona-card').forEach(card => {
    card.classList.remove('persona-card-selected', 'gold-glow');
  });
  
  const selectedCard = document.querySelector(`[data-persona="${personaKey}"]`);
  if (selectedCard) {
    selectedCard.classList.add('persona-card-selected', 'gold-glow');
  }
  
  loadPersonaChatHistory(personaKey);
  
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function useQuickTopic(topic) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = topic;
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message || !currentPersona) return;
  
  input.value = '';
  const persona = personas[currentPersona];
  
  displayMessage(message, 'user');
  
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.textContent = `${persona.name} is typing`;
    typingIndicator.classList.remove('hidden');
    
    let dots = '';
    const typingInterval = setInterval(() => {
      dots += '.';
      if (dots.length > 3) dots = '';
      typingIndicator.textContent = `${persona.name} is typing${dots}`;
    }, 300);
    
    setTimeout(() => {
      clearInterval(typingInterval);
      typingIndicator.classList.add('hidden');
      
      const response = generatePersonaResponse(currentPersona, message);
      displayMessage(response, 'persona', persona.avatar);
      saveMessageToHistory(currentPersona, message, response);
    }, 1000);
  }
  
  try {
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, persona: currentPersona })
    }).catch(() => {});
  } catch (e) {}
}

function generatePersonaResponse(personaKey, message) {
  const quickTopics = ["Fix My Swing", "Cleat Drip Recommendations", "Petco Park Tips", "Breakout Stats"];
  
  for (const topic of quickTopics) {
    if (message === topic && personaResponses[personaKey] && personaResponses[personaKey][topic]) {
      return personaResponses[personaKey][topic];
    }
  }
  
  for (const topic of quickTopics) {
    if (message.toLowerCase().includes(topic.toLowerCase()) && personaResponses[personaKey] && personaResponses[personaKey][topic]) {
      return personaResponses[personaKey][topic];
    }
  }
  
  const persona = personas[personaKey];
  const generic = genericResponses[personaKey];
  
  if (generic && generic.length > 0) {
    const randomIndex = Math.floor(Math.random() * generic.length);
    return generic[randomIndex];
  }
  
  return `Thanks for your question! As ${persona.name}, ${persona.title}, I'll do my best to help.`;
}

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
// Phase 3: Gear Locker Functions
// ============================================

function renderGear() {
  const gearGrid = document.getElementById('gearGrid');
  const emptyState = document.getElementById('emptyState');
  
  if (!gearGrid) return;
  
  // Filter and sort gear
  applyFiltersAndSort();
  
  if (filteredGear.length === 0) {
    gearGrid.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  
  gearGrid.classList.remove('hidden');
  if (emptyState) emptyState.classList.add('hidden');
  
  // Get user favorites
  const favorites = getFavorites();
  
  // Render gear items
  gearGrid.innerHTML = filteredGear.map((item, index) => {
    const isFavorite = favorites.includes(item.id);
    const rating = getUserRating(item.id);
    const displayRating = rating !== null ? rating : item.initialRating;
    const displayCount = rating !== null ? getRatingCount(item.id) : item.ratingCount;
    
    return `
      <div class="gear-card card animate-fade-in" style="animation-delay: ${index * 0.05}s">
        <div class="gear-image-container relative">
          <img src="${item.image}" alt="${item.title}">
          <div class="price-badge">${item.priceBadge}</div>
          <div class="recommended-badge">Recommended by ${item.recommendedBy.split(' ')[0]}</div>
          <div class="heart-icon ${isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('${item.id}')">
            <svg viewBox="0 0 24 24" fill="${isFavorite ? '#2F241D' : 'none'}" stroke="#FFC425" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
        <div class="p-4">
          <span class="gear-category">${item.category}</span>
          <h3 class="gear-title">${item.title}</h3>
          <p class="gear-description">${item.description}</p>
          <div class="star-rating" data-gear-id="${item.id}">
            ${generateStarHTML(item.id, displayRating)}
            <span class="rating-count">(${displayCount})</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners for star ratings
  addStarRatingListeners();
  updateResultsCount();
}

function generateStarHTML(gearId, rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let html = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    html += `<svg class="filled" viewBox="0 0 24 24" fill="#FFC425" stroke="#FFC425"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  }
  
  // Half star (if applicable)
  if (hasHalfStar) {
    html += `<svg class="filled" viewBox="0 0 24 24" fill="#FFC425" stroke="#FFC425"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    html += `<svg viewBox="0 0 24 24" fill="none" stroke="#FFC425" stroke-width="2"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  }
  
  return html;
}

function addStarRatingListeners() {
  document.querySelectorAll('.star-rating').forEach(ratingEl => {
    const gearId = ratingEl.dataset.gearId;
    const stars = ratingEl.querySelectorAll('svg');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        // Check if user is logged in
        const isLoggedIn = checkIfLoggedIn();
        
        if (!isLoggedIn) {
          showGuestModal();
          return;
        }
        
        // Rate the gear
        rateGear(gearId, index + 1);
        
        // Update the stars visually
        updateStarRating(gearId, index + 1);
      });
      
      star.addEventListener('mouseenter', () => {
        highlightStars(stars, index);
      });
      
      star.addEventListener('mouseleave', () => {
        const currentRating = getUserRating(gearId);
        const displayRating = currentRating !== null ? currentRating : getGearById(gearId).initialRating;
        resetStars(stars, displayRating);
      });
    });
  });
}

function highlightStars(stars, hoverIndex) {
  stars.forEach((star, index) => {
    if (index <= hoverIndex) {
      star.classList.add('filled');
      star.setAttribute('fill', '#FFC425');
    } else {
      star.classList.remove('filled');
      star.setAttribute('fill', 'none');
    }
  });
}

function resetStars(stars, rating) {
  const fullStars = Math.floor(rating);
  
  stars.forEach((star, index) => {
    if (index < fullStars) {
      star.classList.add('filled');
      star.setAttribute('fill', '#FFC425');
    } else {
      star.classList.remove('filled');
      star.setAttribute('fill', 'none');
    }
  });
}

function updateStarRating(gearId, rating) {
  const stars = document.querySelectorAll(`[data-gear-id="${gearId}"] svg`);
  const ratingCountEl = document.querySelector(`[data-gear-id="${gearId}"] .rating-count`);
  
  // Update stars
  resetStars(stars, rating);
  
  // Update count
  const count = getRatingCount(gearId);
  if (ratingCountEl) {
    ratingCountEl.textContent = `(${count})`;
  }
}

function rateGear(gearId, rating) {
  // Get current ratings from localStorage
  let gearRatings = JSON.parse(localStorage.getItem('gearRatings')) || {};
  
  // If this gear doesn't have ratings yet, initialize it
  if (!gearRatings[gearId]) {
    gearRatings[gearId] = {
      ratings: [],
      total: 0,
      count: 0
    };
  }
  
  // Add the new rating
  gearRatings[gearId].ratings.push(rating);
  gearRatings[gearId].total += rating;
  gearRatings[gearId].count = gearRatings[gearId].ratings.length;
  
  // Save back to localStorage
  localStorage.setItem('gearRatings', JSON.stringify(gearRatings));
  
  // Update the gear data with new average
  const gear = getGearById(gearId);
  if (gear) {
    gear.currentRating = gearRatings[gearId].total / gearRatings[gearId].count;
    gear.ratingCount = gearRatings[gearId].count;
  }
}

function getUserRating(gearId) {
  const gearRatings = JSON.parse(localStorage.getItem('gearRatings')) || {};
  if (gearRatings[gearId] && gearRatings[gearId].count > 0) {
    return gearRatings[gearId].total / gearRatings[gearId].count;
  }
  return null;
}

function getRatingCount(gearId) {
  const gearRatings = JSON.parse(localStorage.getItem('gearRatings')) || {};
  if (gearRatings[gearId]) {
    return gearRatings[gearId].count;
  }
  return getGearById(gearId).ratingCount;
}

function getGearById(gearId) {
  return backupData.gear.find(item => item.id === gearId);
}

function toggleFavorite(gearId) {
  // Check if user is logged in
  const isLoggedIn = checkIfLoggedIn();
  
  if (!isLoggedIn) {
    showGuestModal();
    return;
  }
  
  // Get current favorites
  let favorites = getFavorites();
  
  // Toggle the gear ID
  const index = favorites.indexOf(gearId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(gearId);
  }
  
  // Save back to localStorage
  saveFavorites(favorites);
  
  // Update UI
  updateFavoriteIcons();
  
  // Re-render gear if showing favorites
  if (showingFavorites) {
    renderGear();
  }
  
  // Trigger animation
  const heartIcon = document.querySelector(`.heart-icon[data-gear-id="${gearId}"]`);
  if (heartIcon) {
    heartIcon.classList.add('pulse');
    setTimeout(() => {
      heartIcon.classList.remove('pulse');
    }, 300);
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoriteIcons() {
  const favorites = getFavorites();
  document.querySelectorAll('.heart-icon').forEach(icon => {
    const gearId = icon.getAttribute('data-gear-id');
    if (favorites.includes(gearId)) {
      icon.classList.add('favorited');
      icon.querySelector('svg').setAttribute('fill', '#2F241D');
    } else {
      icon.classList.remove('favorited');
      icon.querySelector('svg').setAttribute('fill', 'none');
    }
  });
}

function checkIfLoggedIn() {
  // For now, always return false to test the guest modal
  // In production, check if user is actually logged in
  return false;
}

function showGuestModal() {
  const modal = document.getElementById('guestModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeGuestModal() {
  const modal = document.getElementById('guestModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// ============================================
// Search, Filter & Sort Functions
// ============================================

function applyFiltersAndSort() {
  // Start with full gear data
  filteredGear = [...backupData.gear];
  
  // Apply search filter
  if (currentSearch) {
    const searchLower = currentSearch.toLowerCase();
    filteredGear = filteredGear.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const categoryMatch = item.category.toLowerCase().includes(searchLower);
      const descMatch = item.description.toLowerCase().includes(searchLower);
      const recommendedMatch = item.recommendedBy.toLowerCase().includes(searchLower);
      return titleMatch || categoryMatch || descMatch || recommendedMatch;
    });
  }
  
  // Apply category filter
  if (currentCategory !== 'all') {
    filteredGear = filteredGear.filter(item => item.category === currentCategory);
  }
  
  // Apply favorites filter
  if (showingFavorites) {
    const favorites = getFavorites();
    filteredGear = filteredGear.filter(item => favorites.includes(item.id));
  }
  
  // Apply sorting
  sortGear();
}

function filterByCategory(category) {
  currentCategory = category;
  
  // Update category pills
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.remove('active');
    if (pill.textContent.toLowerCase() === category.toLowerCase() || 
        (category === 'all' && pill.textContent === 'All')) {
      pill.classList.add('active');
    }
  });
  
  applyFiltersAndSort();
  renderGear();
}

function sortGear() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    currentSort = sortSelect.value;
  }
  
  switch (currentSort) {
    case 'rating':
      filteredGear.sort((a, b) => {
        const aRating = getUserRating(a.id) !== null ? getUserRating(a.id) : a.initialRating;
        const bRating = getUserRating(b.id) !== null ? getUserRating(b.id) : b.initialRating;
        return bRating - aRating;
      });
      break;
    case 'newest':
      filteredGear.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
      break;
    case 'alpha':
      filteredGear.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      // Default order (by ID)
      filteredGear.sort((a, b) => a.id.localeCompare(b.id));
  }
}

function updateResultsCount() {
  const resultsCount = document.getElementById('resultsCount');
  if (resultsCount) {
    const count = filteredGear.length;
    const text = count === 1 ? `${count} item found` : `${count} items found`;
    resultsCount.textContent = text;
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    currentSearch = '';
    applyFiltersAndSort();
    renderGear();
  }
}

function toggleFavoritesView() {
  showingFavorites = !showingFavorites;
  const favoritesBtn = document.querySelector('.btn-secondary');
  
  if (showingFavorites) {
    if (favoritesBtn) {
      favoritesBtn.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><span>Show All</span>';
    }
  } else {
    if (favoritesBtn) {
      favoritesBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><span>My Saved Drip</span>';
    }
  }
  
  applyFiltersAndSort();
  renderGear();
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  const nextFactBtn = document.getElementById('nextFactBtn');
  const chatInput = document.getElementById('chatInput');
  const searchInput = document.getElementById('searchInput');
  
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
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      applyFiltersAndSort();
      renderGear();
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
  
  // Initialize gear data
  gearData = [...backupData.gear];
  filteredGear = [...backupData.gear];
});
