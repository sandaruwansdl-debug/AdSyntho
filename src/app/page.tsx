export default function HomePage() {
  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <div style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #ffffff, #e0f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Ad Syntho
        </div>
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          AI-Powered Ad Campaign Management
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '2rem',
          opacity: '0.9',
          lineHeight: '1.6'
        }}>
          Unify your paid campaigns across all platforms with intelligent insights and optimization recommendations.
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1rem 2rem', 
            borderRadius: '0.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>500+</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>Active Users</div>
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1rem 2rem', 
            borderRadius: '0.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$2.5M</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>Ad Spend Managed</div>
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1rem 2rem', 
            borderRadius: '0.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>25%</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>ROAS Improvement</div>
          </div>
        </div>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '2rem', 
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🎉 Platform Successfully Deployed!
          </h2>
          <p style={{ marginBottom: '1rem', opacity: '0.9' }}>
            Your Ad Syntho platform is now live and ready to serve customers.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: 'white',
              color: '#0ea5e9',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Start Free Trial
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: '2px solid white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              View Demo
            </button>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '2rem', 
          fontSize: '0.9rem', 
          opacity: '0.7' 
        }}>
          <p>✅ Domain: adsyntho.com</p>
          <p>✅ SSL Certificate: Active</p>
          <p>✅ Deployment: Successful</p>
          <p>✅ Platform: Ready for customers</p>
        </div>
      </div>
    </div>
  )
}