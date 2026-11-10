# San Diego Padres Fan Portal

A premium, high-end web application for San Diego Padres fans featuring real-time data, AI-powered player personas, and an immersive baseball experience.

## 🚀 Project Overview

The Padres Fan Portal is a multi-phase web application designed to provide fans with an engaging, interactive experience. Built with modern web technologies and featuring AI integration, this portal brings the excitement of Padres baseball to life.

## 📁 Project Structure

```
padres-fan-portal/
├── public/                    # Static files served to clients
│   ├── index.html           # Main HTML structure & view containers
│   ├── styles.css           # Custom CSS, animations, and styling
│   ├── app.js               # Frontend JavaScript logic
│   └── padres_backup.json   # Local player roster & trivia fallback data
├── server.js                # Node.js Express server
├── package.json             # Node.js dependencies & project configuration
└── README.md                # Project documentation
```

## ✨ Features

### Phase 1: Dugout Dashboard ✅
- **Real-time Countdown Timer** - Tracks time to Opening Day at Petco Park
- **Daily Trivia** - Random Padres facts with shuffle functionality
- **Featured Player Grid** - Showcases star players with stats and headshots
- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme toggle with LocalStorage persistence

### Phase 2: Expert Clubhouse ✅
- **AI Player Personas** - Chat with 4 different Padres players:
  - William Contreras (Catcher & Playmaker)
  - Fernando Tatis Jr. (Drip & Style Icon)
  - Manny Machado (Hitting & Defense Specialist)
  - Jackson Merrill (Stats & Fantasy Scout)
- **Interactive Chat Interface** - Beautiful speech bubbles with animations
- **Quick Topic Buttons** - Pre-defined questions for each persona
- **Chat History** - Conversations persist in LocalStorage
- **Backend API Integration** - Ready for Google Gemini AI

### Phase 3: Gear Locker (Planned)
- Player equipment database
- Custom cleat designer
- Jersey customization
- Gear recommendations

### Phase 4: Lineup Builder (Planned)
- Drag-and-drop lineup creation
- Position-specific recommendations
- Statistical analysis
- Export/share lineups

### Phase 5: Player Comparison (Planned)
- Head-to-head player stats
- Historical comparisons
- Fantasy baseball insights
- Custom metric analysis

## 🎨 Design Features

### Premium Visual Effects
- **Floating Particle Background** - Golden particles drift across the screen
- **3D Tilt Card Animations** - Cards lift, rotate, and glow on hover
- **Shimmer Effects** - Light reflections across glassmorphism cards
- **Pulsing Elements** - Online status badges and selected cards
- **Smooth Transitions** - All animations are fluid and polished
- **Pinstripe Background** - Custom San Diego Padres theme

### Color Scheme
- **Primary Brown**: `#2F241D` - Classic Padres brown
- **Gold Accent**: `#FFC425` - Signature Padres gold
- **Dark Background**: `#181412` - Deep, rich dark mode
- **Card Background**: `#241E1A` - Subtle card coloring

### Typography
- **Bebas Neue** - Used for headings and titles (sports-style font)
- **Inter** - Used for body text (clean, modern sans-serif)

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom animations and styling
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript with modules
- **Google Fonts** - Bebas Neue & Inter

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **Google Generative AI** - For AI-powered chat responses
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Hosting
- Can be deployed to any Node.js hosting service
- Static files served from `/public` directory
- API endpoints at `/api/*`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Google Gemini API key for AI functionality

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/michaelvillalobos003/Baseball-Web-App.git
   cd Baseball-Web-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Or run in production mode:**
   ```bash
   npm start
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Without Backend (Static Mode)
Simply open `public/index.html` in a browser. All Phase 1 and Phase 2 features will work with mock data and localStorage persistence.

### With Backend (Full Mode)
1. Start the server: `npm start`
2. Access the app at `http://localhost:3000`
3. AI chat will use Google Gemini if API key is configured
4. Falls back to mock responses if no API key is present

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| GET | `/api/data` | Get all backup data |
| GET | `/api/roster` | Get player roster |
| GET | `/api/trivia` | Get random trivia fact |
| POST | `/api/chat` | Send chat message to AI |

### POST /api/chat

**Request:**
```json
{
  "prompt": "Fix my swing",
  "persona": "tatis"
}
```

**Response:**
```json
{
  "response": "Bro, it's all about the swag in your swing! Keep it loose...",
  "persona": "tatis",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "model": "gemini-1.5-flash"
}
```

## 📦 Build & Deployment

### Local Development
```bash
npm run dev
```
Uses nodemon for automatic server restarts on file changes.

### Production Build
```bash
npm start
```
Runs the server in production mode on port 3000 (or specified PORT).

### Deploy to Production
The app can be deployed to:
- Heroku
- Render
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Any Node.js hosting service

Set the `PORT` environment variable to the port your hosting service requires.

## 🤖 AI Integration

The chat functionality integrates with Google's Gemini AI for intelligent responses. Each player persona has a unique voice and expertise:

- **Contreras**: Technical catching advice, pitch framing insights
- **Tatis**: Style-focused, energetic, uses slang
- **Machado**: Tactical hitting and defense advice, leadership
- **Merrill**: Data-driven, statistical analysis, fantasy insights

Without a Gemini API key, the app falls back to intelligent mock responses that match each persona's style.

## 🎨 Customization

### Adding New Players
Edit `public/padres_backup.json` to add or modify player data:
```json
{
  "id": 123456,
  "name": "Player Name",
  "position": "Position",
  "positionAbbr": "POS",
  "jerseyNumber": "00",
  "headshotUrl": "https://...",
  "stats": { ... }
}
```

### Adding New Personas
Add to the `personas` object in `public/app.js`:
```javascript
const personas = {
  newPersona: {
    name: "Name",
    title: "Title",
    avatar: "url",
    welcome: "Welcome message"
  }
}
```

### Customizing Styles
Edit `public/styles.css` to modify:
- Colors
- Animations
- Card styles
- Typography

## 📊 Data Sources

### Primary Data
- Local JSON files (`padres_backup.json`)
- LocalStorage for chat persistence

### Future Integrations
- MLB Stats API (`statsapi.mlb.com`)
- Google Gemini AI
- Custom backend database

## 🐛 Troubleshooting

### Particles not showing
Ensure the `particle-bg` div is present in index.html and CSS is loaded.

### AI not responding
Check that:
1. `GEMINI_API_KEY` is set in `.env`
2. The key is valid
3. You have internet connectivity

### Static mode not working
Open `public/index.html` directly in a browser - no server required.

## 📜 License

MIT License - Feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- San Diego Padres organization
- MLB for player data and images
- Google for Gemini AI
- Tailwind CSS team
- All the amazing baseball fans worldwide

---

**Built with ❤️ for Padres fans by Padres fans**

*Go Padres! 🟡⚫*
