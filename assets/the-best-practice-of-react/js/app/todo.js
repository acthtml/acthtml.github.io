var TodoItem = React.createClass({
  toggle : function(e){
    var checked = e.target.checked,
        index = this.props.index,
        type = this.props.type,
        done = type == 'todo';

    this.props.onToggle(done, index)
  },
  del : function(){
    this.props.onDel(this.props.type, this.props.index);
  },
  render : function(){
    return (
      <li>
        <span>{this.props.index + 1}</span>
        <input type="checkbox" onChange={this.toggle} checked={this.props.type=='done'}/>
        <a onClick={this.del}>del</a>
        <h5>{this.props.title}</h5>
      </li>
    );
  }
});

var TodoList = React.createClass({
  render : function(){
    var type = this.props.type,
        toggle = this.props.onToggle,
        del = this.props.onDel,
        items = this.props.items.map(function(item, index){
      return <TodoItem title={item.title} index={index} type={type} onToggle={toggle} onDel={del}/>;
    })

    return (
      <ul>
        {items}
      </ul>
    )
  }
})

var TodoTextInput = React.createClass({
  submit : function(e){
    if(e.keyCode != 13) return;

    var text = this.refs.input.getDOMNode().value;

    if(text == '') return;

    this.props.onTextSubmit(text);

    this.refs.input.getDOMNode().value = ''
  },

  render : function(){
    return (
      <input type="text" placeholder="to do sth..." onKeyDown={this.submit} ref="input" />
    )
  }
})

var TodoApp = React.createClass({
  getInitialState : function(){
    return {todo : [], done : []}
  },
  add : function(text){
    this.state.todo.push({title:text});
    this.setState(this.state);
  },
  done : function(index){
    var item = this.state.todo.splice(index, 1)
    this.state.done.push(item[0]);
    this.setState(this.state);
  },
  undone : function(index){
    var item = this.state.done.splice(index, 1)
    this.state.todo.push(item[0]);
    this.setState(this.state);
  },
  toggle : function(done, index){
    done ? this.done(index) : this.undone(this);
  },
  allDone : function(){
    this.state.done = this.state.done.concat(this.state.todo);
    this.state.todo = [];
    this.setState(this.state);
  },
  del : function(type, index){
    this.state[type].splice(index, 1);
    this.setState(this.state);
  },
  render : function(){
    return (
      <div className="todo">
        <TodoTextInput onTextSubmit={this.add} />
        <div className="todo-list">
          <button onClick={this.allDone}>All done.</button>
          <TodoList items={this.state.todo} type="todo" onToggle={this.toggle} onDel={this.del}/>
        </div>
        <div className="done-list">
          <h3>Done:</h3>
          <TodoList items={this.state.done} type="done" onToggle={this.toggle} onDel={this.del}/>
        </div>
      </div>
    );
  }
})

React.render(<TodoApp /> , document.getElementById('todo'))
