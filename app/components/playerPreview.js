const React = require('react')
const PropTypes = require('prop-types');

function PlayerPreview (props) {
  return (
    <div className="playerPreview">
      <div>
        <img className="avatar"
              src={ props.avatar }
              alt={'Avatar for' + props.username }/>
        <h2 className="username">@{props.username}</h2>
      </div>
      { props.children }
    </div>
  ) 
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;