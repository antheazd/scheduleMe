
class BeforeSeparator extends React.Component {

  constructor(props){
    super(props);
  }

  separator_top(){
    var end = parseFloat(this.props.appointment_start.substring(0, this.props.appointment_start.indexOf('%')));
    return (100 - end) + '%';
  }

  start_time(){
    var hour = parseInt(this.props.end_time.substring(0, this.props.end_time.indexOf(':')));
    var minute = parseInt(this.props.end_time.substring(this.props.end_time.indexOf(':') + 1, this.props.end_time.length));
    
    var seconds = parseInt(this.props.duration);

    var duration_hour = Math.floor(seconds / 3600); 
    seconds -= (duration_hour * 216000);
    var duration_minute = Math.ceil(seconds / 60);

    hour -= duration_hour;
    minute -= duration_minute;

    if(minute < 0) {
      hour --;
      minute = 60 + minute;
    }

    if(minute < 10) return hour + ':0' + minute;
    
    return hour + ':' + minute;
  }


  render() {
    return (
      <div>
        <div className="ui visible message" style={{ height: this.props.separator_height, right:this.props.right, bottom: this.separator_top() }}>{ this.start_time() } - { this.props.end_time }</div>
      </div>
    );}
}