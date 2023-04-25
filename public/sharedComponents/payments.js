'use strict';

class Payments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div>
        <h2 class="ui header">
            <i class="close icon"></i>
            <div class="content">
                Not paid
            </div>
        </h2>
        <div className="ui cards centered">
        {window.appointments.filter((x)=> x.paid === false).map(i => 
            <div key={i.id} className="field">
                <Payment day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} paid={i.paid} />
            </div>
            )}
        </div>

        <h2 class="ui header">
            <i class="check icon"></i>
            <div class="content">
                Paid
            </div>
        </h2>
        {window.appointments.filter((x)=> x.paid === true).map(i => 
            <div key={i.id} className="field">
                <div className="ui cards" style={{ display: "inline"}}>
                <Payment day={i.day} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} price={i.price} paid={i.paid} />
              </div>
              </div>
            )}
        </div>
    );}
}

let container = document.getElementById('payments');
const root = ReactDOM.createRoot(container);
root.render(<Payments />);