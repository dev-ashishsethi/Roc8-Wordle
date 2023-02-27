import React, { useLayoutEffect, useRef, useState } from 'react'
import sampleWordle from '../../assets/sampleWordle.png'
import sample from '../../assets/sample.png'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Rules.css'
import { boardDefault } from '../../board'
function PopUp() {
	const dialog = useRef<HTMLDialogElement>(null)
	const { isDarkMode, setIsStart } = useWordle() as WordleContextType

	function handlePlay() {
		dialog.current !== null && dialog.current.close()
		setIsStart(true)
	}

	useLayoutEffect(() => {
		if (dialog.current !== null) {
			dialog.current.removeAttribute('open')
			dialog.current.showModal()
		}
	}, [])

	return (
		<dialog
			ref={dialog}
			className={`popup ${
				isDarkMode ? 'dark-theme dark-popup' : 'light-theme light-popup'
			}`}>
			<h1 className='popup-title'>Welcome to Wordle!</h1>
			<h3>How to play?</h3>
			<p>
				Guess the 5 letter word in <strong>5 times</strong>
			</p>

			<section className='popup-grid'>
				<section
					className={`color-section ${
						isDarkMode ? 'light-line' : 'dark-line'
					}`}>
					<h4>Color</h4>
					<p>
						The color of the titles will change to show how close your guess was
						to the word
					</p>
					<p>
						<strong>Examples</strong>
					</p>
					<img
						src={sampleWordle}
						alt='Example image'
						className='example-image'
					/>
					<ul>
						<li>
							<strong>Green</strong> color signifies the word in correct spot
						</li>
						<li>
							<strong>Yellow color</strong> signifies the word in wrong spot
						</li>
						<li>
							<strong>Dark gray</strong> signifies the word should not use
						</li>
					</ul>
				</section>
				<section>
					<h4>Score</h4>
					<p>Every retake will affect your score by 2</p>
					<p>
						<strong>Examples</strong>
					</p>
					<img
						src={sampleWordle}
						alt='Example image'
						className='example-image'
					/>
					<img src={sample} alt='Example image' className='example-image' />
					<p>Your score: 8</p>
				</section>
			</section>
			<section className='btn-section'>
				<button className='play-btn' onClick={handlePlay}>
					PLAY!
				</button>
			</section>
		</dialog>
	)
}

export default PopUp
