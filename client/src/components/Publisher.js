const React = require('react');

class Publisher extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedPublisher: 'All'
    };
    
    this.updatePublisher = this.updatePublisher.bind(this);
  }
  updatePublisher(source) {
    this.setState(() => {
      return {
        selectedPublisher: source
      }
    });
  } 
  render() {
    const publishers = ['All', 'ARS', 'BBC News', 'CNBC', 'CNN', 'ESPN', 'IGN', 'NY Times', 'Polygon', 'Reuters', 'The Verge', 'WSJ'];
    return (
      <ul className='publishers'>
        {/* <p>Selected source: {this.state.selectedSource}</p> */}
        {publishers.map(source => {
          return (
            <li 
              style={source === this.state.selectedPublisher ? {color: '#d0021b'} : null}
              onClick={this.updatePublisher.bind(null, source)}
              key={source}>
              {source}
            </li>
          )
        })} 
        {/* need to pass in 'this' in line above if using es5 functions */}
      </ul>
    )
  }
}

module.exports = Publisher;