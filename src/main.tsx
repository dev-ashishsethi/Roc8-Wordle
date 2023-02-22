import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WordleProvider } from './context/WordleContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<WordleProvider>
			<App />
		</WordleProvider>
	</React.StrictMode>,
)
