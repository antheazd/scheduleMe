'use strict';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }

    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&language=hr&output=json&key=AIzaSyBL1NQunxEmWEwwsdPkxpZY9A9gqD_csl8";
    script.async = true;
    document.body.appendChild(script
    );
  }
  autocomplete() {
    let address = document.getElementById('address');
    const options = {
      componentRestrictions: { country: "cro" }
    };
    let autocomplete = new google.maps.places.Autocomplete(address);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      document.getElementById('alt').value = latitude;
      document.getElementById('lng').value = longitude;
    });
  }

  location_link() {
    if (this.state.user.data !== undefined) {
      return "https://www.google.com/maps/embed/v1/view?key=AIzaSyBL1NQunxEmWEwwsdPkxpZY9A9gqD_csl8" + "&center=" + this.state.user.data.alt + "," + this.state.user.data.lng + "&zoom=14";
    }
  }


  componentDidMount() {
    axios.get('http://localhost:8000/user_location_info').then(resp => {
      this.setState({ user: resp });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const user = this.state.user.data;
    return (
      <div className="full_page">
        <div className="profile_container">
          {user !== undefined ?
            <div className="ui items">
              <div className="item">
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

                  <form className="ui form" method="post">
                    <div className="field">
                      <h3>Location</h3>
                      <input type="text" id="address" name="description" onClick={this.autocomplete} placeholder={user.description} />
                    </div>
                    <input type="hidden" id="alt" name="alt" />
                    <input type="hidden" id="lng" name="lng" />
                    <button className="ui blue button">Change location</button>
                  </form>
                </div>
              </div>
            </div>
            : <Loading />}
        </div>
        <div className="location_container">
          <iframe src={this.location_link()} style={{ width: "80%", height: "100%", border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}></iframe>
        </div>
      </div>

    );
  }
}

let container = document.getElementById('profile');
const root = ReactDOM.createRoot(container);
root.render(<Profile />);
