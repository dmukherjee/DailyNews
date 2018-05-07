import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import $ from 'jquery';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon} from 'react-share';

import { Input, Label, Menu, Container, Grid, Segment, Image, Item, List, Header, Table, Card, Button } from 'semantic-ui-react'

const PublisherNames = {
  'Breaking News': 'Breaking News',
  'Top Picks by Users': 'Top Picks by Users',
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
    <Menu inverted size='large' fixed='left' vertical style={{marginTop: 110, backgroundColor: 'black'}}>
      {/* <p>Selected source: {this.state.selectedSource}</p> */}
      {Object.keys(PublisherNames).map(source => {
        return (
          <Menu.Item 
            style={source === props.selectedPublisher ? {color: '#d0021b', fontWeight: 'bold', borderColor: 'pink'} : null}
            onClick={props.onSelect.bind(null, source)}
            key={source}>
            {PublisherNames[source]}
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
          <Card fluid centered raised style={{margin: '2rem', maxWidth: '95%', backgroundColor: 'black'}} key={newsItem.url}>
          <a target="blank" href={`${newsItem.url}`}>
          <Item.Group divided className='news-item' style={{backgroundColor: '#2D333F', border: 'none'}}> 
            <Item>
            <Item.Image className='news-Image'
              size='small'
              src={newsItem.urlToImage}
              style={{margin: 15}}
            />
            <Item.Content>
              <Item.Header style={{color:'white', marginTop: 20}} className='news-title'>{newsItem.title}</Item.Header>
              <Item.Description>
                <div className='news-description'>{newsItem.description}</div>
                <div className='news-publishtime'>{publishedAt}</div>
              </Item.Description>
              <Item.Extra className='share-network' style={{marginRight: 20, marginTop: -20, textAlign: 'right'}}>
                <FacebookShareButton
                  url={newsItem.url}
                  quote={newsItem.title}
                  className="share-button">
                <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={newsItem.url}
                  title={newsItem.title}
                  className="share-button">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Item.Extra>
            </Item.Content>
            </Item>
          </Item.Group> 
          </a>
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
    } else if (source === 'Top Picks by Users') {
      console.log('Top Picks by users')
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

  onClick() {

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