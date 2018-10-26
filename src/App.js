import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Header from './components/Header/Header';
import './App.css';
const clarKey = require('./clarifaiKey');

const app = new Clarifai.App({
  apiKey: clarKey.key
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      show: 'none',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width + " " + height);
    var array = [];
    for( var i = 0; i < data.outputs[0].data.regions.length; i++){
      var clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      array.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)     
      });
    }
    return array;
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input,show: 'block'});
    //console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={{particlesOptions}}
        />
        <div>
          <Header />
          <Logo />
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} show={this.state.show}/>
        </div>
      </div>
    );
  }
}

export default App;
