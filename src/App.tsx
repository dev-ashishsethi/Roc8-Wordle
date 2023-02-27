import wordleLogo from './assets/Wordle-logo.svg'
import { useState } from 'react'
import './App.css'
import { WordleGrid } from './components/WordleGrid/WordleGrid'
import Toggle from './components/Toggle/Toggle'
import Header from './components/Header/Header'
import Keyboard from './components/Keyboard/Keyboard'
import { Toaster } from 'react-hot-toast'
import { useWordle, WordleContextType } from './context/WordleContext'
import Rules from './components/PopUp/Rules'
import WinLosePopUp from './components/WinLosePopUp/WinLosePopUp'

export function darkState() {
	if (!sessionStorage.getItem('darkMode'))
		return window.matchMedia('(prefers-color-scheme: dark)').matches
	return sessionStorage.getItem('darkMode') === 'true'
}

function App() {
	const { isLost, correctWord, isDarkMode, isTimeOut, setIsDarkMode } =
		useWordle() as WordleContextType
	console.log('islost', isLost)
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
			<Rules />
			{isTimeOut && <WinLosePopUp />}
			{isLost && <WinLosePopUp />}
			<Keyboard />
		</section>
	)
}

export default App
