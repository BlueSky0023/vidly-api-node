import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

class Like extends Component {
  state = {
    liked: false
  };

  handleLikeClick = () => {
    this.setState(prevState => ({
      liked: !prevState.liked
    }));
  };

  render() {
   const heartClass = this.state.liked ? "fas" : "far";

    return (
      <i
        className={`${heartClass} fa-heart`}
        aria-hidden="true"
        onClick={this.handleLikeClick}
        style={{ cursor: "pointer" }}
      />
    );
  }
}

export default Like;
