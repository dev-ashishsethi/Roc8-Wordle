import React, { createContext, useContext, useEffect, useState } from 'react'
import { boardDefault } from '../board'
import randomWords from 'random-words'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { darkState } from '../App'
type Attempt = {
	attempt: number
	letterAttempt: number
}
export type WordleContextType = {
	board: string[][]
	setBoard: React.Dispatch<React.SetStateAction<string[][]>>
	currAttempt: Attempt
	setCurrAttempt: React.Dispatch<React.SetStateAction<Attempt>>
	isWordValid: boolean
	setIsWordValid: React.Dispatch<React.SetStateAction<boolean>>
	onLetterSelect: (keys: string) => void
	onDelete: () => void
	onEnter: () => void
	correctWord: string
	meaning: string
	currWord: string
	disabledLetters: string[]
	setDisabledLetters: React.Dispatch<React.SetStateAction<string[]>>
	score: number
	isLost: boolean
	setIsLost: React.Dispatch<React.SetStateAction<boolean>>
	isWon: boolean
	setIsWon: React.Dispatch<React.SetStateAction<boolean>>
	isDarkMode: boolean
	setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
	isStart: boolean
	setIsStart: React.Dispatch<React.SetStateAction<boolean>>
	isTimeOut: boolean
	setIsTimeOut: React.Dispatch<React.SetStateAction<boolean>>
	isReset: boolean
	setIsReset: React.Dispatch<React.SetStateAction<boolean>>
}
const WordleContext = createContext<WordleContextType | null>(null)

interface ContextProps {
	children: JSX.Element
}
export function WordleProvider({ children }: ContextProps) {
	let word = ''
	const [currWord, setCurrWord] = useState('')
	const [isStart, setIsStart] = useState(false)
	const [correctWord, setCorrectWord] = useState('')
	const [meaning, setMeaning] = useState('')
	const [isWordValid, setIsWordValid] = useState(true)
	const [disabledLetters, setDisabledLetters] = useState([''])
	const [score, setScore] = useState(0)
	const [isLost, setIsLost] = useState(false)
	const [isWon, setIsWon] = useState(false)
	const [isDarkMode, setIsDarkMode] = useState(darkState())
	const [isTimeOut, setIsTimeOut] = useState(false)
	const [isReset, setIsReset] = useState(false)
	const [board, setBoard] = useState(boardDefault)
	const [currAttempt, setCurrAttempt] = useState({
		attempt: 0,
		letterAttempt: 0,
	})

	useEffect(() => {
		while (word.length !== 5) {
			word = randomWords({ exactly: 1, maxLength: 5 })[0]
		}
		setCorrectWord(word.toUpperCase())
		;(async () => {
			const response = await axios
				.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
				.then((res) => res.data[0].meanings[0].definitions[0].definition)

			setMeaning(response)
		})()
	}, [])

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

		let currRowWord = ''
		for (let i = 0; i < 5; i++) {
			currRowWord += board[i][currAttempt.attempt]
		}
		setCurrWord(currRowWord)
		if (currRowWord === correctWord) {
			setScore(10 - currAttempt.attempt * 2)
			toast.success('You Won!')
			setIsWon(true)
		}
		if (currAttempt.attempt === 4 && correctWord !== currRowWord) {
			toast.error(`You Lost`)
			setIsLost(true)
		}
		;(async () => {
			try {
				const response = await axios
					.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${currRowWord}`)
					.then((res) => res.data.title)
				if (response === 'No Definitions Found') {
					console.log(response)
					setIsWordValid(false)
				}
			} catch (error) {
				const err: Error = error as Error
				if (err.message === 'Request failed with status code 404') {
					setIsWordValid(false)
					toast.error(`${currRowWord} is not a word!`)
				}
			}
		})()
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
				meaning,
				isWordValid,
				setIsWordValid,
				currWord,
				disabledLetters,
				setDisabledLetters,
				score,
				isLost,
				setIsLost,
				isWon,
				setIsWon,
				isDarkMode,
				setIsDarkMode,
				isStart,
				setIsStart,
				isTimeOut,
				setIsTimeOut,
				isReset,
				setIsReset,
			}}>
			{children}
		</WordleContext.Provider>
	)
}

export const useWordle = () => useContext(WordleContext)
