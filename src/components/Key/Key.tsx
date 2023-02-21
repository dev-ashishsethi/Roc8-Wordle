import React from 'react'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Key.css'
interface KeyProps {
	keys: string
	bigKey?: boolean
}

function Key({ keys, bigKey }: KeyProps) {
	const { onLetterSelect, onDelete, onEnter } = useWordle() as WordleContextType

	function keyHandler() {
		if (keys === 'ENTER') {
			onEnter()
		} else if (keys === 'DELETE') {
			onDelete()
		} else {
			onLetterSelect(keys)
		}
	}

	return (
		<section className={`key ${bigKey ? 'big' : ''}`} onClick={keyHandler}>
			{keys}
		</section>
	)
}

export default Key
