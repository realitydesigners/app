import React, { useEffect, useRef, useState } from 'react'

// The sidebar that displays the headings
export function Sidebar({ h2Headings, activeHeading }) {
  return (
    <aside className=" hidden lg:block sticky top-20 p-2  rounded-md text-white border border-gray-600">
      <ul className="scrollbar-hide hide-scrollbar flex flex-col space-y-2">
        {h2Headings.map((heading) => (
          <li className="bg-gray-600/60  hover:bg-gray-600/80 p-2 rounded">
            <a
              className="rajdhani text-xs font-bold leading-none uppercase tracking-wide"
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
