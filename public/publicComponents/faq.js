'use strict';

class Faq extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pusher">
                <PublicNavbar title="Frequently asked questions" />
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="twelve wide column">
                                <h3 className="ui header">What is scheduleMe?</h3>
                                <p>
                                    scheduleMe is an online platform that connects users with trusted service providers who offer a wide range of home services. Our platform allows you to conveniently book these services and have them delivered to your doorstep.
                                </p>
                                <h3 className="ui header">How do I use scheduleMe?</h3>
                                <p>
                                    Using scheduleMe is easy! Simply sign up for an account, browse through the available services, select a service provider, choose a convenient date and time for the appointment, and make the booking. The service provider will then come to your home to deliver the requested service.
                                </p>
                                <h3 className="ui header">Are the service providers on scheduleMe trustworthy?</h3>
                                <p>
                                    Yes, we take the trustworthiness of our service providers seriously. We carefully vet and verify each service provider before they are allowed to offer services on our platform. This includes background checks, verification of credentials, and reviews from previous customers.
                                </p>
                                <h3 className="ui header">What types of services are available on scheduleMe?</h3>
                                <p>
                                    scheduleMe offers a wide range of services, including home repairs and maintenance, beauty and wellness services, healthcare assistance, and much more. You can find service providers for various needs and preferences.
                                </p>
                                <h3 className="ui header">How do I pay for the services booked through scheduleMe?</h3>
                                <p>
                                    We offer secure payment processing through our platform. You can safely make payments using credit cards or other accepted payment methods. Your payment information is handled securely, and we do not store your payment card details on our servers.
                                </p>
                                <h3 className="ui header">What if I have a complaint or issue with the service received?</h3>
                                <p>
                                    If you have any complaints or issues with the service provided, please contact our support team. We will work with you and the service provider to address the matter and find a satisfactory resolution.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

let container = document.getElementById('faq');
const root = ReactDOM.createRoot(container);
root.render(<Faq />);