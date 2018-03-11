"use strict";
/* global classnames STKButton InfoBox r React */

window.Experiments = class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      learnMoreHref: null,
    };
  }

  componentDidMount() {
    this.setState({
      learnMoreHref: "https://google.de",
    });
  }

  render() {
    return (
      r("div", {},
      )
    );
  }
};
