import { Select} from 'antd';
import { useState, useCallback } from "react";
import APIHeader from "../components/APIHeader";
import APIMenu from "../components/APIMenu";

// Import static menu list
import menuList from '../constant/menu';

const _signContent = import.meta.env.VITE_API_CONTENT
const _signSignature = import.meta.env.VITE_API_SIGNATURE


function Index() {
  // Currently selected API item from the menu
  const [parameter, setParameter] = useState(menuList[0]);
  // API result to be displayed
  const [result,setResult] = useState("")
  // Whether the sidebar menu is open
  const [isOpen,setIsopen] = useState(false)
  // Form input values for each field
  const [inputs, setInputs] = useState<string[]>(menuList[0].list.map((item) => item.value));

  const [signContent,setSignContent] = useState(_signContent)
  const [signSignature,setSignature] = useState(_signSignature)

  /**
   * Handles switching the left-side API menu
   */
  const changeNav = useCallback((item:any)=>{
      setParameter(item);
      setInputs(item.list.map((iitem:any) => iitem.value));
      setSignContent(_signContent);
      setSignature(_signSignature)
      setIsopen(false)
      setResult("")
  },[])

  /**
   * Toggle the menu open/closed state
   */
  const toggleMenu = useCallback(()=>{ 
     setIsopen((isOpen) => !isOpen)   
  },[])
  
  /**
   * Handle input (textarea or text) changes for fields
   */
  const handleInputChange = (index: number,e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newInputs = [...inputs];
      newInputs[index] = e.target.value;
      setInputs(newInputs);
  };

  const handleInputSign = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,item:any) =>{
    if(item.label==="signature"){
      setSignature(e.target.value)
    }else if(item.label==="content"){
      setSignContent(e.target.value)
    }
    
  }

  /**
   * Handle value change for select-type fields
   */
  const handleSelectChang = (index: number,e: string) => {     
      const newInputs = [...inputs];
      newInputs[index] = e
      setInputs(newInputs);

  }

  /**
   * Handle form submission — build the param object and call `sendMessageToParent`
   */
  const handleSubmit = async () => {
   const param: { [key: string]: string[] | string | number | boolean } = {};
    for(let i =0;i<parameter.list.length;i++){
        const temp = parameter.list[i]
        if(inputs[i]!=""){
          if(parameter.name==='connectCocoPay'){
            // Special handling for connectCocoPay — split input by comma
            param[temp.label]= inputs[i].split(",")
            // Special handling for sendServiceMessage — parse JSON if content
          }else if(parameter.name === "sendServiceMessage"){
              if(temp.label==="content"){
                try{
                  param[temp.label] = JSON.parse(inputs[i])
                }catch(e){
                   param[temp.label] = inputs[i]
                }
                
              }else{
                 param[temp.label] = inputs[i]
              }
          } else if(parameter.name==="openURL"){
              if(temp.label==="useSystemOpen"){
                  if(inputs[i]!==""){
                     if(inputs[i] === "true" || inputs[i] === "false") {
                        param[temp.label] = inputs[i] === "true"
                     }else{
                        param[temp.label]  = inputs[i]
                     }
                  }
                 
              }else{
                 param[temp.label] = inputs[i]
              }
          }else if(parameter.name==="getAccount"){
            param[temp.label] = inputs[i].toString()
          }
          else{
            // General handling
            param[temp.label] = temp.type=="Int" ? Number(inputs[i]) : inputs[i]
          }
        }
        
    }
  
    // Send the message using the window.
    const method = parameter.name
    const sign ={
        content:signContent,
        signature:signSignature
    }
    if(method==="getLanguage" || method==="getSafeAreaInsets" || method==="scanQRCode" || method==="getExtendedData"){
      try{
         const result = await  window.messageHandler[method]();
         setResult(formatJson(result))
      }catch(error){
        setResult(formatJson(error))
      }

  
    }else if(method==="checkServiceStatus"){
      try{
        const result = await  window.messageHandler[method](sign);
        setResult(formatJson(result))
      }catch(error){
        setResult(formatJson(error))
      }
       
    }else if(method==="registerService" || method==="sendServiceMessage"){
      try{
         const result = await  window.messageHandler[method](param,sign);
         setResult(formatJson(result))
      }catch(error){
         setResult(formatJson(error))
      }
    }else{
      try{
         const result = await  window.messageHandler[method](param);
         setResult(formatJson(result))
      }catch(error){
         setResult(formatJson(error))
      }
    }
         
  };
  /**
   * Format response JSON into a nicely indented string with <br> for display
   */
  const formatJson = (obj: any) => {
      return JSON.stringify(obj, null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/\\n/g, '<br/>');
  };
  /**
   * Handle file input (image/video) and convert to base64
   */


  return (
    <div className="page-content">
      {
        isOpen ?
         <div className={isOpen ? 'over active':'over'} onClick={ ()=> setIsopen(false)}></div>
        : ""
      }
      <APIHeader toggleMenu={toggleMenu}/>
      <div className="page-main">
        <APIMenu menuList={menuList} changeNav={changeNav} isOpen={isOpen} toggleMenu={toggleMenu}/>
        <div className="form-box">
        {parameter.list?.length ? (
          <div className="d-title" style={{"marginTop":"0px"}}>payload</div>):null}
          {parameter.list.map((item, index) => (
            
            <div className="form-col" key={index}>
              
              <div className="d-label">{item.required ? <span>*</span>:""}{item.label}</div>

             {item.element && item.element === 'select' ? (
              <div className="select-box">
                <Select
                  value={inputs[index] || ""}
                  style={{ width: '100%' }}
                  onChange={(e) => handleSelectChang(index, e)}
                  options={item.options || []}
                  className = {'common-select'}
                />
              </div>
            ) : (
              <div className="input-box">
                <textarea
                  className="display-flex"
                  value={inputs[index] || ""}
                  onChange={(e) => handleInputChange(index, e) }
                  rows={item.label==="content" ||item.label==="serviceKey" || item.label==="image" || item.label==="video" || item.label==="signature" ? 4 :1}
                />
              </div>
            )}
              
            </div>
          ))}

          
          {parameter.signList?.length ? (
            <>
              <div className="d-title">sign</div>
              {parameter.signList?.map((item,index)=>(
                  <div className="form-col" key={index}>
                    <div className="d-label">{item.required ? <span>*</span>:""}{item.label}</div>
                    
                    <div className="input-box">
                      
                      <textarea
                        className="display-flex"
                        value={item.label==='content' ? signContent: item.label==="signature" ? signSignature : ""}
                        onChange={(e) => handleInputSign(e,item) }
                        rows={item.label==="content" || item.label==="signature" ? 3 :1}
                      />
                    </div>
                  </div>
              ))}
            </>
          ) : null}


          <div className="btn-box">
            <button className="btn-default" onClick={handleSubmit}>Confirm</button>
          </div>
          {result.length>0 ? 
          <div className="resultBox">
                <div className="d-label api-label1">Return</div>
                <div className="d-result">
                    <pre dangerouslySetInnerHTML={{ 
                        __html: result
                    }} />
                </div>
            </div> 
          :""}
        </div>

      </div>
    </div>
  );
}

export default Index;
