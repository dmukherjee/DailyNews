import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import $ from 'jquery'

import { Input, Label, Menu, Container, Grid, Segment, Image, Item, List, Header, Table, Card } from 'semantic-ui-react'

const publishers = ['Breaking News', 'ars-technica', 'bbc-news', 'cnbc', 'cnn', 'espn', 'ign', 
  'the-new-york-times', 'polygon', 'reuters', 'the-verge', 'the-wall-street-journal', 'the-washington-post'];
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
  'the-wall-street-journal': 'WSJ',
  'the-washington-post': 'Washington Post'
}

function SelectPublisher(props) {
  return (
    <Menu inverted size='large' fixed='left' vertical style={{marginTop: 110, backgroundColor: 'black'}}>
      {/* <p>Selected source: {this.state.selectedSource}</p> */}
      {publishers.map(source => {
        return (
          <Menu.Item 
            style={source === props.selectedPublisher ? {color: '#d0021b', fontWeight: 'bold', borderColor: 'pink'} : null}
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
    <Segment.Group style={{marginTop: -25, backgroundColor:'black'}}>
      {props.news.map((newsItem) => {
        let publishedAt = moment(newsItem.publishedAt).fromNow();
        return ( 
          <Card fluid centered raised style={{margin: '2rem', maxWidth: '95%', backgroundColor: 'black'}}>
          <Segment style={{backgroundColor: '#2D333F', border: 'none'}}>  
          <Item.Group divided className='news-item'> 
            <a target="blank" href={`${newsItem.url}`}>
            <Item.Image className='news-Image'
              size='tiny'
              src={newsItem.urlToImage}
            />
            <Item.Content style={{color:'white'}}>
            <Item.Header className='news-title'>{newsItem.title}</Item.Header>
            <Item.Description>
              <div className='news-description'>{newsItem.description}</div>
              <div className='news-publishtime'>{publishedAt}</div>
            </Item.Description>
            </Item.Content>
            </a>
          </Item.Group> 
          </Segment>
          </Card>
        )
      })}
    </Segment.Group>
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
    this.fetch(source);
  }

  fetch(source) {
    if (source === 'Breaking News') {
      $.ajax({
        type: 'GET',
        url: '/topstories',
        success: result => {
          this.setState({
            news: result
          })
        }
      })
    } else {
      $.ajax({
        type: 'GET',
        url: '/newsbysource',
        data: {source: source},
        success: result => {
          this.setState({
            news: result
          })
        }
      })
    }
  }

  render() {
    return (
      <div> 
      <Grid columns='equal'  style={{marginTop: 105}}>
        <Grid.Column left='true' width={3}>
          <SelectPublisher
            selectedPublisher = {this.state.selectedPublisher}
            onSelect={this.updatePublisher}
          />
        </Grid.Column>
        <Grid.Column width={13}>
        {!this.state.news ? <p>Loading....</p> : <NewsGrid news={this.state.news} />}
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

module.exports = Publisher;