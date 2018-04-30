const React = require('react');
const Publisher = require('./Publisher');

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