'use strict';

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="full_page">
        <div className="profile_container">
          <div className="ui items">
          <div className="item">
              <div className="ui medium circular image">
              <img src="static/photos/user.png" className="ui medium circular image"/>
              </div>
              <div className="content">
                <h3 className="ui header"> Name</h3><br></br>
                  {window.context[0].name} {window.context[0].surname}
                <div className="ui hidden divider"></div>
                
                <h3 className="ui header">Email</h3><br></br>
                  {window.context[0].email}
                <div className="ui hidden divider"></div>

                <h3 className="ui header">Phone number</h3><br></br>
                  {window.context[0].phone}
                <div className="ui hidden divider"></div>
            </div>
            </div>
          </div>
        </div>
      </div>

    );  
    }
}

let container = document.getElementById('adminprofile');
const root = ReactDOM.createRoot(container);
root.render(<AdminProfile />);
