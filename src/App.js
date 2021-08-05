import React from "react";
import './App.css';

function App() {
  const [value, setValue] = React.useState("0");
  const fieldRef = React.useRef();
  const numbers = ["0","1","2","3","4","5","6","7","8","9", "+", "-", "/", "*"];
  const operations = ["=", "C", "AC"];

  const clickedNumberHandler = (smth) => {
    let currentVal = smth;
    let input = fieldRef.current;
    
    setValue(currentVal);

    if(input.value === "0"){
      input.value = currentVal;
    }else {
      input.value += currentVal;
    }
  }

  const clickedOperationHandler = (operation) => {
    let input = fieldRef.current;
    switch(operation){
      case "C":  return input.value = "0";
      case "AC": {
        if(input.value.length === 1){
          return input.value = 0
        }
        return input.value = input.value.substr(0, input.value.length - 1);
      }
      case "=": {
          try{
            return input.value = eval(input.value);   //eslint-disable-next-line
          }catch(e){
            input.value = "Недопустимое значение"
            setTimeout(() => {
              input.value = 0
            }, 1200)
          }
        }
      default: return  
    }
  }
  
  return (
    <div className="wrapper">
      <div className="calc">
        <input 
          className="calc__field"
          defaultValue={value}
          ref={fieldRef}
        />
        <div className="calc__row">
          {numbers.map((number, index) => (
            <button key={number + index} onClick={() => clickedNumberHandler(number)}>{number}</button>
          ))}
          {operations.map((operation, index) => (<button key={operation + index} onClick={() => clickedOperationHandler(operation)}>{operation}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
