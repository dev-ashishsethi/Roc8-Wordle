import wordleLogo from './assets/Wordle-logo.svg'
import { useState } from 'react'
import './App.css'
import { WordleGrid } from './components/WordleGrid/WordleGrid'
import Toggle from './components/Toggle/Toggle'
import Header from './components/Header/Header'
import Keyboard from './components/Keyboard/Keyboard'
import { Toaster } from 'react-hot-toast'
import { useWordle, WordleContextType } from './context/WordleContext'
import PopUp from './components/PopUp/PopUp'

export function darkState() {
	if (!sessionStorage.getItem('darkMode'))
		return window.matchMedia('(prefers-color-scheme: dark)').matches
	return sessionStorage.getItem('darkMode') === 'true'
}

function App() {
	// const [isDarkMode, setIsDarkMode] = useState(darkState())
	const { isLost, correctWord, isDarkMode, setIsDarkMode } =
		useWordle() as WordleContextType
	return (
		<section className={`theme ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
			<nav className='navbar'>
				<img src={wordleLogo} alt='wordle logo' className='wordleLogo' />
				<Toggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
			</nav>
			<Toaster
				position='top-center'
				reverseOrder={false}
				gutter={8}
				containerClassName=''
				containerStyle={{}}
			/>
			<Header />
			<WordleGrid />
			<PopUp />
			{isLost ? `Correct Word is ${correctWord}` : <Keyboard />}
		</section>
	)
}

export default App
