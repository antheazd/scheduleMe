'use strict';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div className="full_page">
        <div className="half_page">
        <div className="ui center aligned container"> 
        </div></div></div>
    );}
}

let container = document.getElementById('login_container');
const root = ReactDOM.createRoot(container);
root.render(<LoginContainer />, domContainer);