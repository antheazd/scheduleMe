'use strict';

// Schedule Table 
class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {extra_weeks: 0};
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
    }

  nextWeek(){ 
    var z = this.state.extra_weeks + 1;
    this.setState({extra_weeks: z}) 
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

  day(extra_days){
    var d = new Date();
    d.setDate(d.getDate() + (((1 - d.getDay()) % 7) || 7) + (this.state.extra_weeks * 7) + extra_days);

    var day = d.getDate() + '.' + d.getMonth(); 
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
      <th>Monday<br></br><span id="monday">{ this.day(0) }</span></th>
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

  <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
      <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="Previous item" type="prevItem" className="item" onClick={this.previousWeek}>⟨</a>
      <a aria-current="false" aria-disabled="false" tabIndex="0" value="2" aria-label="Next item" type="nextItem" className="item" onClick={this.nextWeek}>⟩</a>
  </div>  

</div>

    );}
}

let container = document.getElementById('schedule');
const root = ReactDOM.createRoot(container);
root.render(<Schedule />);