
export default function AboutUs() {
  return (
    <section style={{ padding: '50px 20px', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>About Us</h2>
      <p style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        We are a passionate team of chefs and food lovers dedicated to bringing you
        authentic flavors and unforgettable dining experiences. Our recipes are inspired
        by tradition, perfected with love, and served with care.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '40px',
        gap: '20px'
      }}>
        {[
          { name: 'Chef Ali', role: 'Head Chef', img: '/team1.jpg' },
          { name: 'Sara', role: 'Pastry Chef', img: '/team2.jpg' },
          { name: 'Omar', role: 'Manager', img: '/team3.jpg' }
        ].map((member, idx) => (
          <div key={idx} style={{
            width: '200px',
            textAlign: 'center'
          }}>
            <img
              src={member.img}
              alt={member.name}
              style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}
            />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
