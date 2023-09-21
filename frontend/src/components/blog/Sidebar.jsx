import React, { useEffect, useRef, useState } from 'react'

export function Sidebar({ h2Headings, activeHeading }) {
  if (!h2Headings || h2Headings.length === 0) {
    return null
  }

  return (
    <aside className="hidden lg:block sticky top-20 z-50 border border-gray-600 p-4 text-white">
      <h2 className="text-sm font-bold mb-4 text-white border-b border-gray-600 pb-2">
        POST
      </h2>
      <ul className="scrollbar-hide hide-scrollbar flex flex-col space-y-2 mt-4">
        {h2Headings.map((heading, index) => (
          <li
            key={index}
            className={`border border-gray-600/60 hover:bg-gray-600/60 p-3 rounded-lg transition-colors duration-200 ${
              activeHeading === heading ? 'bg-gray-600' : ''
            }`}
          >
            <a
              className="rajdhani text-sm font-bold leading-none uppercase tracking-wide"
              href={`#${heading.replace(/ /g, '-').toLowerCase()}`}
            >
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export function SidebarWrapper({ h2Headings }) {
  const [activeHeading, setActiveHeading] = useState('')
  const headingElements = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    )

    const currentHeadings = headingElements.current
    if (currentHeadings && currentHeadings.length > 0) {
      currentHeadings.forEach((heading) => {
        observer.observe(heading)
      })
    }

    return () => {
      if (currentHeadings && currentHeadings.length > 0) {
        currentHeadings.forEach((heading) => {
          observer.unobserve(heading)
        })
      }
    }
  }, [])

  return <Sidebar h2Headings={h2Headings} activeHeading={activeHeading} />
}
