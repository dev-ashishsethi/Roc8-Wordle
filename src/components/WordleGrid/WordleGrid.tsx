import Letter from '../Letter/Letter'
import './WordleGrid.css'
export const WordleGrid = () => {
	function renderLetterBox(attemptVal: number) {
		let letterBox = []
		for (let letterPos = 0; letterPos < 5; letterPos++) {
			letterBox.push(<Letter attemptVal={attemptVal} letterPos={letterPos} />)
		}
		return letterBox
	}
	function renderGrid() {
		let grid = []
		for (let attempt = 0; attempt < 5; attempt++) {
			grid.push(
				<section className='wordle-grid-row'>
					{renderLetterBox(attempt)}
				</section>,
			)
		}
		return grid
	}
	return <section className='wordle-grid'>{renderGrid()}</section>
}
