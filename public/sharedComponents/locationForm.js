'use strict';

class LocationForm extends React.Component {
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

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      document.getElementById('alt').value = latitude;
      document.getElementById('lng').value = longitude;
    });
  }

  render() {
    return (
      <div className="half_page">
        <div className="ui attached message">
          <div className="content">
            <div className="header">Welcome to our site!</div>
            <p>Add location for your account</p></div></div>
        <form className="ui form attached fluid segment" method="post">
          <div className="field">
            <label>Location</label>
            <div className="ui input">
              <input type="text" id="address" name="description" onClick={this.autocomplete} placeholder="Anything you want!" />
            </div>
            <input type="hidden" id="alt" name="alt" />
            <input type="hidden" id="lng" name="lng" />
          </div>
          <Button label="Save location" />
        </form>
      </div>

    );
  }

}

let container = document.getElementById('locationform');
const root = ReactDOM.createRoot(container);
root.render(<LocationForm />);