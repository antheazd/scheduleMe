'use strict';

class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/user_payments_info').then(resp => {
            this.setState({ payments: resp });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const payments = this.state.payments.data;

        return (
            <div>
                <h2 className="ui red header">
                    <i className="close icon"></i>
                    <div className="content">
                        Not paid
                    </div>
                </h2>
                <div>
                    {payments !== undefined ?
                        <div className="ui cards centered">
                            {payments.filter((x) => x.paid === false).map(i =>
                                <div key={i.id} className="field">
                                    <Payment id={i.id} day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} kind={i.kind} paid={i.paid} />
                                </div>
                            )}
                        </div>
                        : <Loading />}
                </div>

                <h2 className="ui olive header">
                    <i className="check icon"></i>
                    <div className="content">
                        Paid
                    </div>
                </h2>
                <div>
                    {payments !== undefined ?
                        <div className="ui cards centered">
                            {payments.filter((x) => x.paid === true).map(i =>
                                <div key={i.id} className="field">
                                    <div className="ui cards" style={{ display: "inline" }}>
                                        <Payment id={i.id} day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} kind={i.kind} paid={i.paid} />
                                    </div>
                                </div>
                            )}
                        </div>
                        : <Loading />}
                </div>
            </div>
        );
    }
}

let container = document.getElementById('payments');
const root = ReactDOM.createRoot(container);
root.render(<Payments />);