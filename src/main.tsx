import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const manifestUrl = 'https://raw.githubusercontent.com/evilcore29/TONStepik_FE/lesson-5.2/public/manifest.json'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
