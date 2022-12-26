'use strict';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

class Home extends React.Component {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBL1NQunxEmWEwwsdPkxpZY9A9gqD_csl8 api google maps",
  }
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
  );

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div class="ui negative message"><div class="header"></div></div>
    );}
}

let domContainer1 = document.querySelector('#message');
ReactDOM.render(<Message />, domContainer1);
