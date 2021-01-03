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
      colorLater:false,
      valueToEdit:'',
      idToEdit:'',
      notInEditMode:true
    }

    this.refs = React.createRef();
  }

  handleChange = e => {
    this.setState({newItem: e.target.value})
  }

  addItem = () => {
    const { newItem, idCounter, list, complete, 
      isInEditMode, colorLater } = this.state

    const item = {
      id: idCounter,
      value: newItem,
      complete: complete,
      isInEditMode: isInEditMode,
      colorLater,
    }
    const newList = [...list, item]
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

  changeStatus = (id, buttonCode) => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          switch (buttonCode) {
            case '1': //Toggling Done/Complete
              return {
                ...item,
                complete: !item.complete,
              };
            case '2': //Toggling ToDo Later
              return {
                ...item,
                colorLater: !item.colorLater,
              };
            case '3': // Toggling No Edit (X Button)
              return {
                ...item,
                isInEditMode: !item.isInEditMode,
              };
            case '4': // Saving Value
              return {
                ...item,
                isInEditMode: !item.isInEditMode,
                value: this.state.newItem,
                valueToEdit:'',
              };
          }
        } else { return item;
        }
      }
      )
    })
  }

  renderEdit = item => {
    return <div style={{display: "flex", justifyContent:"center"}}>
              <div key={item.id} 
                  style={{ textDecoration: item.complete ? 'line-through': '' }}>
                    <input 
                    type="text" 
                    defaultValue={item.value}
                    ref = {() => this.input = item.valueToEdit}
                    onChange = {this.handleChange}
                    // onChange = {e=> this.setState({valueToEdit: e.target.value})}
                    /> 
              </div>            
              <button onClick={
                () => this.changeStatus(item.id, '3')}> X </button>
              <button onClick={
                () => this.changeStatus(item.id, '4')}>Save</button>
            </div>
  }

  renderDefault = item => {
    return <div style={{display: "flex", justifyContent:"center"}}>
              <div key={item.id} 
                  style={{ 
                    textDecoration: item.complete ? 'line-through': '',
                    color: item.colorLater ? '#FF0000':'',
                        }}
                  onDoubleClick={()=>this.changeStatus(item.id, '3')}>
                      {item.value}     
              </div>
              <button onClick={
                () => this.itemDel(item.id)}> Remove </button>
              <button onClick={
                  () => this.changeStatus(item.id, '1')}>Done</button>
              <button onClick={
                ()=> this.changeStatus(item.id, '2')}>Do Later</button>
            </div> 

  }

  updateToShow = s => {
    this.setState({
      toDoShow: s
    })
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

            <button onClick={this.addItem}>Add</button>
            <br />
            <ul>
              {list.map(item => {
                return item.isInEditMode ?
                this.renderEdit(item) : this.renderDefault(item);
                }
              )}
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
