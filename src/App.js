import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f0596772afcd44ecbb5e22d71f6c9fbf'
 });

const particlesOptions = {
    particles: {
     number: {
       value: 80,
       density: {
         enable: true,
         value_area: 800
       }
     }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(function(response) {
      console.log(response.outputs[0].data.regions[0].region_info);
    },
    function(err) {
      // there was an error
    }
  );
  
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageURL={this.state.imageURL}/> 
      </div>
    );
  }
}

export default App;
