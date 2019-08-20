import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";

import VoteButton from "./vote_button";

class Popup extends React.Component {
  constructor(props) {
    super(props)
    const browser = chrome || browser;
    browser.runtime.sendMessage({ content: "get_current_tab_url" },
      (response) => {
        this.setState({
          url: response.domain,
          simplifieds: (response.domainInfo && response.domainInfo.simplifieds) ? response.domainInfo.simplifieds : []
        })
      });
    this.state = {
      url: null,
      simplifieds: [],
      voted: null
    }
  }

  vote(type) {
    // fetch(url, {
    //   method: 'POST',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   credentials: 'same-origin',
    //   headers: {
    //       'Content-Type': 'application/json',
    //   },
    //   redirect: 'follow',
    //   referrer: 'no-referrer',
    //   body: JSON.stringify({vote: type}),
    // })
    // .then(response => response.json());
    this.setState({
      voted: type
    })
  }

  componentDidMount() {

  }

  rendersimplifieds(simplifieds) {
    console.log(simplifieds)
    return simplifieds.map((simplifield, index) => {
      return (
        <div key={index} className="overview simplifields-description-section">
          <div className="d-flex">
            <div className="simplifield-container">
              <h6 class="simplifields-description-section-title">{simplifield.name}</h6>
            </div>
            <div className="vote-container">
              <VoteButton
                type='up'
                vote={() => this.vote('up')}
                voted={this.state.voted}
                style={{ display: 'inline' }}
              />
              <VoteButton
                type='down'
                vote={() => this.vote('down')}
                voted={this.state.voted}
                style={{ display: 'inline' }}
              />
            </div>

          </div>
        </div>
      )
    })
  }


  render() {
    return (
      <div>
        <div className="title-container">
          <h4>{this.state.url}</h4>
        </div>
        {
          this.state.simplifieds.length > 0 &&
          (
            <div>
              <div class="simplifields-details-wrapper">
                <h6 className="mt-2">Clauses</h6>
                <div class="simplifields-details">
                  {this.rendersimplifieds(this.state.simplifieds)}
                </div>
              </div>
            </div>
          )
        }
        <div className="auth-footer">
          <Link to="/register/">Register</Link> or <Link to="/login/">login</Link> with an existing account
        </div>
      </div>
    )
  }
};

export default hot(module)(Popup)
