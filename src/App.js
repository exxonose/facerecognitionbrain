import { Component } from 'react';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// const particlesOptions = {
//     particles: {
//       links: {
//         color: "#ffffff",
//         distance: 150,
//         enable: true,
//         opacity: 0.5,
//         width: 1,
//       },
     
//       move: {
//         direction: "none",
//         enable: true,
//         outMode: "bounce",
//         random: false,
//         speed: 6,
//         straight: false,
//       },
//       number: {
//         density: {
//           enable: true,
//           value_area: 800,
//         },
//         value: 80,
//       }, collisions: {
//         enable: true,
//       },
     
     
//     },
//     detectRetina: true,
//   }

//   const particlesInit = (main) => {

//     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
//   };

//   const particlesLoaded = (container) => {
//   }; 

  const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
  }
  class App extends Component {
    constructor() {
      super();
      this.state = initialState;
    }

    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    
      }})
    }

    calculateFaceLocation = (data) => 
    {const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    }

    displayFaceBox = (box) => {
      this.setState({box: box});
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }
  
    onImageSubmit = () => {
      this.setState({imageUrl: this.state.input});
      fetch('https://radiant-citadel-19971.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      }) 
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('https://radiant-citadel-19971.herokuapp.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        }) .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
        .catch(err => console.log(err));
    }


      onRouteChange = (route) => {
        if (route === 'signout'){
          this.setState(initialState)
        }
        else if(route === 'home'){
          this.setState({isSignedIn: true})
          }
        this.setState({route: route});
      }

    render() {
      const {isSignedIn, imageUrl, route, box} = this.state;
      return (
        <div className="App">
          <ParticlesBg type="tadpole" bg={true} />

          <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
          {route === 'home'
          ? <div><Logo />

          <Rank name = {this.state.user.name} 
          entries = {this.state.user.entries}/>

          <ImageLinkForm  onInputChange = {this.onInputChange} 
          onImageSubmit = {this.onImageSubmit}/>
          
          <FaceRecognition box = {box} imageUrl={imageUrl} />
         </div>
         : (
          route === 'signin'
          ?<SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
         ) 
         }
         </div>
      );
    }
    
  }


export default App;
