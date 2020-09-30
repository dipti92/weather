import React from 'react'

const Weather = (props)=>{
    return(
        <div className="container">
            <div className="text-center">
            <div className="cards">
                <h1>{props.city}</h1>
                
                <h5 className="py-4">
                    <i className={`wi ${props.icon} display-1`}/>
                </h5>
                
                {props.temp ? ( <h1 className="py-2">{props.temp}&deg;</h1>):null}

                {minmax(props.mint,props.maxt)}
                <h3>{props.desc}</h3>
            </div>
            </div>
        </div>

    );
}

function minmax(min,max){
  if(min && max){
        
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
  );
  }
}

export default Weather;