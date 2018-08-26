import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview (props) {
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
