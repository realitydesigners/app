import React, { createContext, useContext, useState } from 'react'

const defaultContext = {
  navigation: { mainWorld: null, subWorld: null, category: null },
  setNavigation: () => {}, // dummy function
}

const CategoryContext = createContext(defaultContext)

export const CategoryProvider = ({ children }) => {
  const [navigation, setNavigation] = useState({
    mainWorld: null,
    subWorld: null,
    category: null,
  })

  return (
    <CategoryContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
}

export default CategoryContext
