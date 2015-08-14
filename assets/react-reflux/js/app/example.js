/**
 * simple test.
 */

var Actions = Reflux.createActions([
    'add',
    'del'
  ]);

var store = Reflux.createStore({
  listenables : Actions,
  onAdd : function(i){
    i++
    this.trigger(i);
  },
  onDel : function(i){
    i--;
    this.trigger(i);
  }
});

var Component = React.createClass({
  mixins : [Reflux.connect(store, 'data')],
  getInitialState : function(){
    return {data : 0}
  },
  add : function(){
    Actions.add(this.state.data);
  },
  del : function(){
    Actions.del(this.state.data);
  },
  render : function(){
    return (
      <div>
        <p>{this.state.data}</p>
        <p onClick={this.add}>add</p>
        <p onClick={this.del}>del</p>
      </div>
    );
  }
})

React.render(<Component />, document.getElementById('example'));
