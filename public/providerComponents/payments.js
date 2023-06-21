'use strict';

class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: {},
            user_payments: {}
        }
    }

    componentDidMount() {
        const user_id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length);
        axios.get('http://localhost:8000/user_detailed_info/' + user_id).then(resp => {
            this.setState({ user_info: resp });
        }).catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:8000/user_payments/' + user_id).then(resp => {
            this.setState({ user_payments: resp });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const user = this.state.user_info.data;
        const payments = this.state.user_payments.data;

        return (
            <div>
                <div>
                    <h2 className="ui icon center aligned header">
                        <i aria-hidden="true" className="user circular icon"></i>
                        <div className="content">
                            {user !== undefined ?
                                <div> {user.name} {user.surname}</div>
                                : <Loading />}
                        </div>

                    </h2>
                </div>
                {payments !== undefined ?
                    <div>
                        {
                            payments.length !== 0 ?
                                <div>
                                    <h2 className="ui red header">
                                        <i className="close icon"></i>
                                        <div className="content">
                                            Not paid
                                        </div>
                                    </h2>
                                    <div className="ui cards centered">
                                        {payments.filter((x) => x.paid === false).map(i =>
                                            <div key={i.id} className="field">
                                                <Payment id={i.id} day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} kind={i.kind} paid={i.paid} />
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="ui olive header">
                                        <i className="check icon"></i>
                                        <div className="content">
                                            Paid
                                        </div>
                                    </h2>
                                    <div className="ui cards centered">
                                        {payments.filter((x) => x.paid === true).map(i =>
                                            <div key={i.id} className="field">
                                                <div className="ui cards" style={{ display: "inline" }}>
                                                    <Payment id={i.id} day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} kind={i.kind} paid={i.paid} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                : <div className="center"><h4>User has not had any appointments yet</h4></div>
                        }
                    </div>
                    : <Loading />}
            </div>
        );
    }
}

let container = document.getElementById('payments');
const root = ReactDOM.createRoot(container);
root.render(<Payments />);