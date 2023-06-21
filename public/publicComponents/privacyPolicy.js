'use strict';

class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const living_room = './static/photos/living_room.jpg';
        return (
            <div className="pusher">
                <PublicNavbar title="Privacy policy" />
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="twelve wide column">
                                <h3 className="ui header">Information We Collect:</h3>
                                <p>
                                    a. <b>Personal Information:</b> When you sign up for an account or use our services, we may collect personal information such as your name, email address, phone number, and address.
                                    <br></br><b>b. Service Information:</b> We collect information related to the services you request through our platform, including service details, appointment times, and any other information necessary to fulfill your requests.
                                    <br></br><b>c. Payment Information:</b> We may collect payment information, such as credit card details or other financial information, to process payments for services you book through our platform. Please note that we do not store or retain your payment card details on our servers. We use third-party payment processors who adhere to industry standards for data security.
                                    <br></br><b>d. Communications:</b> We may collect information about your communications with service providers or other users of our platform, including messages, reviews, and feedback.
                                </p>
                                <h3 className="ui header">How We Use Your Information:</h3>
                                <p>
                                    <b>a. To Provide Services:</b> We use the information collected to facilitate and deliver the requested services, connect you with service providers, and communicate important service-related updates.
                                    <br></br><b>b. Improving Our Services:</b> We analyze user information to enhance and improve our platform, services, and user experience.
                                    <br></br><b>c. Communication:</b> We may use your information to send you relevant notifications, updates, promotions, and marketing communications. You can opt-out of receiving marketing communications at any time by following the instructions provided in the communication or by contacting us directly.
                                    <br></br><b>d. Legal Compliance:</b> We may use and disclose your information as required by law, regulations, legal processes, or governmental requests.
                                </p>

                                <h3 className="ui header">Information Sharing and Disclosure:</h3>
                                <p>
                                    <b>a. Service Providers:</b> We share your information with service providers who are responsible for delivering the services you request through our platform. They are bound by confidentiality obligations and are only authorized to use your information for the purpose of providing the requested services.
                                    <br></br><b>b. Business Partners:</b> We may share your information with trusted business partners who work with us to provide and improve our services. These partners are obligated to protect your information in a manner consistent with this Privacy Policy.
                                    <br></br><b>c. Legal Requirements:</b> We may disclose your information if required to do so by law, legal processes, or governmental requests. We may also disclose your information to enforce our policies, respond to claims, or protect the rights, property, or safety of scheduleMe, our users, or others.
                                </p>
                                <h3 className="ui header">Data Security:</h3>
                                <p>
                                    <b>a.</b> We employ industry-standard security measures to protect your information from unauthorized access, misuse, loss, or alteration. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee the absolute security of your information.
                                    <br></br><b>b.</b> You are responsible for maintaining the confidentiality of your account credentials. Please keep your username and password secure and notify us immediately of any unauthorized access or use of your account.
                                </p>
                                <h3 className="ui header">Children's Privacy:</h3>
                                <p>
                                    scheduleMe is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete the information as soon as possible.
                                </p>
                                <h3 className="ui header">Third-Party Links and Services:</h3>
                                <p>
                                    Our platform may contain links to third-party websites, services, or applications that are not operated or controlled by scheduleMe. This Privacy Policy does not apply to those third-party platforms. We encourage you to review the privacy policies of any third-party platforms you visit or use.
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

let container = document.getElementById('privacypolicy');
const root = ReactDOM.createRoot(container);
root.render(<PrivacyPolicy />);