import { PortableText } from '@portabletext/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import ArticleRef from './ArticleRef.jsx'
import AudioRef from './AudioRef.jsx'
import ImageRef from './ImageRef.jsx'
import MediaRef from './MediaRef.jsx'
import PostsRef from './PostsRef.jsx'
import PostsRefLight from './PostsRefLight.jsx'
import QuoteRef from './QuoteRef.jsx'
import SplineRef from './SplineRef.jsx'
import '@fontsource/rajdhani/400.css'
import '@fontsource/rajdhani/500.css'
import '@fontsource/rajdhani/700.css'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/500.css'
import '@fontsource/noto-sans/600.css'

const iFrame = ({ value }) => {
  const { url, width, height } = value

  return (
    <div className="iframe-container">
      <iframe
        title="iframe"
        src={url}
        width={width}
        height={height}
        allowFullScreen
      ></iframe>
    </div>
  )
}

const Blog = {
  block: {
    normal: ({ children }) => (
      <div
        className="w-screen flex justify-center "
        style={{ fontFamily: 'Noto Sans', fontWeight: 400 }}
      >
        <p className="w-11/12 text-gray-200 leading-6 tracking-normal text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-8  ">
          {children}
        </p>
      </div>
    ),
    h1: ({ children }) => (
      <h1 className="w-full text-4xl font-bold uppercase leading-none tracking-wide lg:w-2/3 lg:text-6xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <div
        style={{ fontFamily: 'Rajdhani', fontWeight: 700 }}
        className="w-screen flex justify-center"
      >
        <h2 className="my-4 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4  lg:w-1/2  lg:text-5xl">
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <div
        style={{ fontFamily: 'Rajdhani', fontWeight: 700 }}
        className="w-screen flex justify-center"
      >
        <h2 className="my-4 w-11/12 text-3xl font-bold  leading-none tracking-wide md:w-3/4  lg:w-1/2  lg:text-4xl">
          {children}
        </h2>
      </div>
    ),
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {} } = value
      const href = `/blog/${slug?.current}`

      return (
        <a className="font-extrabold text-white " href={href}>
          {children}
        </a>
      )
    },
  },
  types: {
    iframe: iFrame,
    postsRef: PostsRef,
    articleRef: ArticleRef,
    mediaRef: MediaRef,
    spline: SplineRef,
    image: ImageRef,
    audioRef: AudioRef,
    quoteRef: QuoteRef,
  },
}

const Light = {
  block: {
    normal: ({ children }) => (
      <div
        className="w-screen flex justify-center "
        style={{ fontFamily: 'Noto Sans', fontWeight: 400 }}
      >
        <p className="w-11/12 text-black leading-6 tracking-normal text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-8  ">
          {children}
        </p>
      </div>
    ),
    h1: ({ children }) => (
      <h1 className="w-full text-4xl font-bold uppercase leading-none tracking-wide lg:w-2/3 lg:text-6xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <div
        style={{ fontFamily: 'Rajdhani', fontWeight: 700 }}
        className="w-screen flex justify-center"
      >
        <h2 className="my-4 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4  lg:w-1/2  lg:text-5xl">
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <div
        style={{ fontFamily: 'Rajdhani', fontWeight: 700 }}
        className="w-screen flex justify-center"
      >
        <h2 className="my-4 w-11/12 text-3xl font-bold  leading-none tracking-wide md:w-3/4  lg:w-1/2  lg:text-4xl">
          {children}
        </h2>
      </div>
    ),
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {} } = value
      const href = `/blog/${slug?.current}`

      return (
        <a className="font-extrabold text-black " href={href}>
          {children}
        </a>
      )
    },
  },
  types: {
    iframe: iFrame,
    postsRef: PostsRefLight,
    articleRef: ArticleRef,
    mediaRef: MediaRef,
    spline: SplineRef,
    image: ImageRef,
    audioRef: AudioRef,
    quoteRef: QuoteRef,
  },
}

const PostCard = {
  normal: ({ children }) => <p className="article-card-text">{children}</p>,
  h1: ({ children }) => <h1 className="article-card-h1">{children}</h1>,

  block: {
    normal: ({ children }) => (
      <div style={{ fontFamily: 'Rajdhani', fontWeight: 400 }}>
        <p className=" text-gray-400 leading-6 tracking-wide text-lg ">
          {children}
        </p>
      </div>
    ),
    h2: ({ children }) => (
      <div style={{ fontFamily: 'Rajdhani', fontWeight: 700 }}>
        <h2 className="my-4 text-2xl font-bold  leading-none tracking-wide ">
          {children}
        </h2>
      </div>
    ),
  },
}

const PortableTextComponent = ({ content, template }) => {
  const [chosenComponents, setChosenComponents] = useState(null)

  if (!chosenComponents) {
    switch (template) {
      case 'blog':
        setChosenComponents(Blog)
        break
      case 'light':
        setChosenComponents(Light)
        break
      case 'postCard':
        setChosenComponents(PostCard)
        break
      default:
        console.error('Invalid template type specified.')
        return null
    }
  }

  return (
    <PortableText
      value={content}
      className={`portableText ${template}`}
      components={chosenComponents}
    />
  )
}

PortableTextComponent.propTypes = {
  content: PropTypes.array.isRequired,
  template: PropTypes.string.isRequired,
}

export default PortableTextComponent
