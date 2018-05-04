const React = require('react');
import Publisher from './Publisher.jsx';
import Navbar from './Navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div><Navbar /> </div>
        <div className='plublisher' style={{marginTop: 120}}><Publisher /></div>
      </div>
    )
  }
}

module.exports = App;