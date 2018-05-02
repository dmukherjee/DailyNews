const React = require('react');
const Proptypes = require('prop-types');
const api = require('../../../helpers/api.js');
import { Input, Label, Menu, Container, Grid, Segment, Image, Item } from 'semantic-ui-react'

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
    <Menu fixed='left' inverted size='large' vertical>
      {/* <p>Selected source: {this.state.selectedSource}</p> */}
      {publishers.map(source => {
        return (
          <Menu.Item 
            style={source === props.selectedPublisher ? {color: '#d0021b', fontWeight: 'bold'} : null}
            onClick={props.onSelect.bind(null, source)}
            key={source}>
            {displayNames[source]}
          </Menu.Item>
        )
      })} 
    </Menu>
  )
}

function NewsGrid(props) {
  return (
    <Segment.Group>
      {props.news.map((newsItem) => {
        return ( 
          <Segment className='news-item'>         
          <Item.Group divided>
            <a href={`${newsItem.url}`}>
            <Item.Image className='news-Image'
              size='tiny'
              src={newsItem.urlToImage}
            />
            <Item.Content>
            <Item.Header as='a' className='news-title'>{newsItem.title}</Item.Header>
            <Item.Description>{newsItem.description}</Item.Description>
            </Item.Content>
            </a>
          </Item.Group> 
          </Segment>
        )
      })}
    </Segment.Group>
  )
}

// function NewsGrid(props) {
//   return (
//     <ul>
//       {props.news.map((newsItem) => {
//         return (
//           <Grid columns={2} divided key={newsItem.publishedAt} >
//             <Grid.Row stretched>
//               <a href={`${newsItem.url}`}>
//               <Grid.Column>
//                 <Segment><div className='news-title'>{newsItem.title}</div></Segment>
//                 <Segment><div className='news-description'>{newsItem.description}</div></Segment>
//               </Grid.Column>
//               <Grid.Column>
//                 <img
//                   className='news-Image'
//                   src={newsItem.urlToImage}
//                 />
//               </Grid.Column>
//               </a>
//             </Grid.Row>
//           </Grid>
//         )
//       })}
//     </ul>
//   )
// }

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
      <Grid>
      {/* <div> */}
      <Grid.Column left fixed width={3}>
        <SelectPublisher
          selectedPublisher = {this.state.selectedPublisher}
          onSelect={this.updatePublisher}
        />
        </Grid.Column>
        <Grid.Column width={13}>
        {!this.state.news ? <p>Loading....</p> : <NewsGrid news={this.state.news} />}
        </Grid.Column>
      {/* </div> */}
      </Grid>
    )
  }
}

module.exports = Publisher;