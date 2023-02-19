import './Letter.css'

interface LetterType {
	attemptVal: number
	letterPos: number
}
function Letter({ attemptVal, letterPos }: LetterType) {
	return <section className='letter-box'>L</section>
}

export default Letter
