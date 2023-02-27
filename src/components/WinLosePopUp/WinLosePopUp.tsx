import { useLayoutEffect, useRef } from 'react'
import { boardDefault } from '../../board'
import { useWordle, WordleContextType } from '../../context/WordleContext'

function WinLosePopUp() {
	const dialog = useRef<HTMLDialogElement>(null)
	const btnRef = useRef<HTMLButtonElement>(null)
	const {
		isDarkMode,
		setIsTimeOut,
		isLost,
		isTimeOut,
		setIsStart,
		setBoard,
		setIsLost,
		correctWord,
		setDisabledLetters,
		setIsReset,
		setCurrAttempt,
	} = useWordle() as WordleContextType

	function handlePlay() {
		dialog.current !== null && dialog.current.close()
		setIsStart(true)
		setIsTimeOut(false)
		const newBoard = [...boardDefault]
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				console.log('here board reset')
				newBoard[i][j] = ''
			}
		}
		setBoard(newBoard)
		setCurrAttempt({ attempt: 0, letterAttempt: 0 })
		setDisabledLetters([''])
		setIsReset(true)
		setIsLost(false)
	}

	useLayoutEffect(() => {
		if (dialog.current !== null && btnRef.current !== null) {
			dialog.current.removeAttribute('open')
			console.log('lost modal open')
			dialog.current.showModal()
			btnRef.current.blur()
		}
	}, [isLost])
	return (
		<dialog
			ref={dialog}
			className={`popup ${
				isDarkMode ? 'dark-theme dark-popup' : 'light-theme light-popup'
			}`}>
			<h1 className='popup-title'>
				{isTimeOut ? `TIME OUT!!` : isLost ? 'YOU LOSE!' : 'YOU WIN!'}
			</h1>
			<h3>
				Correct Answer is:{' '}
				<strong className='correct-word'>{correctWord}</strong>
			</h3>

			<section className='btn-section'>
				<button ref={btnRef} className='play-btn' onClick={handlePlay}>
					PLAY AGAIN
				</button>
			</section>
		</dialog>
	)
}

export default WinLosePopUp
