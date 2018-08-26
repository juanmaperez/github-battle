import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './playerPreview';
import Loading from './loading'

class PlayerInput extends React.Component {

  state = {
    username: ''
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }


  handleChange = (event) => {
    const value = event.target.value;
    this.setState(()=>({
        username: value
      })
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render(){
    const { username } = this.state;
    const { label } = this.props;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">{label}</label>
        <input className="input" id="username" placeholder="Github username" type="text" autoComplete="off"
        value={username}
        onChange={this.handleChange}
        />
        <button
        className="btn"
        type="submit"
        disabled={!username}
        >Submit</button>
      </form>
    )
  }
}


 
class Battle extends React.Component {
  constructor(props){
    super(props)
  }

  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  }

  handleSubmit = (id, username) => {
    this.setState(()=>({
        [`${id}Name`] : username,
        [`${id}Image`] : `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset = (id) => {
    this.setState(()=>({
      [`${id}Name`] : '',
      [`${id}Image`] : null
    }))
  }
  
  render(){
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage , playerTwoImage } = this.state;
    // let playerOneName = this.state.playerOneName;
    // let playerTwoName = this.state.playerTwoName;
    // let playerOneImage = this.state.playerOneImage;
    // let playerTwoImage = this.state.playerTwoImage;

    return (
      <div className="battle-container">
        <div className="row">

        { !playerOneName &&
          <PlayerInput 
          id='playerOne'
          label='Player One'
          onSubmit={ this.handleSubmit }
          />
        }

        { playerOneImage !== null &&
          <PlayerPreview 
            avatar={ playerOneImage }
            username={ playerOneName }
          >
            <button 
            className="reset"
            onClick={()=> this.handleReset('playerOne')}>
            Reset
            </button>
          </PlayerPreview>
        }

        { !playerTwoName &&
          <PlayerInput 
            id='playerTwo'
            label='Player Two'
            onSubmit={ this.handleSubmit }
          />
        }

        { playerTwoImage !== null &&
          <PlayerPreview 
            avatar={ playerTwoImage }
            username={ playerTwoName}
          >
           <button 
            className="reset"
            onClick={()=> this.handleReset('playerTwo')}>
            Reset
            </button>
          </PlayerPreview>
        }
          </div>
        { playerOneImage && playerTwoImage &&
          <Link
            className="battle-btn"
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle
          </Link>
        }
      </div>
      
    )
  }
}

export default Battle;