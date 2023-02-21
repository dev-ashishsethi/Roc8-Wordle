import { useEffect } from 'react'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Letter.css'

interface LetterType {
	attemptVal: number
	letterPos: number
}
function Letter({ attemptVal, letterPos }: LetterType) {
	const { board, setBoard, currAttempt, correctWord } =
		useWordle() as WordleContextType
	const letter = board[letterPos][attemptVal]

	const correct = correctWord[letterPos] === letter
	const wrongPosition =
		!correct && letter !== '' && correctWord.includes(letter)
	console.log('currAttempt.attempt', currAttempt.attempt)

	const letterStatus =
		currAttempt.attempt > attemptVal &&
		(correct ? 'correct' : wrongPosition ? 'wrongPos' : 'error')

	return (
		<section className='letter-box' id={letterStatus || ''}>
			{letter}
		</section>
	)
}

export default Letter
