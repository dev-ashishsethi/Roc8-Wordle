import { useCallback, useEffect } from 'react'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import Key from '../Key/Key'
import './Keyboard.css'

function Keyboard() {
	const firstLineOfKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
	const secondLineOfKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
	const thirdLineOfKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

	const { onLetterSelect, onDelete, onEnter, currAttempt, disabledLetters } =
		useWordle() as WordleContextType
	const handleKeyboard = useCallback(
		(event: KeyboardEventInit) => {
			if (event.key === 'Enter') {
				onEnter()
			} else if (event.key === 'Backspace') {
				onDelete()
			} else {
				firstLineOfKeys.map((key) => {
					if (
						event.key?.toLowerCase() === key.toLowerCase() &&
						!disabledLetters.includes(key)
					) {
						onLetterSelect(key)
					}
				})
				secondLineOfKeys.map((key) => {
					if (
						event.key?.toLowerCase() === key.toLowerCase() &&
						!disabledLetters.includes(key)
					) {
						onLetterSelect(key)
					}
				})
				thirdLineOfKeys.map((key) => {
					if (
						event.key?.toLowerCase() === key.toLowerCase() &&
						!disabledLetters.includes(key)
					) {
						onLetterSelect(key)
					}
				})
			}
		},
		[currAttempt],
	)
	useEffect(() => {
		document.addEventListener('keydown', handleKeyboard)
		return () => {
			document.removeEventListener('keydown', handleKeyboard)
		}
	}, [handleKeyboard])
	return (
		<section className='keyboard-section'>
			<section className='keyboard-row'>
				{firstLineOfKeys.length > 0 &&
					firstLineOfKeys.map((keyLetter) => (
						<Key
							keys={keyLetter}
							disabled={disabledLetters.includes(keyLetter)}
						/>
					))}
			</section>
			<section className='keyboard-row'>
				{secondLineOfKeys.length > 0 &&
					secondLineOfKeys.map((keyLetter) => (
						<Key
							keys={keyLetter}
							disabled={disabledLetters.includes(keyLetter)}
						/>
					))}
			</section>
			<section className='keyboard-row'>
				<Key keys={'ENTER'} bigKey />
				{thirdLineOfKeys.length > 0 &&
					thirdLineOfKeys.map((keyLetter) => (
						<Key
							keys={keyLetter}
							disabled={disabledLetters.includes(keyLetter)}
						/>
					))}
				<Key keys={'DELETE'} bigKey />
			</section>
		</section>
	)
}

export default Keyboard
