import { useState } from 'react'

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Function to toggle the navigation menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
    document.body.style.overflow = isNavOpen ? 'auto' : 'hidden'
  }

  // Function to handle the SVG path change
  const getMenuIconPath = () => {
    return isNavOpen ? 'M3 3l18 18M3 21L21 3' : 'M3 12h18M3 6h18M3 18h18'
  }

  const logoSvg = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
        stroke="black"
        strokeWidth="5"
      />
    </svg>
  )

  return (
    <nav
      role="navigation"
      id="navbar"
      className="flex items-center justify-between z-80 border-b border-gray-200 bg-gray-200/75 fixed w-full z-50 h-auto"
    >
      <div className="ml-2 relative z-80 logo">
        <a href="/" className="flex-cols z-80 p-2 items-center flex">
          {logoSvg}
        </a>
      </div>
      <a href="/" className="flex lg:flex text-black pt-2 pb-2 flex-col">
        <span className="text-md font-bold tracking-wide leading-none">
          REALITY
        </span>
        <span className="text-xs font-bold leading-none">DESIGNERS</span>
      </a>

      <div className="flex relative">
        <button
          id="nav-toggle"
          className="flex items-center justify-center items-center relative pl-2 pt-3 pr-2 z-20"
          aria-label="Toggle Menu"
          onClick={toggleNav}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={getMenuIconPath()} stroke="#000" strokeWidth="2"></path>
          </svg>
        </button>
      </div>

      <div
        id="nav-content"
        role="menu"
        className={`absolute right-2 top-2 rounded-2xl border border-gray-200/20 bg-black/50 lg:w-1/3 sm:w-2/3 w-[96vw] h-[97vh] overflow-y-auto flex-grow flex items-center ${
          isNavOpen ? 'flex' : 'hidden'
        }`}
      >
        <div class="w-full h-full backdrop-blur-xl p-2 relative ">
          <div class="w-full h-[300px]">
            <a href="/">
              <spline-viewer url="https://prod.spline.design/HeD0BAam-X2SBMf3/scene.splinecode"></spline-viewer>
            </a>
          </div>

          <ul class="flex font-bold relative  p-2 gap-2 h-auto lg:h-auto flex-col  lg:justify-end uppercase text-black text-5xl lg:text-6xl">
            <li>
              <a
                href="/library"
                class="block px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg"
              >
                Library
              </a>
            </li>
            <li>
              <a
                href="/story"
                class="block px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg"
              >
                Story
              </a>
            </li>
            <li>
              <a
                href="/feed"
                class="block px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg"
              >
                Feed
              </a>
            </li>
            <li>
              <a
                href="/team"
                class="block px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="/assets"
                class="block px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg"
              >
                3D
              </a>
            </li>
          </ul>
          <div class="w-full h-auto justify-center flex  p-2 bottom-0 rounded-xl relative ">
            <ul class="flex font-bold flex-row flex-wrap h-auto text-sm ">
              <li class="px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg ">
                <a href="/about">About</a>
              </li>
              <li class="px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg ">
                <a href="/become-a-creator">Become A Creator</a>
              </li>

              <li class="px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg ">
                <a href="/team">Contact </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
