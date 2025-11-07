import GlassmorphicPanel from './components/GlassmorphicPanel';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Glassmorphic Component</h1>
        <p>WebGL-powered glass effects for modern UIs</p>
        <p className="tagline">Scroll down to see the glass effects in action ✨</p>
      </header>

      <div className="glass-grid">
        
        {/* Example 1: Basic Panel with Gradient Circles */}
        <div className="glass-example">
          <h3>Basic Panel</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#feca57', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
              <circle cx="300" cy="200" r="100" fill="#48dbfb" opacity="0.7" />
              <circle cx="200" cy="250" r="60" fill="#ff9ff3" opacity="0.8" />
            </svg>
            
            <GlassmorphicPanel width={250} height={100}>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px' }}>Hello World</h2>
                <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Simple glass effect</p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 2: Custom Tint with Wave Pattern */}
        <div className="glass-example">
          <h3>Custom Tint</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad2)" />
              <path d="M0,100 Q100,50 200,100 T400,100 L400,300 L0,300 Z" fill="#48dbfb" opacity="0.5" />
              <path d="M0,150 Q100,120 200,150 T400,150 L400,300 L0,300 Z" fill="#0abde3" opacity="0.4" />
            </svg>
            
            <GlassmorphicPanel width={250} height={100} tint="#e0f2fe" blur={3}>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#0369a1' }}>Sky Blue</h2>
                <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Custom tint color</p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 3: Extra Blur with Geometric Shapes */}
        <div className="glass-example">
          <h3>Extra Blur</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="grad3">
                  <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 1 }} />
                </radialGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad3)" />
              <polygon points="50,50 150,50 100,150" fill="#feca57" opacity="0.6" />
              <polygon points="250,80 350,80 300,180" fill="#48dbfb" opacity="0.5" />
              <rect x="80" y="180" width="100" height="100" fill="#ee5a6f" opacity="0.6" rx="15" />
            </svg>
            
            <GlassmorphicPanel width={250} height={100} blur={4.5} distortion={3.5}>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px' }}>Dreamy</h2>
                <p style={{ margin: '8px 0 0', opacity: 0.8 }}>High blur effect</p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 4: Sharp Glass with Stripes */}
        <div className="glass-example">
          <h3>Sharp Glass</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#fa8231', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#feca57', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#fa8231', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="#2d3436" />
              <rect x="0" y="0" width="50" height="300" fill="url(#grad4)" />
              <rect x="75" y="0" width="50" height="300" fill="url(#grad4)" opacity="0.7" />
              <rect x="150" y="0" width="50" height="300" fill="url(#grad4)" opacity="0.5" />
              <rect x="225" y="0" width="50" height="300" fill="url(#grad4)" opacity="0.7" />
              <rect x="300" y="0" width="50" height="300" fill="url(#grad4)" />
            </svg>
            
            <GlassmorphicPanel width={250} height={100} blur={1} distortion={1} cornerRadius={8}>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px' }}>Crystal Clear</h2>
                <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Minimal blur</p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 5: Interactive Button with Dots */}
        <div className="glass-example">
          <h3>Interactive Button</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill="#feca57" />
                </pattern>
                <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#a29bfe', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#6c5ce7', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad5)" />
              <rect width="400" height="300" fill="url(#dots)" opacity="0.3" />
              <circle cx="320" cy="80" r="50" fill="#fdcb6e" opacity="0.4" />
              <circle cx="80" cy="220" r="70" fill="#fd79a8" opacity="0.4" />
            </svg>
            
            <GlassmorphicPanel
              width={200}
              height={80}
              tint="#fef3c7"
              cornerRadius={40}
              className="glass-button"
              onClick={() => alert('Glass button clicked! ✨')}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Click Me</h2>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 6: Wide Card with Abstract Shapes */}
        <div className="glass-example">
          <h3>Wide Card</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#74b9ff', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0984e3', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad6)" />
              <ellipse cx="100" cy="150" rx="80" ry="120" fill="#a29bfe" opacity="0.4" />
              <ellipse cx="300" cy="150" rx="100" ry="80" fill="#fd79a8" opacity="0.3" />
              <path d="M200,50 L250,150 L200,250 L150,150 Z" fill="#ffeaa7" opacity="0.5" />
            </svg>
            
            <GlassmorphicPanel width={350} height={120} tint="#fae8ff" showShadow={true}>
              <div style={{ maxWidth: '500px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#86198f' }}>Feature Card</h2>
                <p style={{ margin: '12px 0 0', opacity: 0.9, fontSize: '14px' }}>
                  Perfect for highlighting features or important information
                </p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 7: No Shadow with Grid */}
        <div className="glass-example">
          <h3>No Shadow</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00b894" strokeWidth="1" opacity="0.3" />
                </pattern>
                <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#55efc4', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#00b894', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad7)" />
              <rect width="400" height="300" fill="url(#grid)" />
              <circle cx="200" cy="150" r="80" fill="#fdcb6e" opacity="0.3" />
            </svg>
            
            <GlassmorphicPanel width={250} height={100} showShadow={false} tint="#dcfce7">
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#15803d' }}>Flat Style</h2>
                <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Shadow disabled</p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

        {/* Example 8: Custom Background Image */}
        <div className="glass-example">
          <h3>Custom Background</h3>
          <div className="demo-container">
            <svg className="background-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#fc5c65', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#fd9644', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#fed330', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#grad8)" />
              {/* Mountain-like shapes */}
              <path d="M0,250 L100,100 L200,180 L300,80 L400,200 L400,300 L0,300 Z" fill="#2d3436" opacity="0.3" />
              <path d="M0,270 L150,150 L250,200 L350,120 L400,220 L400,300 L0,300 Z" fill="#2d3436" opacity="0.4" />
              <circle cx="80" cy="80" r="30" fill="#fed330" opacity="0.6" />
            </svg>
            
            <GlassmorphicPanel
              width={250}
              height={100}
              backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?w=800"
            >
              <div style={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <h2 style={{ margin: 0, fontSize: '24px' }}>Mountains</h2>
                <p style={{ margin: '8px 0 0' }}>Custom image</p>
              </div>
            </GlassmorphicPanel>
          </div>
        </div>

      </div>

      {/* Code Example */}
      <div className="code-section">
        <h2>Usage Example</h2>
        <pre>{`import GlassmorphicPanel from './components/GlassmorphicPanel';

function MyComponent() {
  return (
    <GlassmorphicPanel
      width={300}
      height={120}
      tint="#f8fff0"
      blur={2.5}
      cornerRadius={24}
    >
      <div>
        <h2>Your Content Here</h2>
        <p>Add any JSX content</p>
      </div>
    </GlassmorphicPanel>
  );
}`}</pre>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Based on the Glass Material Editor by{' '}
          <a href="https://danielamuntyan.com/" target="_blank" rel="noopener noreferrer">
            Daniela Muntyan
          </a>
        </p>
        <p className="webgl-note">
          ⚠️ Requires WebGL support • Works best on modern browsers
        </p>
      </footer>
    </div>
  );
}
