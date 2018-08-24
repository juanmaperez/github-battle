const React = require('react');
const PropTypes = require('prop-types');

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '25px',
    fontStyle: 'italic'
  }
};

class Loading extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      text: props.text,
    }
  }

  componentDidMount() {
    let stopper = this.props.text + '...';
    this.interval = window.setInterval(function (){
      if(this.state.text === stopper){
        this.setState(function(){
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState(function(prevState){
          return {
            text : prevState.text + '.'
          }
        })
      }
    }.bind(this),300)
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

Loading.defaultProps = {
  text: 'Still waiting' 
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

module.exports = Loading;
