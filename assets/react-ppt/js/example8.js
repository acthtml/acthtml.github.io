var actions = Reflux.createActions(['add', 'minus']);

var store = Reflux.createStore({
  listenables : actions,
  getInitialState : () => 100,
  onAdd : function(num){
    num ++;
    this.trigger(num);
  },
  onMinus : function(num){
    num--;
    this.trigger(num);
  }
});

var App = React.createClass({
  mixins : [Reflux.connect(store, 'num')],
  add : function(){
    actions.add(this.state.num);
  },
  minus : function(){
    actions.minus(this.state.num);
  },
  render : function(){
    return (
      <div className="spinner">
        <span onClick={this.minus}>-</span>
        <strong>{this.state.num}</strong>
        <span onClick={this.add}>+</span>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('wrapper'));
