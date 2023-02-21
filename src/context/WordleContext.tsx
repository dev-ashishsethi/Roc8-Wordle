import React, { createContext, useContext, useState } from 'react'
import { boardDefault } from '../board'

type Attempt = {
	attempt: number
	letterAttempt: number
}
export type WordleContextType = {
	board: string[][]
	setBoard: React.Dispatch<React.SetStateAction<string[][]>>
	currAttempt: Attempt
	setCurrAttempt: React.Dispatch<React.SetStateAction<Attempt>>
	onLetterSelect: (keys: string) => void
	onDelete: () => void
	onEnter: () => void
	correctWord: string
}
const WordleContext = createContext<WordleContextType | null>(null)

interface ContextProps {
	children: JSX.Element
}
export function WordleProvider({ children }: ContextProps) {
	const correctWord = 'RIGHT'
	const [board, setBoard] = useState(boardDefault)
	const [currAttempt, setCurrAttempt] = useState({
		attempt: 0,
		letterAttempt: 0,
	})
	const onLetterSelect = (keys: string) => {
		if (currAttempt.letterAttempt <= 4) {
			const newBoard = [...board]
			newBoard[currAttempt.letterAttempt][currAttempt.attempt] = keys
			setBoard(newBoard)
			setCurrAttempt({
				...currAttempt,
				letterAttempt: currAttempt.letterAttempt + 1,
			})
		}
	}
	const onDelete = () => {
		if (currAttempt.letterAttempt === 0) return
		const newBoard = [...board]
		newBoard[currAttempt.letterAttempt - 1][currAttempt.attempt] = ''
		setBoard(newBoard)
		setCurrAttempt({
			...currAttempt,
			letterAttempt: currAttempt.letterAttempt - 1,
		})
	}

	const onEnter = () => {
		if (currAttempt.letterAttempt !== 5) return
		setCurrAttempt({ attempt: currAttempt.attempt + 1, letterAttempt: 0 })
	}
	return (
		<WordleContext.Provider
			value={{
				board,
				setBoard,
				currAttempt,
				setCurrAttempt,
				onLetterSelect,
				onDelete,
				onEnter,
				correctWord,
			}}>
			{children}
		</WordleContext.Provider>
	)
}

export const useWordle = () => useContext(WordleContext)
