'use strict';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <a className="item" href={this.props.href}><button className="ui primary button">{this.props.label}</button></a>
    );
  }
}