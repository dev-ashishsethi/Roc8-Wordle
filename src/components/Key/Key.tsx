import React from 'react'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Key.css'
interface KeyProps {
	keys: string
	bigKey?: boolean
	disabled?: boolean
}

function Key({ keys, bigKey, disabled }: KeyProps) {
	const { onLetterSelect, onDelete, onEnter } = useWordle() as WordleContextType

	function keyHandler() {
		if (!disabled) {
			if (keys === 'ENTER') {
				onEnter()
			} else if (keys === 'DELETE') {
				onDelete()
			} else {
				onLetterSelect(keys)
			}
		}
	}

	return (
		<section
			className={'key'}
			id={bigKey ? 'big' : disabled ? 'disabled' : ''}
			onClick={keyHandler}>
			{keys}
		</section>
	)
}

export default Key
