'use strict';

class Contacts extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pusher">
                <PublicNavbar title="Contacts" />
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="twelve wide column">
                                <h3 className="ui header">Email:</h3>
                                <p>
                                    info@scheduleMe.com
                                </p>
                                <h3 className="ui header">Phone:</h3>
                                <p>
                                    +1-XXX-XXX-XXXX
                                </p>
                                <h3 className="ui header">Address:</h3>
                                <p>
                                    123 Main Street, City, State, ZIP Code
                                </p>
                                <h3 className="ui header"> </h3>
                                <p>
                                    For general inquiries, feedback, or support, please email us or give us a call. Our dedicated team is available to assist you during our business hours.
                                </p>
                                <p>
                                    If you have specific questions or need assistance related to a particular service or booking, please log in to your scheduleMe account and access the support section for personalized help.
                                </p>
                                <p>
                                    We look forward to hearing from you and providing the support you need for a seamless experience with scheduleMe.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

let container = document.getElementById('contacts');
const root = ReactDOM.createRoot(container);
root.render(<Contacts />);