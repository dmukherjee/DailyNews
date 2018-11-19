import React from 'react';

class TestJs extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          count: 0
      }
      this.onClick = this.onClick.bind(this);
      this.resetCounter = this.resetCounter.bind(this);
  }

  onClick(e) {
      this.setState({
          count: this.state.count + 1
      });
  }

  resetCounter(){
      this.setState({count : 0});
  }

  render() {
    return (
      <div className='like-button'>
        {this.state.count} Likes!      
        <button onClick={this.onClick}> Like</button>
        <button onClick={this.resetCounter}> Unlike</button>
      </div>
    );
  }
}

export default TestJs;