
import React, { useState } from "react"

import logo from '../assets/logo.png';
import logoTitle from '../assets/logo_title.png';
import cancelIcon from '../assets/cancel.png';


// Define the structure of a menu item
interface menuItem{
  name:string,
  list: { label: string; value: string; type: string,element?:string}[],

}
// Define the props expected by the APIMenu component
interface Props{
  menuList:menuItem[],
  changeNav:(item:menuItem)=> void,
  isOpen:boolean
  toggleMenu:(param?:boolean)=>void
}
// Memoized functional component for menu sidebar
const APIMenu: React.FC<Props> = React.memo(({ menuList, changeNav,isOpen,toggleMenu }) => {

   const style ={ 
      background:"#ffffff",
      width:"100%",
      paddingTop:window.safeAreaTop+20+"px"


  }
  // Style for bottom padding of the close button (considering device safe area)
  const menuBottomStyle = {
      paddingBottom:window.safeAreaBottom+18+"px"
  }
  // Current active menu index (default is 0)
  const [curIndex,setCurIndex] = useState(0)
  
  /**
   * Handles clicking on a menu item.
   * Updates the active index and triggers the parent handler to change content.
   */
  function pageJump(index:number,item:menuItem){
    setCurIndex(index)
    changeNav(item)  
  }

 

  return (
    <div className={`menu-sidebar ${isOpen ? "active" : ""}`}>
      
      <div className="api-header display-flex flex-zbetween mobile-menu-header" style={style}>
         <div className='image-box'>
            <img className="logo logo1" src={logo}/>
            <img className='logoTitle' src={ logoTitle } />
         </div>
  
      </div>
      <ul>
        {menuList.map((item, index) => (
          <li key={index} className={`pointer ${Number(curIndex)===index ? "active" : ""}`} onClick={() => pageJump(index,item)}>
            {item.name}
          </li>
        ))}
      </ul>
      <div className="menu-close" style={menuBottomStyle}>
         <div className="display-flex flex-cCenter flex-zCenter pointer" onClick={()=> toggleMenu()} > <img src={cancelIcon} /></div>
      </div>
    </div>
  );
});

// Export the component for use in other files
export default APIMenu;