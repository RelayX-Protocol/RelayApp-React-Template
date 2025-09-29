
import { Outlet} from 'react-router-dom'
import { useState } from 'react';


function App() {
    // Local state to determine whether layout should be shown after safe area is set
    const [isShow,setIsShow] = useState(false)
    /**
    * Send a message to the parent window to get safe area insets
    * This is useful for adapting UI layout to devices with notches or soft keys
    */

    window.messageHandler.getSafeAreaInsets().then((res:any)=>{
        if(res.code==200){
            window.safeAreaBottom = res.result.safeAreaBottom
            window.safeAreaTop = res.result.safeAreaTop
            setIsShow(true)
        }else{
            window.safeAreaBottom = 10
            window.safeAreaTop = 10
            setIsShow(true)
        }
        
        
    })
    


  return (
    <>
      {isShow ?<Outlet/>:""}
    </>
  )
}

export default App
