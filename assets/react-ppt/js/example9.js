/**
 * Todo App
 */

var TodoActions = Reflux.createActions(['add', 'complete', 'incomplete', 'del']);
var TodoStore = Reflux.createStore({
  listenables : TodoActions,
  getInitialState : function(){
    this.state = {incompleted : [], completed : []};
    return this.state;
  },
  onAdd : function(text){
    this.state.incompleted.push(text);
    this.trigger(this.state)
  }
})
