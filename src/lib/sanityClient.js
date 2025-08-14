// src/lib/sanityClient.js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'nmd9utoa',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// ==================== DISHES ====================

// Fetch all dishes
export async function fetchDishes() {
  const query = `*[_type == "dish"]{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    images[]{ asset->{ _id, url } }
  } | order(name asc)`
  return await client.fetch(query)
}

// Fetch only main dish
export async function fetchMainDish() {
  const query = `*[_type == "dish" && mainDish == true][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    images[]{ asset->{ _id, url } }
  }`
  return await client.fetch(query)
}

// Fetch one dish by slug
export async function fetchDishBySlug(slug) {
  const query = `*[_type == "dish" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    images[]{ asset->{ _id, url } }
  }`
  return await client.fetch(query, { slug })
}

// ==================== FEEDBACKS ====================

// Fetch all feedbacks with user & dish
export async function fetchFeedbacks() {
  const query = `*[_type == "feedback"]{
    _id,
    message,
    rating,
    createdAt,
    user->{
      name,
      avatar
    },
    dish->{
      name,
      "slug": slug.current,
      images[0]{ asset->{ url } }
    }
  } | order(_createdAt desc)`
  return await client.fetch(query)
}

// Fetch feedbacks for a specific dish by slug
export async function fetchFeedbacksByDishSlug(slug) {
  const query = `*[_type == "feedback" && dish->slug.current == $slug]{
    _id,
    message,
    rating,
    createdAt,
    user->{
      name,
      avatar
    },
    dish->{
      name,
      "slug": slug.current,
      images[0]{ asset->{ url } }
    }
  } | order(_createdAt desc)`
  return await client.fetch(query, { slug })
}

// ==================== TEAMMEMBERS ====================

// Fetch all team members
export async function fetchTeamMembers() {
  const query = `*[_type == "teamMember"]{
    _id,
    name,
    position,
    photo,
    description,
    socialLinks {
      facebook,
      instagram,
      whatsapp
    }
  } | order(name asc)`
  return await client.fetch(query)
}
