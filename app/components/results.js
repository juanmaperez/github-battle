const React = require('react');
const queryString = require('query-string');
const api = require('./../utils/api');
const Link = require('react-router').Link
const PropTypes = require('prop-types');
const PlayerPreview = require('./playerPreview');
const Loading = require('./loading')


function PlayerInformation(props){
  const profile = props.profile;
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

function Player(props){
  return(
    <div className="result">
      <h2 className="label">{ props.label }</h2>
      <h3 className="score" style={{textAlign: "center"}}>{ props.score}</h3>
      <PlayerPreview
        username={props.profile.login}
        avatar={props.profile.avatar_url}
        >
        <PlayerInformation profile={props.profile}/>
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
  constructor(props){
    super(props)

    this.state = {
      winner : null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then(function (results){
      if(!results){
        return this.setState(function(){
          return {
            error: 'Looks like there was an error. Check that the users exist on Github',
            loading: false
          }
        })
      } else {
        return this.setState(function() {
          return {
            winner: results[0],
            loser: results[1],
            loading: false
          }
        })
      }
    }.bind(this))
  }
  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

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

module.exports = Results;