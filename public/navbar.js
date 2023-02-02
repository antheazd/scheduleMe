'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="ui secondary menu"><a className="active item" href="/schedule">Schedule</a><a className="item" href="/chat">Chat</a><a className="item" href="/payments">Payments</a><div className="right menu"><a className="active item" href="/userprofile">Profile</a><a className="item" href="/logout"><button className="ui primary button" type="submit">Log out</button></a></div></div>
    );}
}

let container = document.getElementById('navbar');
const root = ReactDOM.createRoot(container);
root.render(<Navbar />);