'use strict';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&language=nl&output=json&key=AIzaSyBL1NQunxEmWEwwsdPkxpZY9A9gqD_csl8";
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
        <div className="half_page">
          <div className="center">
            <img src="https://react.semantic-ui.com/images/wireframe/square-image.png" className="ui medium circular image"/>

            <form className="ui form" method="post">
              <div className="field">
                    <label>Location</label>
                  <input type="text" id="address" name="description" onClick={this.autocomplete} placeholder="Anything you want!"/>
              </div>
                  <input type="hidden"  id="alt" name="alt"/>
                  <input type="hidden" id="lng" name="lng"/>
              <button className="ui blue button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );  
    }
}

let container = document.getElementById('userprofile');
const root = ReactDOM.createRoot(container);
root.render(<Profile />);
