const React = require('react');
import Publisher from './Publisher.jsx';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Publisher />
      </div>
    )
  }
}

module.exports = App;