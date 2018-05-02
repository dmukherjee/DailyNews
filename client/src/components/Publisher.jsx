const React = require('react');
const Proptypes = require('prop-types');
const api = require('../../../helpers/api.js');
import { Input, Label, Menu } from 'semantic-ui-react'

function SelectPublisher(props) {
  const publishers = ['Breaking News', 'ARS', 'BBC News', 'CNBC', 'CNN', 'ESPN', 'IGN', 'NY Times', 'Polygon', 'Reuters', 'The Verge', 'WSJ'];
  return (
    <Menu vertical className='publishers'>
      {/* <p>Selected source: {this.state.selectedSource}</p> */}
      {publishers.map(source => {
        return (
          <Menu.Item 
            style={source === props.selectedPublisher ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, source)}
            key={source}>
            {source}
          </Menu.Item>
        )
      })} 
    </Menu>
  )
}

SelectPublisher.prototypes = {
  selectedPublisher: Proptypes.string.isRequired,
  onSelect: Proptypes.func.isRequired
}

class Publisher extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedPublisher: 'Breaking News',
      news: null
    };
    
    this.updatePublisher = this.updatePublisher.bind(this);
  }

  componentDidMount () {
    this.updatePublisher(this.state.selectedPublisher);
  }

  updatePublisher(source) {
    this.setState(() => {
      return {
        selectedPublisher: source,
        news: null
      }
    });
    api.getTopStories(source)
      .then(function(news) {
        this.setState(function() {
          return {
            news: news
          }
        })
    }.bind(this));
  } 
  render() {
    return (
      <div>
        <SelectPublisher
          selectedPublisher = {this.state.selectedPublisher}
          onSelect={this.updatePublisher}
        />
        {JSON.stringify(this.state.news, null, 2)}
      </div>
    )
  }
}

module.exports = Publisher;