'use strict';

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            provider: false
        }
    }

    componentDidMount() {
        if (window.location.href.includes('provider')) {
            this.setState({ provider: true });
        }
    }

    render() {
        return (
            <div className="half_page">
                <div className="ui attached message">
                    <div className="content">
                        <div className="header">Welcome to our site!</div>
                        <p>Fill out the form below to sign-up for a new account</p></div></div>
                <form className="ui form attached fluid segment" method="post" id="form">
                    <div className="equal width fields">
                        <div className="field">
                            <label>Name</label>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Name" id="name" name="name" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Surname</label>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Surname" id="surname" name="surname" />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Phone" id="phone" name="phone" />
                        </div>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <div className="ui input">
                            <input type="email" placeholder="Email" id="email" name="email" />
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="ui input">
                            <input type="password" placeholder="Password" id="password" name="password" />
                        </div>
                    </div>
                    <Button label="Sign up" />
                </form>
                <div className="ui warning bottom attached message">
                    <div><i aria-hidden="true" className="help icon"></i>Already signed up? <a href={this.state.provider ? "/providerlogin" : "/login"}>Log in here</a> instead. </div>
                </div>
            </div>
        );
    }

}

let container = document.getElementById('signupform');
const root = ReactDOM.createRoot(container);
root.render(<SignUpForm />);