'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="ui secondary menu">
        <a className="active item" href="/adminpanel">Schedule</a>
        <a className="item" href="/adminchat">Chat</a>
        <a className="item" href="/adminpayments">Payments</a>
        <div className="right menu">
          <a className="active item" href="/adminprofile">Profile</a>
          <a className="item" href="/adminlogout">
            <button className="ui primary button" type="submit">Log out</button>
          </a>
        </div>
      </div>
    );}
}

let container = document.getElementById('navbar');
const root = ReactDOM.createRoot(container);
root.render(<Navbar />);