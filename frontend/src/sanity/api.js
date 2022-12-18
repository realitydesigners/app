import { useSanityClient } from "astro-sanity";

export async function postsMainArticleColumnOne() {
  const client = useSanityClient();
  const query = `*[_type == "post"] | order(_createdAt desc)[1..2]`;
  const posts = await client.fetch(query);
  return posts;
}
export async function postsArticleCard() {
  const client = useSanityClient();
  const query = `*[_type == "post"] | order(_createdAt desc)[3..7]{...,author->{...}}{...,category->{...}}`;
  const posts = await client.fetch(query);
  return posts;
}
export async function postsArticleTop() {
  const client = useSanityClient();
  const query = `*[_type == "post"] | order(_createdAt desc)[7..20]{...,author->{...}}{...,category->{...}}`;
  const posts = await client.fetch(query);
  return posts;
}

export async function getAllArticles() {
  const client = useSanityClient();
  const query = `*[_type == "article"]`;
  const posts = await client.fetch(query);
  return posts;
}

export async function getAllAuthors() {
  const client = useSanityClient();
  const query = `*[_type == "author"]`;
  const posts = await client.fetch(query);
  return posts;
}

export async function getAllScenes() {
  const client = useSanityClient();
  const query = `*[_type == "scenes"]`;
  const posts = await client.fetch(query);
  return posts;
}
export async function getAllConvos() {
  const client = useSanityClient();
  const query = `*[_type == "convos"]`;
  const posts = await client.fetch(query);
  return posts;
}

export async function getAllLogos() {
  const client = useSanityClient();
  const query = `*[_type == "logos"]`;
  const posts = await client.fetch(query);
  return posts;
}

export async function getQuote() {
  const client = useSanityClient();
  const query = `*[_type == "quote"]`;
  const quotes = await client.fetch(query);
  return quotes;
}

export async function getIdeas() {
  const client = useSanityClient();
  const query = `*[_type == "idea"]`;
  const ideas = await client.fetch(query);
  return ideas;
}

export async function getTransitions() {
  const client = useSanityClient();
  const query = `*[_type == "transition"]`;
  const transitions = await client.fetch(query);
  return transitions;
}

export async function getVideos() {
  const client = useSanityClient();
  const query = `*[_type == "video"]`;
  const video = await client.fetch(query);
  return video;
}
