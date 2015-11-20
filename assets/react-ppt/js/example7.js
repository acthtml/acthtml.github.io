// {
//   incompleted : [],
//   completed : []
// }


// - TodoApp
//   - TodoInput
//   - TodoIncompleted
//     - TodoItems
//       - TodoItem
//   - TodoCompleted

var TodoApp = React.createClass({
  getInitialState : function(){
    return {incompleted : [], completed : []};
  },

  // 添加条目
  add : function(text){
    this.state.incompleted.push(text);
    this.setState(this.state);
  },

  // 删除条目
  del : function(type, index){
    this.state[type].splice(index, 1);
    this.setState(this.state);
  },

  // 完成某条目
  complete : function(index){
    var item = this.state.incompleted.splice(index, 1);
    this.state.completed.push(item);
    this.setState(this.state);
  },

  // 取消完成某条目
  incomplete : function(index){
    var item = this.state.completed.splice(index, 1);
    this.state.incompleted.push(item);
    this.setState(this.state);
  },

  // toggle complete/incomplete
  toggle : function(type, index){
    type == 'completed' ? this.incomplete(index) : this.complete(index);
  },

  render : function(){
    return (
      <div className="todo">
        <TodoInput onAdd={this.add} />
        <TodoIncompleted items={this.state.incompleted} onToggle={this.toggle} onDel={this.del}/>
        <TodoCompleted items={this.state.completed} onToggle={this.toggle} onDel={this.del}/>
      </div>
    )
  }
})

var TodoInput = React.createClass({
  // 添加条目
  add : function(e){
    if(e.keyCode != 13) return;

    var text = this.refs.input.getDOMNode().value;
    if(text == '') return;

    this.props.onAdd(text);
    this.refs.input.getDOMNode().value = ''
  },
  render : function(){
    return(
      <input type="text" className="todo-input" placeholder="To do something..." onKeyDown={this.add} ref="input" />
    )
  }
})

var TodoIncompleted = React.createClass({
  render : function(){
    return (
      <div className="incompleted">
        <h3>To Do:</h3>
        <TodoItems {...this.props} type="incompleted" />
      </div>
    );
  }
})

var TodoCompleted = React.createClass({
  render : function(){
    return (
      <div className="completed">
        <h3>Done:</h3>
        <TodoItems {...this.props} type="completed" />
      </div>
    );
  }
})

var TodoItems = React.createClass({
  render : function(){
    var Items = this.props.items.map(function(item, i){
          return <TodoItem {...this.props} index={i} text={item} />
        }.bind(this))

    if(!this.props.items.length){
      return <div className="todo-list">暂无条目</div>
    }

    return (
      <div className="todo-list">
        <ul>
          {Items}
        </ul>
      </div>
    )
  }
})

var TodoItem = React.createClass({
  toggle : function(e){
    var index = this.props.index,
        type = this.props.type;

    this.props.onToggle(type, index)
  },
  del : function(){
    this.props.onDel(this.props.type, this.props.index);
  },
  render : function(){
    return (
      <li>
        <span>{this.props.index + 1}</span>
        <input type="checkbox" checked={this.props.type=='completed'} onChange={this.toggle} />
        <a onClick={this.del}>删除</a>
        <h3>{this.props.text}</h3>
      </li>
    );
  }
})

React.render(<TodoApp />, document.getElementById('wrapper'));


