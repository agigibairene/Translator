import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Translator from './component/Translator.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/translator",
    element: <Translator />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
