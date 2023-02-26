import { useLayoutEffect, useRef, useState } from 'react'
import sampleWordle from '../../assets/sampleWordle.png'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './PopUp.css'
function PopUp() {
	const dialog = useRef(null)
	const { isDarkMode } = useWordle() as WordleContextType
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
					<img src={sampleWordle} alt='Example image' />
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
					<h4>Color</h4>
					<p>
						The color of the titles will change to show how close your guess was
						to the word
					</p>
					<p>
						<strong>Examples</strong>
					</p>
					<img src={sampleWordle} alt='Example image' />
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
			</section>
			<section className='btn-section'>
				<button className='play-btn' onClick={() => dialog.current.close()}>
					PLAY!
				</button>
			</section>
		</dialog>
	)
}

export default PopUp
