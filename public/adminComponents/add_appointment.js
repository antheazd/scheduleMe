'use strict';

class AddAppointment extends React.Component {
  constructor() {
    super();
    this.state = {visibility: false}
    this.updateState = this.updateState.bind(this)}

    updateState(){ 
      if(this.state.visibility == true){
        this.setState({visibility: false}) }
      else{
        this.setState({visibility: true}) 
      }
    }

  render() {
    return (
        <div>
          <div className="center"><button className="ui basic button" onClick={this.updateState}>Add appointment</button></div>    

          {this.state.visibility ?
          <div className="ui center aligned container">
              <div className="half_page">
              <div className="ui attached message">
              <i className="close icon" onClick={this.updateState}></i>
              <div className="content">
              <div className="header">Add your appointment</div>
                  <p>Fill out the form below</p></div></div>
                  <form className="ui form attached fluid segment" method="post" href="/schedule">
                      <div className="equal width fields">

                        <div className="field">
                          <label>Date</label>
                          <input type="date" id="day" name="day"  min="2022-01-01" max="2025-12-31"></input>
                        </div>

                        <div className="field">
                          <label>Sat</label>
                          <select id="start_hour" name="start_hour">
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>Minute</label>
                          <select id="start_minute" name="start_minute">
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option>
                            </select>
                        </div>
                      </div>

                  <div className="equal width fields">
                    
                        <div className="field">
                        <label>Trajanje</label>
                          <select id="duration" name="duration">
                          <option value="2h">2 hours</option>
                            <option value="1h">1 hour</option>
                            <option value="45min">45 minutes</option>
                          </select>
                        </div>
                      

                        <div className="field">
                          <label>Vrsta</label>
                          <select id="type" name="type">
                            <option value="Fizikalna terapija">Fizikalna terapija</option>
                            <option value="Trening">Trening</option>
                            <option value="Masaza">Masaža</option>
                          </select>
                        </div>
                      </div>  

                      <div className="equal width fields">
                        <div className="field">
                            <label>User</label>
                            <select id="id" name="id">
                                {window.users.map(it => 
                                      <option key = { it.users_id } value={ it.users_id }>{ it.name } { it.surname }</option>
                              )}
                            </select>
                          </div>
                      </div>

                      <button className="ui blue button">Submit</button>
                  </form>
                  </div>
                
              </div>
        : null}
        </div>
    );}
  }

let container = document.getElementById('add_appointment');
const root = ReactDOM.createRoot(container);
root.render(<AddAppointment />);