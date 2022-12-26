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


class LoginForm extends React.Component {
  render() {
    
    return (
      <div className="full_page">
      <div className="half_page">
      <div className="ui center aligned container"> 
        <div className="center"><img src="static/logo.png" className="ui small image"/></div>
          <form className="ui form" method="post">
          <div className="field">
              <label>Email address</label>
              <input type="email" id="userEmail" name = "email" placeholder="Email address"/>
          </div>
          <div className="field">
              <label>Password</label>
              <input type="password" id="userPassword" name = "password" placeholder="Password"/>
          </div>
          <Button />
      </form>
  </div></div></div>
    );}
}

let domContainer1 = document.querySelector('#loginform');
ReactDOM.render(<LoginForm />, domContainer1);
