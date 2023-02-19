import React, { createContext, useContext, useState } from 'react'
const WordleContext = createContext({})

interface ContextProps {
	children: JSX.Element
}
export function WordleProvider({ children }: ContextProps) {
	const [board, setBoard] = useState('')
	return (
		<WordleContext.Provider value={{ board, setBoard }}>
			{children}
		</WordleContext.Provider>
	)
}

export const useWordle = () => useContext(WordleContext)
