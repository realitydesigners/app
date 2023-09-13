'use client'

import React, { createContext, useContext, useState } from 'react'

type Navigation = {
  mainWorld: string | null
  subWorld: string | null
  category: string | null
}

type CategoryContextType = {
  navigation: Navigation
  setNavigation: React.Dispatch<React.SetStateAction<Navigation>>
}

const defaultContext: CategoryContextType = {
  navigation: { mainWorld: null, subWorld: null, category: null },
  setNavigation: () => {}, // dummy function
}

const CategoryContext = createContext<CategoryContextType>(defaultContext)

interface CategoryProviderProps {
  children: React.ReactNode
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [navigation, setNavigation] = useState<Navigation>({
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
