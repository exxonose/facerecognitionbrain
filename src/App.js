import './App.css';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

const particlesOptions = {
    particles: {
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
     
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      }, collisions: {
        enable: true,
      },
     
     
    },
    detectRetina: true,
  }
function App() {

  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className="App">
        <Particles className="particles"
        
        init={particlesInit}
        loaded={particlesLoaded} 
    options={particlesOptions}
     />
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm />
     

    {/* {
     <FaceRecognition />} */}
    </div>
  );
}

export default App;
