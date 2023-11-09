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
  const query = `*[_type == "posts"] |  order(_createdAt desc)[1..2] {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    publicationDate,
    image,
  }`
  const data = await client.fetch(query)
  return data
}

export async function getRightSideBarPosts() {
  const query = `*[_type == "posts"] |  order(_createdAt desc)[3..7] {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    publicationDate,
    image,
  }`
  const data = await client.fetch(query)
  return data
}

export async function getMainPost() {
  const query = `*[_type == "posts"] |  order(_createdAt desc)[0] {
    title,
    category,
    author,
    excerpt,
    tags,
    slug,
    block[]{
        ...,

    publicationDate,
    },
    image,
  }`
  const data = await client.fetch(query)
  return data
}

export async function getPostBySlug() {
  const query = `
    *[_type == "posts"] | order(_createdAt desc) {
      title,
      slug,
      excerpt,
      image,
      block[]{
        ...,
        heading,
        subHeading,
        image,
        tags,
        layout,
        title,
        publicationDate,
         team->{
        ...,
        name,
        role,
        image,
        shortBio,
      },
      
          content[]{
        ...,
        
        media-> {
          ...,
          className->{name},
          team->,
        },
        image->{
          ...,
          className->{name},
          team->,
        },
        "videoRefData": {
          "videoTitle": video->title,
          "videoFileUrl": video->video.asset->url,
          "videoImage": video->image,
          "videoTeam": video->team,
          team->,
        },
 
        "audioRefData": {
          "audioTitle": audio->title,
          "audioFileUrl": audio->audioFile.asset->url
        },
        quote->{
          ...,
          quote,
          "mediaRef": {
            "layout": mediaRef.layout,
            "image": mediaRef.image->image.asset->url
          }
        },
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        },
        "postsRef": {
          "postsTitle": posts->title,
          "postsSlug": posts->slug.current,
          "postsImage": posts->image,
          "postsExcerpt": posts->excerpt,
          ...,
        },
      },
    },
    
  
      linkedContent[]{
        ...,
        post-> {
          title,
          layout,
          slug,
          excerpt,
          tags,
          category,
          publicationDate,
          image,
          team->{
            ...,
            shortBio,
          },
           block[]{
        ...,
        heading,
        subHeading,
        image,
        tags,
        layout,
        title,
        publicationDate,
         team->{
        ...,
        name,
        role,
        image,
        shortBio,
      },
    },
          content[]{
        ...,
        
        media-> {
          ...,
          className->{name},
          team->,
        },
        "audioRefData": {
          "audioTitle": audio->title,
          "audioFileUrl": audio->audioFile.asset->url
        },
        quote->{
          ...,
          quote,
          "mediaRef": {
            "layout": mediaRef.layout,
            "image": mediaRef.image->image.asset->url
          }
        },
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        },
        "postsRef": {
          "postsTitle": posts->title,
          "postsSlug": posts->slug.current,
          "postsImage": posts->image,
          "postsExcerpt": posts->excerpt,
          ...,
        },
      },
    },
  },
    }
  `

  const data = await client.fetch(query)
  return data
}

export async function getPosts() {
  const query = `*[_type == "posts"] |  order(_createdAt desc) {
    title,
    slug,
    image,
    excerpt,
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

  const data = await client.fetch(query);
  return data;
}



export async function getArticle() {
  const query = `*[_type == "article"]  |  order(_createdAt desc) {
  title,
  slug,
  image,
  excerpt,
  content[]{
    ...,
    post->{
      _id,
      title,
      content[]
    }
  }
    
}`
  const data = await client.fetch(query)
  return data
}

export async function getArticleBySlug() {
  const query = `
    *[_type == "article"] {
      title,
      slug,
      image,
      excerpt,
      content[] {
        ...,
        post-> {
          _id,
          title,
          content[]{
            ...,
            media-> {
              ...,
              className->{name},
              team->,
            },
            markDefs[]{
              ...,
              _type == "internalLink" => {
                "slug": @.reference->slug
              }
            },
           
             "articleRef": {
        "articleTitle": article->title,
        "articleSlug": article->slug.current,
        "articleImage": article->.image
      },
          }
        }
      }
    }
  `

  const data = await client.fetch(query)
  return data
}

export async function getCategory() {
  const query = `*[_type == "category" ] {
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
    darkLayout,
  }
}`
  const data = await client.fetch(query)
  return data
}

export async function getTeam() {
  const query = `*[_type == "team"] |  order(_createdAt asc) {
  name,
  role,
  image,
  scene,
  shortBio,
  bio,
  slug,
  title,    
}`
  const data = await client.fetch(query)
  return data
}

export async function getPostsByTeam() {
  const query = `*[_type == "posts" ] | order(_createdAt desc) {
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

export async function getVideo() {
  const query = `*[_type == "video"] |  order(_createdAt desc) {
  title,
  slug,
  url,
  image,
  }`
  const data = await client.fetch(query)
  return data
}

export async function getVideoBySlug() {
  const query = `*[_type == "video"] |  order(_createdAt desc) {
  title,
  slug,
  url,
  image,
  video,
  }`
  const data = await client.fetch(query)
  return data
}

export async function getModel() {
  const query = `*[_type == "model"] |  order(_createdAt desc) {
  title, 
  file,
  }`
  const data = await client.fetch(query)
  return data
}

export async function getModules() {
  const query = `*[_type == "modules" ] {
  title,
  model->{...,
  file,
   },
  isMain,
    "subCategories": *[_type == "modules" && references(^._id)] { 
    _id, 
    _type, 
    title,
    isMain,
     model->{...,
  file,
   },
  },
  "associatedPosts": *[_type == "posts" && references(^._id)] {
    title,
    slug,
    file,
  }
}`
  const data = await client.fetch(query)
  return data
}


export async function getLibrary() {
  const query = `*[_type == "category" ] {
  _id,
  _type,
  title,
  isMain,
  sceneIdentifier,
  "sceneIdentifier": sceneIdentifier,
  "subCategories": *[_type == "posts" && references(^._id)] { 
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
    darkLayout,
  }
}`
  const data = await client.fetch(query)
  return data
}