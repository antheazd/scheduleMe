'use strict';

class Separator extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        duration: 0
      };
      this.callback = this.callback.bind(this);
      this.boundCallback = this.callback.bind(this);
    }
  
    separator_top(start_time){
      var hour = parseInt((start_time.slice(0, 2)), 10);
      var minute = parseInt((start_time.slice(3, 4)), 10);
      console.log("start", hour, minute);
      var position =  18.25 + 7.5 * ((hour - 8) + (minute / 60));
      return  position + '%';
    }
  
    separator_height(){
      var seconds = parseInt(this.state.duration);
  
      var hour = Math.floor(seconds / 216000);
      seconds -= hour * 3600;
      var minute = Math.ceil(seconds / 3600);
  
      console.log("h min", hour, minute);
      return ((hour +  (minute / 60)) * 15.57) + '%';
    }
  
    componentDidMount() {
        const origin = new google.maps.LatLng(Number(window.coordinates[0].alt), Number(window.coordinates[0].alt));
        const destination = new google.maps.LatLng(Number(this.props.alt), Number(this.props.lng));
  
        var service = new window.google.maps.DistanceMatrixService();
  
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false,
            unitSystem: window.google.maps.UnitSystem.IMPERIAL
          }, 
          this.callback
        );
    }
      
    
    callback(response, status) {
       if (status === 'OK') {
        this.setState({duration: response.rows[0].elements[0].duration.value});
        console.log("seconds ", this.state.duration);
      } else {
        console.error('Error:', status);
      }
    }
  
  
    end_time(){
      var hour = parseInt(this.props.start_time.substring(0, this.props.start_time.indexOf(':')));
      var minute = parseInt(this.props.start_time.substring(this.props.start_time.indexOf(':') + 1, this.props.start_time.length));
  
      var seconds = parseInt(this.state.duration);
  
      var duration_hour = Math.floor(seconds / 216000);
      seconds -= (duration_hour * 216000);
      var duration_minute = Math.ceil(seconds / 3600);
  
      hour += duration_hour;
      minute += duration_minute;
  
      if(minute >= 60) {
        hour ++;
        minute -= 60;
      }
  
      return hour + ':' + minute;
    }
  
    
    render() {
      return (
        <div>
          <div className="ui cards" style={{ height: this.separator_height(), right:this.props.right, top: this.separator_top(this.props.start_time)}}>
            <div className="ui card grey" >
              <div className="header grey">{ this.props.start_time } - { this.end_time() }</div>
            </div>
          </div>
        </div>
      );}
  }