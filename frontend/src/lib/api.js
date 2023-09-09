import { createClient } from '@sanity/client'

const client = createClient({
  name: 'default',
  title: 'website',
  projectId: 'fovvfda4',
  dataset: 'production',
  apiVersion: '2023-08-31',
  useCdn: true,
})

export async function getLeftSideBarPosts() {
  const query = `*[_type == "posts"] |  order(_createdAt desc)[0..1] {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    publicationDate,
    lightLayout {
      image,
    },
    darkLayout {
      image,
    }
  }`
  const data = await client.fetch(query)
  return data
}

export async function getRightSideBarPosts() {
  const query = `*[_type == "posts"] |  order(_createdAt desc) {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    publicationDate,
    lightLayout {
      image,
    },
    darkLayout {
      image,
    }
  }`
  const data = await client.fetch(query)
  return data
}

export async function getMainPost() {
  const query = `*[_type == "posts"] |  order(_createdAt desc)[9] {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    publicationDate,
    lightLayout {
      image,
    },
    darkLayout {
      image,
    }
  }`
  const data = await client.fetch(query)
  return [data]
}

export async function getPostBySlug() {
  const query = `*[_type == "posts"] |  order(_createdAt desc) {
  title,
  layout,
  slug,
  excerpt,
  tags,
  category,
  publicationDate,
  team->{
   ...,
  },

  "lightLayout": {
   "image": darkLayout.image,
    "content": darkLayout.content[] {
      ...,
      media->,
     "postsRef": {
        "postsTitle": posts->title,
        "postsSlug": posts->slug.current,
        "postsImage": posts->darkLayout.image
        
      }
    }
  },
  "darkLayout": {
    "image": darkLayout.image,
    "content": darkLayout.content[] {
      ...,
      media-> {
        ...,
        className->{name},
        team->,
      },
     "postsRef": {
        "postsTitle": posts->title,
        "postsSlug": posts->slug.current,
        "postsImage": posts->darkLayout.image
      },
      markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  }
  }
}
`
  const data = await client.fetch(query)
  return data
}

export async function getPost() {
  const query = `*[_type == "post"] |  order(_createdAt desc) {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    publicationDate,
    image,
    content[],
    
  }`
  const data = await client.fetch(query)
  return data
}

export async function getImg() {
  const query = `*[_type == "img"] |  order(_createdAt desc) {
    image,
    title,
    alt,
    _id,
     content[]{
    ...,
  },
  
    team->{
      ...,
      image,
      name,
      slug,
      title,
    },
  }`
  const data = await client.fetch(query)
  return data
}

export async function getQuote() {
  const query = `*[_type == "quote"] {
  quote,
  "mediaRef": {
    "layout": mediaRef.layout,
    "image": mediaRef.image->image.asset->url
  }
}`

  const data = await client.fetch(query)

  return data
}

export async function getArticle() {
  const query = `*[_type == "article"]  |  order(_createdAt desc) {
  title,
  slug,
  image,
  excerpt,
  content[]{
    ...,
  }
}`
  const data = await client.fetch(query)
  return data
}

export async function getCategory() {
  const query = `*[_type == "category"] {
  _id,
  _type,
  title,
  isMain,
  sceneIdentifier,
  "sceneIdentifier": sceneIdentifier,
  "subCategories": *[_type == "category" && references(^._id)] { 
    _id, 
    _type, 
    title 
  },
  "associatedPosts": *[_type == "posts" && references(^._id)] {
    title,
    slug,
    excerpt,
    author,
    tags,
    category,
    publicationDate,
    lightLayout,
    darkLayout
  }
}`
  const data = await client.fetch(query)
  return data
}
