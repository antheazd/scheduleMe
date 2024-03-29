'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="ui secondary menu">
        <a className="active item" href="/adminschedule">Schedule</a>
        <a className="item" href="/adminchat">Chat</a>
        <a className="item" href="/adminpayments">Payments</a>
        <div className="right menu">
          <a className="active item" href="/adminprofile">Profile</a>
          <Button href="/adminlogout" label="Log out" />
        </div>
      </div>
    );
  }
}

let container = document.getElementById('navbar');
const root = ReactDOM.createRoot(container);
root.render(<Navbar />);