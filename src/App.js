import './App.css';
import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idCounter: 0,
      newItem:'',
      list:[],
      complete:false,
      toDoShow:'all',
      toggleAllComplete:true,
      isInEditMode:false,
      colorLater:false
    }

    this.refs = React.createRef();
  }

  handleChange = e => {
    this.setState({newItem: e.target.value})
  }

  addItem = () => {
    const { newItem, idCounter, list, complete, isInEditMode, colorLater } = this.state

    const item = {
      id: idCounter,
      value: newItem,
      complete: complete,
      isInEditMode: isInEditMode,
      colorLater
    }

    const newList = [...list, item]
    // newList.push(item)

    this.setState({
      idCounter:  1+Math.random(),
      list: newList,
      newItem:''
    })
  
  }

  itemDel = id => {
    const { list } = this.state
    const updList = list.filter(item => item.id !== id)
    
    this.setState({
      list: updList
    })
  }

  crossLine = e => {
    e.target.classList.toggle("crossed-line") 
  }

  toggleComplete = id => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete
          }
        } else { return item;}
      })
    })
  }

  todoLater = id => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            colorLater: !item.colorLater
          }
        } else { return item;}
      })
    })
  }

  updateToShow = s => {
    this.setState({
      toDoShow: s
    })
  }

  changeEditMode = (id) => {
    const { isInEditMode } = this.state
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isInEditMode: !isInEditMode
          }
        } else {
          return item;
        }
      })
    })
    
  }

  updateCompValue = (id) => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isInEditMode: false,
            value: item.value
          }
        } else {
          return item;
        }
      })
    })
    
  }

  componentDidMount() {
    this.refs.mainInput.focus()
  }

  render() {
    let list = []

    if (this.state.toDoShow === 'all'){
      list = this.state.list
    } else if (this.state.toDoShow === 'active') {
      list = this.state.list.filter(item => !item.complete)
    } else if(this.state.toDoShow === 'complete'){
      list = this.state.list.filter(item => item.complete)
    }

    return(
      <div className='App'>

          <div>
            <input
              type="text"
              placeholder='Add Task Here...'
              value={this.state.newItem}
              onChange={this.handleChange}
              ref = "mainInput" />

            <button onClick={this.addItem}>
              Add
            </button>

            <br />
            {/* <button onClick={this.activeTodo}>Active tasks</button> */}

            <ul>
              {list.map(item => {
                return item.isInEditMode ? 
                <div style={{display: "flex", justifyContent:"center"}}>

                  <div key={item.id} 
                      style={{ textDecoration: item.complete ? 'line-through': '' }}
                      >
                        <input type="text" ref="txtInput" defaultValue={item.value} />   
                  </div>

                  {/* <button onClick={
                    () => this.changeEditMode(item.id)}> X </button> */}
                  <button onClick={
                    () => this.updateCompValue(item.id)}>Save</button>
                  
                </div> :
                <div style={{display: "flex", justifyContent:"center"}}>

                <div key={item.id} 
                    style={{ 
                      textDecoration: item.complete ? 'line-through': '',
                      color: item.colorLater ? '#FF0000':''
                    }}
                    onDoubleClick={()=>this.changeEditMode(item.id)}>
                        {item.value} 
                        
                </div>

                <button onClick={
                  () => {
                    return this.itemDel(item.id);}}> Remove </button>
                <button onClick={
                    () => this.toggleComplete(item.id)}>Done</button>
                <button onClick={
                  ()=> this.todoLater(item.id)}>Do Later</button>
              </div>
              })}
            </ul>
          </div>

          <div>Todos left: {this.state.list.filter(item=> !item.complete).length}</div>
          <div>
            <button onClick={()=> this.updateToShow('all')}>All</button>
            <button onClick={()=> this.updateToShow('active')}>Active</button>
            <button onClick={()=> this.updateToShow('complete')}>Complete</button>
          </div>

          <div>
            <button onClick={()=>
              this.setState({
                list: this.state.list.map(item => {
                  return ({
                    ...item,
                    complete: this.state.toggleAllComplete
                  });
                }),
                toggleAllComplete: !this.state.toggleAllComplete
              })}>
                toggle all complete: {`${this.state.toggleAllComplete}`}
            </button>
          </div>
      </div>
    )
  }
}

export default App
