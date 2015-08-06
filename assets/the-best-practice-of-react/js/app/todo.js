var TodoItem = React.createClass({
  render : function(){
    <li>
      <input type="checkbox" ref="checkbox" />
      <h5>{this.props.title}</h5>
      <span>del</span>
    </li>
  }
})
