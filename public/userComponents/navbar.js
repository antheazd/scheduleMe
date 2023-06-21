'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      providerId: null
    }
  }

  componentDidMount() {
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length);
    this.setState({ providerId: id});
  }
  render() {

    return (
      <div className="ui secondary menu">
        <a className="active item" href={"/schedule/" + this.state.providerId}>Schedule</a>
        <a className="item" href={"/chat/" + this.state.providerId}>Chat</a>
        <a className="item" href={"/payments/" + this.state.providerId}>Payments</a>
        <a className="item" href="/providers"><i className="search icon"></i></a>
        <div className="right menu">
          <a className="active item" href={"/profile/" + this.state.providerId}>Profile</a>
          <Button href="/logout" label="Log out" />
        </div>
      </div>
    );
  }
}

let container = document.getElementById('navbar');
const root = ReactDOM.createRoot(container);
root.render(<Navbar />);