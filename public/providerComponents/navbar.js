'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="ui secondary menu">
        <a className="active item" href="/providerschedule">Schedule</a>
        <a className="item" href="/providerchat">Chat</a>
        <a className="item" href="/providerpayments">Payments</a>
        <div className="right menu">
          <a className="active item" href="/providerprofile">Profile</a>
          <Button href="/providerlogout" label="Log out" />
        </div>
      </div>
    );
  }
}

let container = document.getElementById('navbar');
const root = ReactDOM.createRoot(container);
root.render(<Navbar />);