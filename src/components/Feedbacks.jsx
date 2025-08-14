
import React from 'react'

export default function Feedbacks() {
  const feedbacks = [
    { name: 'John D.', text: 'The best shawarma I’ve ever had! Highly recommended.' },
    { name: 'Maria S.', text: 'Amazing flavors, friendly staff, and quick service.' },
    { name: 'David P.', text: 'Every bite was delicious. Definitely coming back!' }
  ]

  return (
    <section style={{ padding: '50px 20px', background: '#f0f0f0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>What Our Customers Say</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {feedbacks.map((fb, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <p style={{ fontStyle: 'italic' }}>"{fb.text}"</p>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>- {fb.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
