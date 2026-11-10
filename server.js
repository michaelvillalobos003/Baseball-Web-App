/**
 * San Diego Padres Fan Portal - Node.js Express Server
 * Serves static files and provides API endpoints for chat functionality
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware
// ============================================

// Enable CORS for development
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ============================================
// Static Files
// ============================================

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// API Routes
// ============================================

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'Padres Fan Portal API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/data
 * Serve backup data for client-side use
 */
app.get('/api/data', (req, res) => {
  try {
    const data = require('./public/padres_backup.json');
    res.json(data);
  } catch (error) {
    console.error('Error loading backup data:', error);
    res.status(500).json({ error: 'Failed to load backup data' });
  }
});

/**
 * GET /api/roster
 * Get player roster data
 */
app.get('/api/roster', (req, res) => {
  try {
    const data = require('./public/padres_backup.json');
    res.json(data.roster);
  } catch (error) {
    console.error('Error loading roster data:', error);
    res.status(500).json({ error: 'Failed to load roster data' });
  }
});

/**
 * GET /api/trivia
 * Get trivia facts
 */
app.get('/api/trivia', (req, res) => {
  try {
    const data = require('./public/padres_backup.json');
    // Return a random trivia fact
    const randomIndex = Math.floor(Math.random() * data.triviaFacts.length);
    res.json({ fact: data.triviaFacts[randomIndex] });
  } catch (error) {
    console.error('Error loading trivia:', error);
    res.status(500).json({ error: 'Failed to load trivia' });
  }
});

/**
 * POST /api/chat
 * Handle chat requests with Google Gemini AI
 * 
 * Request body:
 * {
 *   prompt: "User's question",
 *   persona: "contreras|tatis|machado|merrill"
 * }
 * 
 * Response:
 * {
 *   response: "AI-generated response",
 *   persona: "Selected persona",
 *   timestamp: "Response timestamp"
 * }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, persona } = req.body;
    
    // Validate request
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Check if Gemini API is configured
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      // Fallback to mock responses if no API key
      console.warn('GEMINI_API_KEY not configured, using mock responses');
      const mockResponse = generateMockResponse(prompt, persona);
      return res.json(mockResponse);
    }
    
    // Use Google Gemini AI
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Customize the prompt based on the selected persona
    const personaPrompt = getPersonaPrompt(persona, prompt);
    
    // Generate response
    const result = await model.generateContent(personaPrompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({
      response: text,
      persona: persona || 'default',
      timestamp: new Date().toISOString(),
      model: "gemini-1.5-flash"
    });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Fallback to mock response on error
    const { prompt, persona } = req.body || {};
    const mockResponse = generateMockResponse(prompt, persona);
    res.json(mockResponse);
  }
});

/**
 * Generate mock response based on persona
 */
function generateMockResponse(prompt, persona) {
  const personaResponses = {
    contreras: {
      default: "As a catcher, I see the whole field. Let me share some insights from behind the plate...",
      swing: "For a catcher's perspective on hitting: focus on your load and timing. We see every pitch, so trust me - patience at the plate is key.",
      cleats: "I'm more about function than fashion. Look for something with ankle support - we catchers need that stability.",
      petco: "At Petco, the ball carries well to right-center. Work the gaps and use the whole field."
    },
    tatis: {
      default: "What's good, fam? Tatis in the house! Let me break it down for you...",
      swing: "Bro, it's all about the swag in your swing! Keep it loose, let those hips rotate, and finish high!",
      cleats: "Oh you know I got you! Right now I'm rocking the Nike Alpha Huarache Elite with custom gold and brown accents.",
      petco: "Petco is my house! The left field wall is tall, so don't try to muscle up. Go opposite field!"
    },
    machado: {
      default: "Let me share my experience with you...",
      swing: "Your stance should be balanced. Hands high, elbow up. As the pitch comes, stride forward and keep your weight back.",
      cleats: "For hitting, you need cleats that give you traction but allow for quick pivoting.",
      petco: "At Petco, the infield plays fast. Stay on your toes, anticipate the hop."
    },
    merrill: {
      default: "The numbers tell a story. Let me break down the data for you...",
      swing: "Data shows that optimal launch angle is between 10-25 degrees for line drives. Work on your attack angle.",
      cleats: "From a metrics standpoint, lighter cleats can improve your first-step quickness.",
      petco: "Petco Park has a park factor of 98 for runs. The marine layer keeps the ball from carrying as much."
    }
  };
  
  const personaData = personaResponses[persona] || personaResponses.contreras;
  const promptLower = (prompt || '').toLowerCase();
  
  let response;
  if (promptLower.includes('swing')) {
    response = personaData.swing || personaData.default;
  } else if (promptLower.includes('cleat') || promptLower.includes('drip')) {
    response = personaData.cleats || personaData.default;
  } else if (promptLower.includes('petco') || promptLower.includes('park')) {
    response = personaData.petco || personaData.default;
  } else {
    response = personaData.default;
  }
  
  return {
    response: response,
    persona: persona || 'contreras',
    timestamp: new Date().toISOString(),
    model: "mock"
  };
}

/**
 * Get persona-specific prompt for Gemini
 */
function getPersonaPrompt(persona, userPrompt) {
  const personaContexts = {
    contreras: "You are William Contreras, the starting catcher for the San Diego Padres. You are a expert in pitch framing, game calling, and plate discipline. Respond as if you are giving advice from behind the plate. Be technical but encouraging.",
    tatis: "You are Fernando Tatis Jr., the superstar right fielder for the San Diego Padres. You are known for your style, energy, and excitement. Respond with enthusiasm and swagger, using slang and emojis appropriately.",
    machado: "You are Manny Machado, the veteran third baseman for the San Diego Padres. You are a leader with extensive experience. Respond as a mentor, giving wise and tactical advice about hitting and defense.",
    merrill: "You are Jackson Merrill, the young center fielder for the San Diego Padres. You are a stats-focused player who loves analytics. Respond with data-driven insights and statistical references."
  };
  
  const context = personaContexts[persona] || "You are a helpful baseball expert for the San Diego Padres.";
  
  return `${context}\n\nUser asks: ${userPrompt}\n\nProvide a helpful, engaging response:`;
}

// ============================================
// Error Handling Middleware
// ============================================

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Path ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// ============================================
// Start Server
// ============================================

// Start the server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   San Diego Padres Fan Portal Server                    ║
║   Running on: http://localhost:${PORT}                   ║
║   Static files: /public                                  ║
║   API endpoints: /api/*                                  ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Export for testing
module.exports = app;
