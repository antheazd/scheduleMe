'use strict';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const living_room = './static/photos/living_room.jpg';
        return (
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned segment" style={{ background: `url(${living_room})`, boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                    <div>
                        <div className="ui container">
                            <div className="ui large secondary inverted pointing menu">
                                <a className="toc item"><i className="sidebar icon"></i></a>
                                <a className="active item" href="/">Home</a> <a className="item" href="/providers">Service Providers</a>
                                <a className="item" href="/contacts">Contact</a>
                                <div className="right item">
                                    <a className="ui inverted button" href="/login">Log in</a>
                                    <a className="ui inverted button" href="/signup">Sign Up</a>
                                </div>
                            </div>
                        </div>
                        <div className="ui text container">
                            <h1 className="ui inverted header">Welcome to scheduleMe!</h1>
                            <h2> Connecting You with Trusted Service Providers That Come to Your Home!</h2>
                            <a href="/login">
                            <div className="ui huge button">
                                Get Started <i className="right arrow icon"></i>
                            </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="eight wide column">
                                <h3 className="ui header">Schedule appointments at location you choose!</h3>
                                <p>
                                    At scheduleMe, we understand the value of convenience and the importance of finding reliable service providers who can cater to your needs right in the comfort of your own home. Whether you're looking for a skilled handyman, a talented hairstylist, a compassionate healthcare professional, or any other service provider, we've got you covered.
                                </p>
                                <h3 className="ui header">Explore a Wide Range of Services</h3>
                                <p>
                                    From home repairs and maintenance to beauty and wellness services, and even healthcare assistance, scheduleMe offers an extensive selection of service providers who are ready to come to your home. Simply browse through our platform to find the service you need.
                                </p>

                                <h3 className="ui header">Verified and Trusted Professionals!</h3>
                                <p>
                                    We take the hassle out of searching for reliable professionals. Every service provider on our platform undergoes a thorough vetting process, including background checks and verification of credentials. Rest assured that you'll be connected with trustworthy individuals who deliver top-notch services.
                                </p>
                                <h3 className="ui header">Seamless Booking Process</h3>
                                <p>
                                    Once you've found the perfect service provider, booking an appointment is a breeze. Simply select the date and time that work best for you, and the provider will come to your home at the scheduled time. No more waiting in long queues or driving across town.
                                </p>
                                <h3 className="ui header">Personalized and Tailored Experiences</h3>
                                <p>
                                    Our service providers understand that each individual has unique needs and preferences. They will work closely with you to understand your requirements and provide personalized services that meet your expectations. Enjoy a truly customized experience without leaving your home.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="center aligned column">
                                <a className="ui huge button" href="/providers">Check Out Our Service Providers</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe quote segment">
                    <div className="ui equal width stackable internally celled grid">
                        <div className="center aligned row">
                            <div className="column">
                                <h3>"Very convenient!"</h3>
                                <p>That is what they all say about us</p>
                            </div>
                            <div className="column">
                                <h3>"I can book appointment within a minute!"</h3>
                                <p>No need to call anyone</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment">
                    <div className="ui text container">
                        <h3 className="ui header">Feedback and Reviews</h3>
                        <p>
                            We believe in the power of feedback.
                            After each service, you'll have the opportunity to rate and
                            review your experience. This helps us maintain a high standard
                            of service quality and enables other users to make informed
                            decisions when choosing their service providers.
                        </p>
                        <a className="ui large button">Read More</a>
                        <h4 className="ui horizontal header divider">
                            <a href="#root"> Pricing</a>
                        </h4>
                        <h3 className="ui header">Transparent Pricing and Payment</h3>
                        <p>
                            With scheduleMe, you'll never encounter unexpected costs.
                            Service providers on our platform offer transparent pricing,
                            so you'll know the exact cost of the service upfront.
                            Make secure payments through our platform, eliminating
                            the need for cash transactions.
                        </p>
                        <a className="ui large button" href="/providers">I'm Still Quite Interested</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

let container = document.getElementById('aboutUs');
const root = ReactDOM.createRoot(container);
root.render(<AboutUs />);