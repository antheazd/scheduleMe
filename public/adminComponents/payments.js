'use strict';

class Payments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div>
            <div>
                <h2 className="ui icon center aligned header">
                    <i aria-hidden="true" className="user circular icon"></i>
                    <div className="content">{window.user_info[0].name} {window.user_info[0].surname}</div>
                </h2>
            </div>
        {!window.appointments.length == 0 ?
        <div>
        <h2 className="ui red header">
            <i className="close icon"></i>
            <div className="content">
                Not paid
            </div>
        </h2>
        <div className="ui cards centered">
        {window.appointments.filter((x)=> x.paid === false).map(i => 
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
        {window.appointments.filter((x)=> x.paid === true).map(i => 
            <div key={i.id} className="field">
                <div className="ui cards" style={{ display: "inline"}}>
                <Payment id={i.id} day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} kind={i.kind} paid={i.paid} />
              </div>
            </div>
            )}
        </div>
        </div>
        : <div className="center"><h4>User has not had any appointments yet</h4></div>}
        </div>
    );}
}

let container = document.getElementById('payments');
const root = ReactDOM.createRoot(container);
root.render(<Payments />);