'use strict';

/*class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <a className="item" href="/logout"><button className="ui primary button">Log in</button></a>
    );}
} */


class LoginForm extends React.Component {

  render() {
    return (
      <div className="half_page">
        <div className="ui attached message">
          <div className="content">
            <div className="header">Welcome to our site!</div>
                <p>Log into your scheduleMe account</p></div></div>
                <form className="ui form attached fluid segment" method="post">
                    <div className="field">
                        <label>Email</label>
                        <div className="ui input">
                            <input type="email" id="userEmail" name = "email" placeholder="Email address"/>
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="ui input">
                            <input type="password" id="userPassword" name = "password" placeholder="Password"/>
                        </div>
                    </div>
                    <button className="ui blue button">Log in</button>
                </form>
                <div className="ui warning bottom attached message">
                    <i aria-hidden="true" className="help icon"></i>Don't have an account? <a href="/login">Sign up</a> here instead.
                </div>
      </div>
  
    );}
    
    /*return (
      <div className="full_page">
      <div className="half_page">
      <div className="ui center aligned container"> 
        <div className="center"><img src="static/scheduleMe.png" className="ui small image"/></div>
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
    );} */
}

let container = document.getElementById('loginform');
const root = ReactDOM.createRoot(container);
root.render(<LoginForm />);