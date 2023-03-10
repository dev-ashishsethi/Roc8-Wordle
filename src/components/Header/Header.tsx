import { useEffect, useState } from 'react'
import clock from '../../assets/clock.svg'
import scoreImg from '../../assets/score.svg'
import { useWordle, WordleContextType } from '../../context/WordleContext'
import './Header.css'
import downArrowLight from '../../assets/downArrowLight.svg'
import upArrowLight from '../../assets/upArrowLight.svg'
function Header() {
	const [isShow, setIsShow] = useState(false)
	function handleShowMore() {
		setIsShow((isShow) => !isShow)
	}
	const {
		meaning,
		score,
		isLost,
		isWon,
		setScore,
		setIsTimeOut,
		isTimeOut,
		setIsReset,
		isStart,
		isReset,
	} = useWordle() as WordleContextType
	const initialTime = 60
	const [timer, setTimer] = useState(initialTime)

	useEffect(() => {
		if (isTimeOut) setTimer(initialTime)

		if (isReset) {
			setTimer(initialTime)
			setIsReset(false)
		}

		if (isWon) setTimer(initialTime)

		if (isStart) {
			let intervalId = setInterval(
				() => setTimer((time) => (time > 0 ? time - 1 : 0)),
				1000,
			)

			if (isLost) clearInterval(intervalId)
			if (timer === 0) setIsTimeOut(true)

			return () => clearInterval(intervalId)
		}
	}, [timer, isTimeOut, isReset, isStart])
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
						{isShow ? (
							<img src={upArrowLight} alt='up arrow' className='expand-arrow' />
						) : (
							<img
								src={downArrowLight}
								alt='down arrow'
								className='expand-arrow'
							/>
						)}
					</span>
				</section>
			</section>
		</section>
	)
}

export default Header
