import React from 'react';
import Publisher from './Publisher.jsx';
import Navbar from './Navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div><Navbar /> </div>
        <div className='publisher'><Publisher /></div>
      </div>
    )
  }
}

module.exports = App;