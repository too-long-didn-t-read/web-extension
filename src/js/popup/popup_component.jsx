import React from "react";
import icon from "../../img/icon-128.png"
import { hot } from "react-hot-loader";

class Popup extends React.Component {
  constructor(props) {
    super(props)
    const browser = chrome || browser;
    browser.runtime.sendMessage({content: "get_current_tab_url"},
      (response) => {
        console.log(response)
          // document.getElementById("tab_name").innerHTML = response.domain;
          this.setState({
            url: response.domain,
            simplifieds : (response.domainInfo && response.domainInfo.simplifieds) ? response.domainInfo.simplifieds : []
          })
      });
    this.state = {
      url: null,
      simplifieds: []
    }
  }
  
  componentDidMount() {

  }

  rendersimplifieds(simplifieds) {
    console.log(simplifieds)
    return simplifieds.map(simplifield => {
      return (
        <li>{simplifield.name}</li>
      )
    })
  }
  render () {
    return (
      <div>
        <h4>{this.state.url}</h4>
        <h5>Simplifields</h5>
        <ul>
        {this.rendersimplifieds(this.state.simplifieds)}
        </ul>
      </div>
    )
  }
};

export default hot(module)(Popup)
