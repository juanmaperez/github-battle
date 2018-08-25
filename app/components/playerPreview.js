const React = require('react')
const PropTypes = require('prop-types');

function PlayerPreview (props) {
  const { avatar, username, children } = props;
  return (
    <div className="playerPreview">
      <div>
        <img className="avatar"
              src={ avatar }
              alt={`Avatar for ${username}`}/>
        <h2 className="username">@{username}</h2>
      </div>
      { children }
    </div>
  ) 
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;