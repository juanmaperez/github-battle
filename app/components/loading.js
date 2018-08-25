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

Loading.defaultProps = {
  text: 'Still waiting' 
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

module.exports = Loading;
