import React, { useState } from 'react'
import clock from '../../assets/clock.svg'
import score from '../../assets/score.svg'
import './Header.css'
function Header() {
	const [isShow, setIsShow] = useState(false)
	function handleShowMore() {
		setIsShow((isShow) => !isShow)
	}
	return (
		<section className='header-container'>
			<section className='header-subcontainer'>
				<section className='time-score-section'>
					<img src={clock} alt='' />
					<section className='time-section'>
						<p>Time</p>
						<p className='time'>1:00</p>
					</section>
					<span className='pipe'>|</span>
					<img src={score} alt='' />
					<section className='score-section'>
						<p>Score</p>
						<p className='time'>20</p>
					</section>
				</section>
				<section className='hint-container'>
					<section className='hint-section'>
						<span className={`hint ${isShow ? 'show' : ''}`}>
							Hint: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Voluptates, vel. asbbaslkc akscjb aksca cbjksbcakc kabkckas xc
							kjasbicbkam cma skcb
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
