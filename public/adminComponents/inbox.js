'use strict';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_with_chat: {},
      users_without_chat: {}
    };
    this.updateState = this.updateState.bind(this)
  }

  updateState() {
    this.setState({ visibility: !this.state.visibility });
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users_with_existing_chat').then(resp => {
      this.setState({ users_with_chat: resp });
    }).catch(error => {
      console.log(error);
    });

    axios.get('http://localhost:8000/users_without_chat').then(resp => {
      this.setState({ users_without_chat: resp });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const users_with_chat = this.state.users_with_chat.data;
    const users_without_chat = this.state.users_without_chat.data;

    return (
      <div>
        <div className="center">
          <button className="ui large button center" onClick={this.updateState}>New chat</button>
        </div>

        <div className="half_page">
          <ul>
            {users_with_chat !== undefined ?
              <div>
                {users_with_chat.map(i =>
                  <div key={i.id}>
                    <div className="ui segment">
                      <h3 className="ui header">
                        <a href={'/adminchat/' + i.id}>{i.name} {i.surname}</a>
                      </h3>
                    </div>
                  </div>
                )}
              </div>
              : <Loading />}
          </ul>
        </div>

        {this.state.visibility ?
          <div className="half_page">
            <div className="ui attached message">
              <i className="close icon" onClick={this.updateState}></i>
              <div className="content">
                <div className="header">Start a new chat!</div></div></div>
            <form className="ui form attached fluid segment" method="post" style={{ overflowY: "scroll", overflowX: "hidden" }}>
              <div className="equal width fields" style={{ display: "inline-block" }}>
                {users_without_chat !== undefined ?
                  <div>
                    {
                      users_without_chat.map(i =>
                        <div key={i.id} className="field">
                          <div className="ui fluid input">
                            <h3><a href={'/adminchat/' + i.id}>{i.name} {i.surname}</a></h3>
                          </div>
                          <br></br>
                        </div>
                      )
                    }
                  </div>
                  : <Loading />}
              </div>
            </form>
          </div>
          : null}

      </div>
    );
  }
}

let container = document.getElementById('inbox');
const root = ReactDOM.createRoot(container);
root.render(<Inbox />);