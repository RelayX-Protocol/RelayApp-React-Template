import logo from '../assets/logo.png';
import logoTitle from '../assets/logo_title.png';
import React from 'react';

// Define the props interface for the APIHeader component
interface APIHeaderProps {
  toggleMenu: () => void; // Function that doesn't return anything
}

// React.memo is used to prevent unnecessary re-renders when props don’t change
const APIHeader = React.memo(({toggleMenu}:APIHeaderProps)=>{
   
    const style ={    
        background:"#ffffff",
        paddingTop:window.safeAreaTop+20+"px" // Top padding includes safe area inset for devices with notches (e.g., iOS)
    }

   return (
     <div className="api-header api-common-header" style={style}>
         <svg className='pointer icon-open-menu' viewBox="64 64 896 896" focusable="false" data-icon="menu-unfold" width="28px" height="28px" fill="#333333" aria-hidden="true" onClick={()=>{
            toggleMenu()
         }}>
            <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
        </svg>
         <div className='image-box'>
            <img className="logo" src={logo}/>
            <img className='logoTitle' src={ logoTitle } />
        </div>       
     </div>
   )
})
  

// Export the APIHeader component for use in other modules
export default APIHeader