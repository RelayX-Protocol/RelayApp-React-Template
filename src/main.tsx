import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import MessageHandler from "./utils/messageHandle";
import App from './App.tsx'
import Index from './pages/index.tsx'
import "./styles/Style.css"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import  RelayXClient   from 'relayx-api'

window.messageHandler =  new RelayXClient();

if (import.meta.env.DEV) {
  (async () => {
    const VConsole = await import('vconsole');
   new VConsole.default()

  })();
}
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<Index/> 
      },
      {
        path:"index",
        element:<Index/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
