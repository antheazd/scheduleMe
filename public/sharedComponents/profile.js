'use strict';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&language=hr&output=json&key=AIzaSyBL1NQunxEmWEwwsdPkxpZY9A9gqD_csl8";
    script.async = true;
    document.body.appendChild(script);
  }
  autocomplete() {
    let address = document.getElementById('address');
    const options = {
        componentRestrictions: { country: "cro" }
      };
    let autocomplete = new google.maps.places.Autocomplete(address);

    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      document.getElementById('alt').value = latitude;
      document.getElementById('lng').value = longitude;
      console.log(longitude);
    });
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

                <form className="ui form" method="post">
                        <div className="field">
                              <h3>Location</h3>
                            <input type="text" id="address" name="description" onClick={this.autocomplete} placeholder="Anything you want!"/>
                        </div>
                            <input type="hidden"  id="alt" name="alt"/>
                            <input type="hidden" id="lng" name="lng"/>
                        <button className="ui blue button">Change location</button>
                </form>
            </div>
          </div>
          </div>
        </div>
      </div>

    );  
    }
}

let container = document.getElementById('userprofile');
const root = ReactDOM.createRoot(container);
root.render(<Profile />);
