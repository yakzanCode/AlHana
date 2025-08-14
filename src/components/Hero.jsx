
export default function Hero() {
  return (
    <section 
      style={{
        backgroundImage: `url('/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to AlHana</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
        Delicious food, made with love and tradition.
      </p>
      <button 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#ff6347',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Order Now
      </button>
    </section>
  )
}
