import axios from 'axios'
import { useEffect, useState } from 'react'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Letter.css'

interface LetterType {
	attemptVal: number
	letterPos: number
}
function Letter({ attemptVal, letterPos }: LetterType) {
	const { board, currAttempt, correctWord, setDisabledLetters } =
		useWordle() as WordleContextType
	const letter = board[letterPos][attemptVal]
	const correct = correctWord[letterPos] === letter

	const wrongPosition =
		!correct && letter !== '' && correctWord.includes(letter)

	const letterStatus =
		currAttempt.attempt > attemptVal &&
		(correct ? 'correct' : wrongPosition ? 'wrongPos' : 'error')

	useEffect(() => {
		if (letter !== '' && !correct && !wrongPosition) {
			setDisabledLetters((disabledLetters) => [...disabledLetters, letter])
		}
	}, [currAttempt.attempt])
	return (
		<section className='letter-box' id={letterStatus || ''}>
			{letter}
		</section>
	)
}

export default Letter
