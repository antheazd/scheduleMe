'use strict';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <a className="item" href="/logout"><button className="ui primary button">Log in</button></a>
    );}
}

class Navbar extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      
      return (
        <div className="ui secondary menu"><a className="active item" href="/schedule">Schedule</a><a className="item" href="/chat">Chat</a><a className="item" href="/payments">Payments</a><div className="right menu"><a className="item" href="/logout"><button className="ui primary button">Log out</button></a></div></div>
      );}
  }
  
  let domContainer1 = document.querySelector('#navbar');
  ReactDOM.render(<Navbar />, domContainer1);