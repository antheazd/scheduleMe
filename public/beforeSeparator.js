'use strict';

class BeforeSeparator extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        duration: 0,
        display: "visible"
      };
      this.callback = this.callback.bind(this);
      this.boundCallback = this.callback.bind(this);
    }
  
    separator_top(start_time){
        var hour = parseInt(start_time.substring(0, start_time.indexOf(':')));
        var minute = parseInt(start_time.substring(start_time.indexOf(':') + 1, start_time.length));
        var position =  18.25 + 7.5 * ((hour - 8) + (minute / 60));
        
        return  position + '%';
    }
  
    separator_height(){
      var seconds = parseInt(this.state.duration);
  
      var hour = Math.floor(seconds / 3600);
      seconds -= hour * 3600;
      var minute = Math.ceil(seconds / 60);

      return ((hour +  (minute / 60)) * 15.57) + '%';
    }

    start_time(){
      var hour = parseInt(this.props.end_time.substring(0, this.props.end_time.indexOf(':')));
      var minute = parseInt(this.props.end_time.substring(this.props.end_time.indexOf(':') + 1, this.props.end_time.length));
  
      var seconds = parseInt(this.state.duration);
  
      var duration_hour = Math.floor(seconds / 3600); 
      seconds -= (duration_hour * 216000);
      var duration_minute = Math.ceil(seconds / 60);
  
      hour -= duration_hour;
      minute -= duration_minute;
  
      if(minute < 0) {
        hour --;
        minute = 60 + minute;
      }
      var zero = "";
      if(minute < 10) zero = "0";
  
      return hour + ':' + zero + minute;
    }
  
    componentDidMount() {
        if(this.props.end_time === "8:00") {console.log("hidden");this.setState({display: "none"});}
        const destination = new google.maps.LatLng(Number(window.coordinates[0].alt), Number(window.coordinates[0].lng));
        const origin = new google.maps.LatLng(Number(this.props.alt), Number(this.props.lng));
        
        var service = new window.google.maps.DistanceMatrixService();
  
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false,
            unitSystem: google.maps.UnitSystem.METRIC
          }, 
          this.callback
        );
    }
      
    
    callback(response, status) {
       if (status === 'OK') {
        this.setState({duration: response.rows[0].elements[0].duration.value});
        if(response.rows[0].elements[0].duration.value == 0) this.setState({display: "none"});
      } else {
        console.error('Error:', status);
      }
    }
  
    render() {
      return (
        <div>
          <div className="ui cards" style={{ height: this.separator_height(), right:this.props.right, top: this.separator_top(this.start_time()), display: this.state.display}}>
            <div className="ui card separator">
              <div className="header separator">{ this.start_time() } - { this.props.end_time }</div>
            </div>
          </div>
        </div>
      );}
  }