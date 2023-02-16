'use strict';
'use axios';
//import Schedule from './schedule'

// Schedule Table 
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    }

  day(extra_days){
    var d = new Date();
    d.setDate(d.getDate() + (((1 - d.getDay()) % 7) || 7) + (this.props.extra_weeks * 7) + extra_days);

    var day = d.getDate() + '.' + (d.getMonth()+1); 
    console.log("day");
    console.log(d.getDate(), d.getMonth());

    return day;
  }
  
  render() {
    
    return (
      <div>
        <table className="ui celled fixed single line table">
  <thead>
    <tr>
      <th>Time</th>
      <th>Monday<br></br>{ this.day(0) }</th>
      <th>Tuesday<br></br>{ this.day(1) }</th>
      <th>Wednesday<br></br>{ this.day(2) }</th>
      <th>Thursday<br></br>{ this.day(3) }</th>
      <th>Friday<br></br>{ this.day(4) }</th>
      <th>Saturday<br></br>{ this.day(5) }</th>
      <th>Sunday<br></br>{ this.day(6) }</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>8:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>9:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>10:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>11:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>12:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>13:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>14:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>15:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>16:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>17:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>18:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>19:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>20:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <td>21:00</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>

    );}
}

//appointment cards
class Appointment extends React.Component {

  constructor(props){
    super(props);
    }

  extra_days(dayt){
    var monday = new Date();
    monday.setDate(monday.getDate() + (((1 - monday.getDay()) % 7) || 7) + (this.props.extra_weeks * 7));

    var day = new Date(dayt);
    
    console.log("extra weeks", this.props.extra_weeks);
    console.log("day", day,  day.getDate());
    console.log("monday", monday,  monday.getDate());
    console.log("minus", day,  day.getDate() - monday.getDate());

    return day.getDate() - monday.getDate();
  }

  appointment_height(duration){
    console.log(duration);
    if(duration == "1h") return '15.57%';
    else if(duration == "45min") return '11.69%';
    else if(duration == "2h") return '30.16%';
    return '0%';
  }

  right(day){
    if (this.extra_days(day) < 0 || this.extra_days(day) > this.extra_days(day) > 6){
        return '120%';
    }
    var days = (7 - this.extra_days(day) - 1) * 12.5 + 0.15;
    console.log(days);
    return days + '%';
  }

  top(hour, minute){
    console.log(hour, minute);
    var position =  18.25 + 7.5 * ((hour - 8) + (minute / 60));
    return position + '%';
  }

  end_time(duration, start_hour, start_minute){

    var end_hour = parseInt(start_hour, 10);
    var end_minute = parseInt(start_minute, 10);

    if(duration == "1h"){
      end_hour++;
    }
    else if(duration == "2h"){
      end_hour+= 2;
    }
    else if(duration == "45min"){
      end_hour = start_hour;
      end_minute = start_minute;

      if(start_minute < 15){
        end_minute = Number(start_minute) + 45;
      }
      else if(start_minute == 15){
        end_hour++;
        end_minute = 0;
      }
      else{
        end_hour++;
        end_minute = Number(( 45 - (60 - start_minute) )); 
      }
    }
    else{
      var hours = parseInt((duration.toString().slice(0, 2)), 10);
      var minutes = parseInt((duration.toString().slice(3, 2)), 10);
      end_hour += hours;

      if(start_minute + minutes >= 60){
        end_minute = ( start_minute + minutes  ) - 60;
        end_hour++;
      }
      else{
        end_minute = start_minute + minutes;
      }
    }
    return end_hour + ':' + end_minute;
  }

  
  render() {
    return (
      <div>
        <div className="ui cards" style={{ height: this.appointment_height(this.props.duration), right: this.right(this.props.day), top: this.top(this.props.start_hour, this.props.start_minute)}}><div className="ui card" ><div className="header">{ this.props.start_hour }:{ this.props.start_minute } - { this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute) }</div></div></div>
        <Separator extra_weeks={this.props.extra_weeks} start_time={this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute)} alt={this.props.alt} lng={this.props.lng} day={this.props.day} right={this.right(this.props.day)} top={this}
                   extra_days={this.extra_days} end_time={this.end_time} 
        />
      </div>
    );}
}

//separator cards
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

//parent class
class CompleteSchedule extends React.Component{

    constructor() {
        super();
        this.state = {
            extra_weeks: 0
        };
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        }

    nextWeek(){ 
            var z = this.state.extra_weeks + 1;
            this.setState({extra_weeks: z});
            console.log("extra_weeks", this.state.extra_weeks);
              }
        
    previousWeek(){
            var z = this.state.extra_weeks;
            if(z > 0){
              z--;
              console.log("extra_weeks", z);
              this.setState({extra_weeks: z});
            }
        }
    render(){
                return(
                    <div>
                        <Schedule extra_weeks={this.state.extra_weeks}/>
                        <br></br>
                        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="Previous item" type="prevItem" className="item" onClick={this.previousWeek}>⟨</a>
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="2" aria-label="Next item" type="nextItem" className="item" onClick={this.nextWeek}>⟩</a>
                        </div>  

                        <ul>
                          {window.context.map(i => 
                            <div  key = {i.appointment_id}>
                                <Appointment extra_weeks={this.state.extra_weeks} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} alt={i.alt} lng={i.lng} day={i.day} />
                            </div>
                            )}
                        </ul>

                    </div>
                )
            }
}

let container2 = document.getElementById('complete_schedule');
const root = ReactDOM.createRoot(container2);
root.render(<CompleteSchedule />); 