import { useState } from 'react'
import { darkState } from '../../App'
import './Toggle.css'

export type DarkMode = {
	iteration: number
	darkMode: boolean
}
interface ToggleProps {
	setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
	isDarkMode: boolean
}
function Toggle({ isDarkMode, setIsDarkMode }: ToggleProps) {
	const [isChecked, setIsChecked] = useState(darkState())

	function handleDarkMode() {
		setIsDarkMode((darkmode) => !darkmode)
		sessionStorage.setItem('darkMode', JSON.stringify(!isDarkMode))
		setIsChecked((isChecked) => !isChecked)
	}

	return (
		<label className='switch'>
			<input type='checkbox' onChange={handleDarkMode} checked={isChecked} />
			<span className='slider round'></span>
		</label>
	)
}

export default Toggle
