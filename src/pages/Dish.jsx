import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanityClient'

export default function Dish() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    client.fetch(`*[_type == "dish"]`)
      .then((data) => setDishes(data))
      .catch(console.error)
  }, [])

  return (
    <div>
      {dishes.map((dish) => (
        <div key={dish._id}>
          <h2>{dish.name} - ${dish.price}</h2>
          <p>{dish.description}</p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {dish.images?.map((img) => (
              <img
                key={img._key}
                src={urlFor(img).width(300).url()}
                alt={dish.name}
                style={{ borderRadius: '8px' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
