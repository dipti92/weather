import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Weather from './components/wea';
import "./weather-icons-master/css/weather-icons.min.css"
import Form from './components/form';
import '../src/App.css'

const key = "3ce91d62d5805c2770ce67d2a49f0817 "


class App extends React.Component{

  cal(temp){
    let cell = Math.floor(temp-273.15);
    return cell;
  }

  constructor(){
    super();
    this.state={
      city : "",
      country:"",
      mint:"",
      maxt:"",
      temp:"",
      desc:'',
      icon:'',
      err:false
    };
   
    this.weathericon ={
      Thunderstrom:"wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
 }

 get_WeatherIcon(icons, rangeId) {
  switch (true) {
    case rangeId >= 200 && rangeId < 232:
      this.setState({ icon:this.weathericon.Thunderstorm });
      break;
    case rangeId >= 300 && rangeId <= 321:
      this.setState({ icon: this.weathericon.Drizzle });
      break;
    case rangeId >= 500 && rangeId <= 521:
      this.setState({ icon:this.weathericon.Rain });
      break;
    case rangeId >= 600 && rangeId <= 622:
      this.setState({ icon:this.weathericon.Snow });
      break;
    case rangeId >= 701 && rangeId <= 781:
      this.setState({ icon: this.weathericon.Atmosphere });
      break;
    case rangeId === 800:
      this.setState({ icon: this.weathericon.Clear });
      break;
    case rangeId >= 801 && rangeId <= 804:
      this.setState({ icon: this.weathericon.Clouds });
      break;
    default:
      this.setState({ icon: this.weathericon.Clouds });
  }
}

  getweather = async(e)=>{
    e.preventDefault();
    const city =e.target.elements.city.value;
    const country =e.target.elements.country.value;
     
     if(city && country){
      const apicall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`
      );
    
      const response = await apicall.json();
      console.log(response);
      this.setState({
        city: `${response.name},${response.sys.country}`,
         mint:this.cal(response.main.temp_min),
        maxt:this.cal(response.main.temp_max),
        desc:response.weather[0].description,
        temp:this.cal(response.main.temp),
        err:false
     })
  
     this.get_WeatherIcon(this.getweather,response.weather[0].id);
     }

     else{
      this.setState({err:true})
     }
 }

  render(){
    return(
       <div>
         <Form loadweather={this.getweather} err={this.state.err}/>
        
    
         <Weather
         city ={this.state.city}
         country={this.state.country}
         mint={this.state.mint}
         maxt={this.state.maxt}
         desc={this.state.desc}
         temp={this.state.temp}
         icon={this.state.icon}
         />
       
   
       </div>
    );
  }
}

export default App;
