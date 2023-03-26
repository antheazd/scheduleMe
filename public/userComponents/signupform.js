'use strict';
console
class SignUpForm extends React.Component {

  render() {
    return (
        <div className="half_page">
            <div className="ui attached message">
            <div className="content">
            <div className="header">Welcome to our site!</div>
                <p>Fill out the form below to sign-up for a new account</p></div></div>
                <form className="ui form attached fluid segment" method="post">
                    <div className="equal width fields">
                        <div className="field">
                            <label>Name</label>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Name" id="name" name="name"/>
                            </div>
                        </div>
                    <div className="field">
                        <label>Surname</label>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Surname" id="surname" name="surname"/>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <div className="ui input">
                            <input type="email" placeholder="Email" id="email" name="email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="ui input">
                            <input type="password" placeholder="Password" id="password" name="password"/>
                        </div>
                    </div>
                    <Button label="Sign up"/>
                </form>
                <div className="ui warning bottom attached message">
                    <i aria-hidden="true" className="help icon"></i>Already signed up? <a href="/login">Log in here</a> instead.
                </div>
        </div>
    );}
    
}

let container = document.getElementById('signupform');
const root = ReactDOM.createRoot(container);
root.render(<SignUpForm />);