import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import $ from 'jquery';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon} from 'react-share';

import { Menu, Grid, Segment, Image, Item, Header, Card, Button, Label } from 'semantic-ui-react';

const PublisherNames = {
  'breaking-news': 'Breaking News',
  'top-picks': 'Top Stories @ NewsDesk',
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
          (newsItem.title !== 'Undefined') ? (
            <Card fluid centered raised style={{margin: '2rem', maxWidth: '95%', backgroundColor: 'black', boxShadow: '0 0 0 0', overflow: 'hidden'}} key={newsItem.url}>
              <a target="blank" href={`${newsItem.url}`}>
              <Item.Group divided className='news-item' style={{backgroundColor: '#2D333F', border: 'none'}}> 
                <Item onClick={props.onClick.bind(null, newsItem)}>
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
                      {newsItem.clickCount > 0 ? (<Label className='news-viewcount' style={{backgroundColor:'white', overflow: 'hidden', color: '#3b5998'}}>
                      {newsItem.clickCount > 1 ? `${newsItem.clickCount} views` : `${newsItem.clickCount} view`}</Label>) : ``} 
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
            </Card>) : ''
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
      selectedPublisher: 'breaking-news',
      news: null
    };
    
    this.updatePublisher = this.updatePublisher.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(item, source) {
    console.log('title', item.title);
    this.setState(() => {
      return {
        title: item.title
      }
    });
    this.fetch('save-news', item.title);
  }

  fetch(source, title) {
    if (source === 'breaking-news') {
      $.ajax({
        type: 'GET',
        url: '/topstories',
        success: result => {
          this.setState({
            news: result
          })
        }
      })
    } else if (source === 'top-picks') {
      console.log('Top Picks by users')
      $.ajax({
        type: 'GET',
        url: '/news',
        success: result => {
          this.setState({
            news: result
          })
        }
      })
    } else if (source === 'save-news') {
      console.log('save news')
      $.ajax({
        type: 'POST',
        url: '/savenews',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {title: title},
        success: result => {
          console.log('success!')
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
      <div style={{backgroundColor:'black'}}> 
        <Grid columns='equal' style={{marginTop: 105}}>
          <Grid.Column left='true' width={3}>
            <SelectPublisher
              selectedPublisher = {this.state.selectedPublisher}
              onSelect={this.updatePublisher}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            {!this.state.news ? <p>Loading....</p> : <NewsGrid news={this.state.news} onClick={this.handleClick}/>}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

module.exports = Publisher;