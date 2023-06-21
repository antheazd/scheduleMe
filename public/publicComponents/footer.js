'use strict';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui inverted vertical footer segment">
                <div className="ui container">
                    <div
                        className="ui stackable inverted divided equal height stackable grid"
                    >
                        <div className="three wide column">
                            <h4 className="ui inverted header">About us</h4>
                            <div className="ui inverted link list">
                                <a className="item" href="/socialmedia">Social media accounts</a>
                                <a className="item" href="/privacypolicy">Privacy Policy</a>
                                <a className="item" href="/termsofservice">Terms of service</a>
                                <a className="item" href="/providersignup">Register as a service provider</a>
                                <a className="item" href="/providerlogin">Log in as service provider</a>
                            </div>
                        </div>
                        <div className="three wide column">
                            <h4 className="ui inverted header">Services</h4>
                            <div className="ui inverted link list">
                                <a className="item" href="/support">Support and Help:</a>
                                <a className="item" href="/faq">FAQ</a>
                                <a className="item" href="/contacts">Contact Us</a>
                            </div>
                        </div>
                        <div className="seven wide column">
                            <h4 className="ui inverted header">We can't wait to serve you!</h4>
                            <p>
                                Re-engage today and let us connect you with trusted professionals
                                who will bring their expertise directly to your doorstep.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let container = document.getElementById('aboutUs');
const root = ReactDOM.createRoot(container);
root.render(<AboutUs />);