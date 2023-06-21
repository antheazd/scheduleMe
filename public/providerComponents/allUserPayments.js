'use strict';

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      ordered_users: {},
      debt_list: {}
    };
    this.updateState = this.updateState.bind(this)
  }

  updateState() {
    this.setState({ visibility: !this.state.visibility });
  }

  componentDidMount() {
    axios.get('http://localhost:8000/existing_debt').then(resp => {
      this.setState({ debt_list: resp });
    }).catch(error => {
      console.log(error);
    });

    axios.get('http://localhost:8000/ordered_users').then(resp => {
      this.setState({ ordered_users: resp });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const users = this.state.ordered_users.data;
    const debt = this.state.debt_list.data;

    return (
      <div>
        <div className="center">
          <button className="ui large button center" onClick={this.updateState}>Check payments for user</button>
        </div>

        <div className="payments_div">
          {debt !== undefined ?
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
                {debt.map(i =>
                  <tr key={i.id} className="">
                    <td className="">{i.name} {i.surname}</td>
                    <td className="">{i.day}</td>
                    <td className="">{i.start_hour}:{i.start_minute < 10 ? '0' + i.start_minute : i.start_minute}</td>
                    <td className="">{i.price} €</td>
                  </tr>
                )}
              </tbody>
            </table>
            : <Loading />}
        </div>

        {this.state.visibility ?
          <div className="half_page">
            <div className="ui attached message">
              <i className="close icon" onClick={this.updateState}></i>
              <div className="content">
                <div className="header">Check payments for user</div></div></div>

            {debt !== undefined ?
              <form className="ui form attached fluid segment" method="post" style={{ display: "inline-block", overflowY: "scroll", overflowX: "hidden" }}>
                <div className="equal width fields" style={{ display: "inline-block" }}>
                  {users.map(i =>
                    <div key={i.id} className="field">
                      <div className="ui fluid input">
                        <h3><a href={'/providerpayments/' + i.id}>{i.name} {i.surname}</a></h3>
                      </div>
                      <br></br>
                    </div>
                  )}
                </div>
              </form>
              : <Loading />}
          </div>

          : null}

      </div>
    );
  }
}

let container = document.getElementById('payments');
const root = ReactDOM.createRoot(container);
root.render(<Payments />);