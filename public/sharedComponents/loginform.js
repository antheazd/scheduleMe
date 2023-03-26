'use strict';

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
                    <Button label="Log in"/>
                </form>
                <div className="ui warning bottom attached message">
                    <i aria-hidden="true" className="help icon"></i>Don't have an account? <a href="/signup">Sign up here</a> instead.
                </div>
      </div>
  
    );}
    
}

let container = document.getElementById('loginform');
const root = ReactDOM.createRoot(container);
root.render(<LoginForm />);