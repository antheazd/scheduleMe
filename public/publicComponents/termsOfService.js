'use strict';

class TermsOfService extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pusher">
                <PublicNavbar title="Terms of service" />
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="twelve wide column">
                                <h3 className="ui header">Acceptance of Terms</h3>
                                <p>
                                    By accessing or using scheduleMe, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree with any part of these Terms, you may not use our platform.
                                </p>
                                <h3 className="ui header">Use of scheduleMe</h3>
                                <p>
                                    <b>a. Eligibility:</b> You must be at least 18 years old to use scheduleMe. By using our platform, you represent and warrant that you meet this eligibility requirement.
                                    <br></br><b>b. User Accounts:</b> You may need to create an account to access certain features or services on scheduleMe. You are responsible for maintaining the confidentiality of your account credentials and agree to provide accurate and complete information during the registration process.
                                    <br></br><b>c. Prohibited Conduct:</b> You agree not to engage in any activity that is unlawful, harmful, threatening, abusive, defamatory, or violates the rights of others while using scheduleMe.
                                    <br></br><b>d. Compliance with Laws:</b> You agree to comply with all applicable laws, rules, and regulations while using our platform and services.
                                </p>

                                <h3 className="ui header">Booking and Service Providers</h3>
                                <p>
                                    <b>a. Service Providers:</b> scheduleMe connects users with service providers who offer various home services. We do not employ or endorse these service providers. We make no representations or warranties regarding their qualifications, skills, or services.
                                    <br></br><b>b. Service Bookings:</b> When you book a service through scheduleMe, you agree to the specific terms and conditions set by the service provider. It is your responsibility to review and understand these terms before making a booking.
                                    <br></br><b>c. Service Quality:</b> We strive to ensure that service providers listed on scheduleMe offer high-quality services. However, we cannot guarantee the quality, accuracy, or reliability of their services. Any issues or disputes with service providers should be resolved directly with them.
                                </p>
                                <h3 className="ui header">Payments</h3>
                                <p>
                                    <b>a. Service Fees:</b> Service fees for bookings made through scheduleMe are clearly displayed during the booking process. You agree to pay the specified fees for the services provided.
                                    <br></br><b>b. Payment Processing:</b> We use secure third-party payment processors to process payments on our platform. By making a payment through scheduleMe, you authorize us to share your payment information with these processors.
                                </p>
                                <h3 className="ui header">Intellectual Property</h3>
                                <p>
                                    <b>a. Ownership:</b> scheduleMe and its content, including but not limited to text, graphics, logos, and software, are the property of scheduleMe and protected by intellectual property laws.
                                    <br></br><b>b. Limited License:</b> We grant you a limited, non-exclusive, non-transferable license to access and use scheduleMe for personal, non-commercial purposes. You may not reproduce, modify, or distribute any content from our platform without our prior written consent.
                                </p>
                                <h3 className="ui header">Privacy</h3>
                                <p>
                                    We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using scheduleMe, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.
                                </p>
                                <h3 className="ui header">Disclaimer of Warranties</h3>
                                <p>
                                    scheduleMe is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied. We make no representations or warranties regarding the availability, accuracy, reliability, or suitability of our platform or services for your specific needs.
                                </p>
                                <h3 className="ui header">Limitation of Liability</h3>
                                <p>
                                    To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to the use or inability to use scheduleMe or the services
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

let container = document.getElementById('termsofservice');
const root = ReactDOM.createRoot(container);
root.render(<TermsOfService />);