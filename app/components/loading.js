import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '25px',
    fontStyle: 'italic'
  }
};

class Loading extends React.Component {

  static defaultProps = {
    text: 'Still waiting' 
  }
  
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    text: this.props.text,
  }

  componentDidMount() {
    const {text , speed } = this.props;
    let stopper = text + '...';
    this.interval = window.setInterval(()=>{
      (text === stopper)?
      this.setState(() => ({ text }))
      : this.setState((prevState)=>({text : prevState.text + '.'}))
    },300)
  }

  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <div style={ styles.content }>
        <p>{this.state.text}</p>
      </div>
    )
  }
}



export default Loading;
