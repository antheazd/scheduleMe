'use strict';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.updateState = this.updateState.bind(this)
  }

  updateState(){ 
    this.setState({visibility: !this.state.visibility});
  }

  render() {
    
    return (
      <div>
        <div className="center">
        <button className="ui large button center" onClick={this.updateState}>New chat</button>
        </div>

        <div className="half_page">
                <ul>
                    {window.users.map(i => 
                    <div key={i.user_id}>
                      <div className="ui segment">
                        <h3 className="ui header">
                          <a href={'/adminchat/' + i.user_id}>{i.name} {i.surname}</a>
                        </h3>
                      </div>
                    </div>
                    )}
                </ul>
        </div>

      {this.state.visibility?
          <div class="half_page">
            <div class="ui attached message">
              <div class="content">
                <form className="ui form attached fluid segment" method="post">
                {window.other_users.map(i => 
                    <div key={i.user_id}>
                      <div className="ui segment">
                        <h3 className="ui header">
                          <a href={'/adminchat/' + i.user_id}>{i.name} {i.surname}</a>
                        </h3>
                      </div>
                    </div>
                    )}
                </form>
              </div>
            </div>
          </div>
        : null}
      
      </div>
    );}
}

let container = document.getElementById('inbox');
const root = ReactDOM.createRoot(container);
root.render(<Inbox />);