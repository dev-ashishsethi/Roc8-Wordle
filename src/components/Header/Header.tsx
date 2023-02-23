import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import clock from '../../assets/clock.svg'
import scoreImg from '../../assets/score.svg'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Header.css'
function Header() {
	const [isShow, setIsShow] = useState(false)
	function handleShowMore() {
		setIsShow((isShow) => !isShow)
	}
	const { meaning, score, isWon, setIsLost } = useWordle() as WordleContextType
	const [timer, setTimer] = useState(60)

	useEffect(() => {
		let intervalId = setInterval(() => {
			setTimer((time) => (time > 0 ? time - 1 : 0))
		}, 1000)
		if (isWon) {
			clearInterval(intervalId)
		}
		if (timer === 0) {
			setIsLost(true)
			toast.error('TIME OUT!!')
		}
		return () => clearInterval(intervalId)
	}, [timer])
	return (
		<section className='header-container'>
			<section className='header-subcontainer'>
				<section className='time-score-section'>
					<img src={clock} alt='' />
					<section className='time-section'>
						<p>Time</p>
						<p className='time'>
							{timer / 60 > 0
								? `${Math.floor(timer / 60)}:${
										timer % 60 === 0 ? '00' : timer % 60
								  }`
								: timer}
						</p>
					</section>
					<span className='pipe'>|</span>
					<img src={scoreImg} alt='' />
					<section className='score-section'>
						<p>Score</p>
						<p className='time'>{score}</p>
					</section>
				</section>
				<section className='hint-container'>
					<section className='hint-section'>
						<span className={`hint ${isShow ? 'show' : ''}`}>
							Hint: {meaning}
						</span>
					</section>
					<span className='show-more' onClick={handleShowMore}>
						{isShow ? '\u2B9D' : '\u2B9F'}
					</span>
				</section>
			</section>
		</section>
	)
}

export default Header
