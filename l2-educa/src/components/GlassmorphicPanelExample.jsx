import GlassmorphicPanel from './GlassmorphicPanel';
import './GlassmorphicPanelExample.css';

/**
 * GlassmorphicPanelExample - Demonstration of various uses
 * 
 * This file shows different ways to use the GlassmorphicPanel component
 */
export default function GlassmorphicPanelExample() {
  return (
    <div className="glass-examples">
      <h1 className="glass-examples__title">Glassmorphic Panel Examples</h1>
      
      <div className="glass-examples__grid">
        
        {/* Example 1: Basic Usage */}
        <div className="glass-examples__item">
          <h3>Basic Panel</h3>
          <GlassmorphicPanel
            width={250}
            height={100}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Hello World</h2>
              <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Simple glass effect</p>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 2: Custom Colors */}
        <div className="glass-examples__item">
          <h3>Custom Tint</h3>
          <GlassmorphicPanel
            width={250}
            height={100}
            tint="#e0f2fe"
            blur={3}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#0369a1' }}>Sky Blue</h2>
              <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Custom tint color</p>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 3: High Blur */}
        <div className="glass-examples__item">
          <h3>Extra Blur</h3>
          <GlassmorphicPanel
            width={250}
            height={100}
            blur={4.5}
            distortion={3.5}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Dreamy</h2>
              <p style={{ margin: '8px 0 0', opacity: 0.8 }}>High blur effect</p>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 4: Sharp Glass */}
        <div className="glass-examples__item">
          <h3>Sharp Glass</h3>
          <GlassmorphicPanel
            width={250}
            height={100}
            blur={1}
            distortion={1}
            cornerRadius={8}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Crystal Clear</h2>
              <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Minimal blur</p>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 5: Button Style */}
        <div className="glass-examples__item">
          <h3>Interactive Button</h3>
          <GlassmorphicPanel
            width={200}
            height={80}
            tint="#fef3c7"
            cornerRadius={40}
            className="glass-button"
            onClick={() => alert('Glass button clicked!')}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Click Me</h2>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 6: Card Style */}
        <div className="glass-examples__item">
          <h3>Wide Card</h3>
          <GlassmorphicPanel
            width={350}
            height={120}
            tint="#fae8ff"
            showShadow={true}
          >
            <div style={{ maxWidth: '500px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#86198f' }}>Feature Card</h2>
              <p style={{ margin: '12px 0 0', opacity: 0.9, fontSize: '14px' }}>
                Perfect for highlighting features or important information
              </p>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 7: No Shadow */}
        <div className="glass-examples__item">
          <h3>No Shadow</h3>
          <GlassmorphicPanel
            width={250}
            height={100}
            showShadow={false}
            tint="#dcfce7"
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#15803d' }}>Flat Style</h2>
              <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Shadow disabled</p>
            </div>
          </GlassmorphicPanel>
        </div>

        {/* Example 8: With Background Image */}
        <div className="glass-examples__item">
          <h3>Custom Background</h3>
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

      {/* Code Example */}
      <div className="glass-examples__code">
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

    </div>
  );
}

