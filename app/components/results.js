import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from './../utils/api';
import Link from 'react-router';
import PlayerPreview from './playerPreview';
import Loading from './loading';


export function PlayerInformation({profile}){
  return(
    <div className="info">
      <p><strong>Name:</strong> { profile.name}</p>
      <p><strong>City:</strong> { profile.location} </p>
      <p><strong>Company:</strong> { profile.company}</p>
      <p><strong>Repos:</strong> { profile.public_repos} </p>
      <p><strong>Blog:</strong> { profile.blog}</p>
      <p><strong>others:</strong> </p>
    </div>
  )
}

export function Player({label, score, profile}){
  return(
    <div className="result">
      <h2 className="label">{ label }</h2>
      <h3 className="score" style={{textAlign: "center"}}>{ score}</h3>
      <PlayerPreview
        username={ profile.login}
        avatar={profile.avatar_url}
        >
        <PlayerInformation profile={profile}/>
      </PlayerPreview>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}


class Results extends React.Component {

  state = {
    winner : null,
    loser: null,
    error: null,
    loading: true
  }

  async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
    const [winner, loser ] = await api.battle([
      playerOneName,
      playerTwoName,
    ]);
   
    (!winner || !loser) ? 
    this.setState(()=>({
          error: 'Looks like there was an error. Check that the users exist on Github',
          loading: false
        })
      )
    : this.setState(()=>({
          winner,
          loser,
          loading: false
        })
      )
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if(loading){ return <Loading text="Waiting for Results..."/>}
    if(error)  return <div><p> {error} </p> <Link to="/battle">Reset</Link></div>
    return (
      <div className="results-wrapper">
        <h1> | Results |</h1>
        <div className="results">        
          <Player
            label="Winner"
            score= { winner.score }
            profile={ winner.profile }
          />
          <Player
            label="Loser"
            score={loser.score}
            profile={ loser.profile }
          />
        </div>
      </div>
    )
  }
}

export default Results;