'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="ui secondary menu">
        <a className="active item" href="/schedule">Schedule</a>
        <a className="item" href="/chat">Chat</a>
        <a className="item" href="/payments">Payments</a>
        <div className="right menu">
          <a className="active item" href="/profile">Profile</a>
          <Button href="logout" label="Log out" />
        </div>
      </div>
    );
  }
}

let container = document.getElementById('navbar');
const root = ReactDOM.createRoot(container);
root.render(<Navbar />);