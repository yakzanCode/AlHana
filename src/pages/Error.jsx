import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      background: '#f8f9fa',
      color: '#333',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '5rem', margin: 0 }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ maxWidth: '400px' }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        style={{
          marginTop: '1.5rem',
          padding: '0.7rem 1.2rem',
          background: '#007BFF',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Go Home
      </Link>
    </div>
  )
}
