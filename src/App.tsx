import wordleLogo from './assets/Wordle-logo.svg'
import { useState } from 'react'
import './App.css'
import randomWords from 'random-words'
import { WordleGrid } from './components/WordleGrid/WordleGrid'
import Toggle from './components/Toggle/Toggle'
import Header from './components/Header/Header'
import { WordleProvider } from './context/WordleContext'

export function darkState() {
	if (!sessionStorage.getItem('darkMode'))
		return window.matchMedia('(prefers-color-scheme: dark)').matches
	return sessionStorage.getItem('darkMode') === 'true'
}

function App() {
	const [isDarkMode, setIsDarkMode] = useState(darkState())

	return (
		<WordleProvider>
			<section className={`theme ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
				<nav className='navbar'>
					<img src={wordleLogo} alt='wordle logo' className='wordleLogo' />
					<Toggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
				</nav>
				<Header />
				<WordleGrid />
			</section>
		</WordleProvider>
	)
}

export default App
