'use strict';

class AfterSeparator extends React.Component {

    constructor(props){
      super(props);
    }
  
    separator_top(){
      var end = parseFloat(this.props.appointment_start.substring(0, this.props.appointment_start.indexOf('%')));
      var height = parseFloat(this.props.appointment_height.substring(0, this.props.appointment_height.indexOf('%')));

      return end + height + '%';
  }

    separator_end_time() {
      var hour = parseInt(this.props.start_time.substring(0, this.props.start_time.indexOf(':')));
      var minute = parseInt(this.props.start_time.substring(this.props.start_time.indexOf(':') + 1, this.props.start_time.length));
  
      var seconds = parseInt(this.props.duration);
  
      var duration_hour = Math.floor(seconds / 3600); //216000);
      seconds -= (duration_hour * 216000);
      var duration_minute = Math.ceil(seconds / 60); //3600);
  
      hour += duration_hour;
      minute += duration_minute;
  
      if(minute >= 60) {
        hour ++;
        minute -= 60;
      }

      if(minute < 10)  hour + ':0' + minute;
  
      return hour + ':' + minute;
    }

    render() {
      return (
        <div>
            <div className="ui visible message" style={{ height: this.props.separator_height, right:this.props.right, top: this.separator_top() }}><span className="vertical_center">{ this.props.start_time } - { this.separator_end_time() }</span></div>
        </div>
      );}
  }