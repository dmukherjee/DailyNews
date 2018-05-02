const React = require('react');
const Proptypes = require('prop-types');
const api = require('../../../helpers/api.js');
import { Input, Label, Menu, Container } from 'semantic-ui-react'

const publishers = ['Breaking News', 'ars-technica', 'bbc-news', 'cnbc', 'cnn', 'espn', 'ign', 
  'the-new-york-times', 'polygon', 'reuters', 'the-verge', 'the-wall-street-journal'];
const displayNames = {
  'Breaking News': 'Breaking News',
  'ars-technica': 'ARS',
  'bbc-news': 'BBC News',
  'cnbc': 'CNBC',
  'cnn': 'CNN', 
  'espn': 'ESPN', 
  'ign': 'IGN',
  'the-new-york-times': 'NY Times', 
  'polygon': 'Polygon', 
  'reuters': 'Reuters', 
  'the-verge': 'The Verge', 
  'the-wall-street-journal': 'WSJ'
}

function SelectPublisher(props) {
  return (
    <Menu vertical className='publishers'>
      {/* <p>Selected source: {this.state.selectedSource}</p> */}
      {publishers.map(source => {
        return (
          <Menu.Item 
            style={source === props.selectedPublisher ? {color: '#d0021b', 'font-weight': 'bold'} : null}
            onClick={props.onSelect.bind(null, source)}
            key={source}>
            {displayNames[source]}
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
    if (source === 'Breaking News') {
      api.getTopStories(source)
        .then(function(news) {
          this.setState(function() {
            return {
              news: news
            }
        })
      }.bind(this));
    } else {
      api.getNewsBySource(source)
      .then(function(news) {
        this.setState(function() {
          return {
            news: news
          }
        })
    }.bind(this));
   }
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