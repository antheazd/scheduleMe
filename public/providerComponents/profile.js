'use strict';

class ProviderProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/provider_info').then(resp => {
      this.setState({ user_info: resp });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const user = this.state.user_info.data;
    return (
      <div className="full_page">
        <div className="profile_container">
          <div className="ui items">
            <div className="item">
              {user !== undefined ?
                <div className="content">
                  <h3 className="ui header"> Name</h3><br></br>
                  {user.name} {user.surname}
                  <div className="ui hidden divider"></div>

                  <h3 className="ui header">Email</h3><br></br>
                  {user.email}
                  <div className="ui hidden divider"></div>

                  <h3 className="ui header">Phone number</h3><br></br>
                  {user.phone}
                  <div className="ui hidden divider"></div>
                </div>
                : <Loading />}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

let container = document.getElementById('profile');
const root = ReactDOM.createRoot(container);
root.render(<ProviderProfile />);
