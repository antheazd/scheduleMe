'use strict';

class SignUpForm extends React.Component {

  render() {
    return (
        <div class="half_page">
            <div class="ui attached message">
            <div class="content">
            <div class="header">Welcome to our site!</div>
                <p>Fill out the form below to sign-up for a new account</p></div></div>
                <form class="ui form attached fluid segment" method="post">
                    <div class="equal width fields">
                        <div class="field">
                            <label>Name</label>
                            <div class="ui fluid input">
                                <input type="text" placeholder="Name" id="name" name="name"/>
                            </div>
                        </div>
                    <div class="field">
                        <label>Surname</label>
                            <div class="ui fluid input">
                                <input type="text" placeholder="Surname" id="surname" name="surname"/>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <div class="ui input">
                            <input type="email" placeholder="Email" id="email" name="email"/>
                        </div>
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <div class="ui input">
                            <input type="password" placeholder="Password" id="password" name="password"/>
                        </div>
                    </div>
                    <Button label="Sign up"/>
                </form>
                <div class="ui warning bottom attached message">
                    <i aria-hidden="true" class="help icon"></i>Already signed up? <a href="/login">Log in here</a> instead.
                </div>
        </div>
    );}
    
}

let container = document.getElementById('signupform');
const root = ReactDOM.createRoot(container);
root.render(<SignUpForm />);