import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/bootstrap.css' // Bootstrap must load first so page-level CSS (main.css/design-system.css) can override it
import App from './app.jsx'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
