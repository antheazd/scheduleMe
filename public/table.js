'use strict';

class Table extends React.Component {
    constructor(props) {
      super(props);
      }
  
    day(extra_days){
      var d = new Date();
      d.setDate(d.getDate() + (((1 - d.getDay()) % 7) || 7) + (this.props.extra_weeks * 7) + extra_days);
  
      var day = d.getDate() + '.' + (d.getMonth()+1); 
  
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