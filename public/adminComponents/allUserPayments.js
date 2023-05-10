'use strict';

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.updateState = this.updateState.bind(this)
  }

  updateState() {
    this.setState({ visibility: !this.state.visibility });
  }

  render() {

    return (
      <div>
        <div className="center">
          <button className="ui large button center" onClick={this.updateState}>Check payments for user</button>
        </div>

        <div className="payments_div">
          <table className="ui top attached basic table">
            <thead className="">
              <tr className="">
                <th className="">Name</th>
                <th className="">Day</th>
                <th className="">Start time</th>
                <th className="">Price</th>
              </tr>
            </thead>
            <tbody className="">
              {window.appointments.map(i =>
                <tr key={i.id} className="">
                  <td className="">{i.name} {i.surname}</td>
                  <td className="">{i.day}</td>
                  <td className="">{i.start_hour}:{i.start_minute < 10 ? '0' + i.start_minute : i.start_minute}</td>
                  <td className="">{i.price} €</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {this.state.visibility ?
          <div className="half_page">
            <div className="ui attached message">
              <i className="close icon" onClick={this.updateState}></i>
              <div className="content">
                <div className="header">Check payments for user</div></div></div>
            <form className="ui form attached fluid segment" method="post" style={{ display: "inline-block", overflowY: "scroll", overflowX: "hidden" }}>
              <div className="equal width fields" style={{ display: "inline-block" }}>
                {window.users.map(i =>
                  <div key={i.id} className="field">
                    <div className="ui fluid input">
                      <h3><a href={'/adminpayments/' + i.id}>{i.name} {i.surname}</a></h3>
                    </div>
                    <br></br>
                  </div>
                )}
              </div>
            </form>
          </div>
          : null}

      </div>
    );
  }
}

let container = document.getElementById('payments');
const root = ReactDOM.createRoot(container);
root.render(<Payments />);