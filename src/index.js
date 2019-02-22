import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// After Refactored
const App = () => {
  // Use userState hook, no longer need class or setState
  const [lat, setLat] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Similar to componentDidMount 
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLat(position.coords.latitude),
      err => setErrorMessage(err.message)
    );
  }, [])

  let content;
  if(errorMessage) {
    content = <div>Error: {this.state.errorMessage}</div>;
  } else if (lat) {
    content = <SeasonDisplay lat={this.state.lat} />
  } else { 
    content = <Spinner message="Please accept location request" />
  }

  return (
    <div className="border red">{content}</div>
  )
};

// Before Refactored
class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

// Kept before and after refactored
ReactDOM.render(<App />, document.querySelector('#root'));
