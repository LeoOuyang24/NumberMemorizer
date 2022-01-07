import logo from './logo.svg';
import './App.css';
import React from 'react';
import MindBlow from './mindblow.png';

class App extends React.Component {
	initialState = null
  constructor(props){
    super(props)
    this.tick = this.tick.bind(this)
	this.handleInput = this.handleInput.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
	this.reset = this.reset.bind(this)
	this.state = {mainMenu: true}
	this.reset(5)
  }
  start()
  {
	 this.state.digits = this.state.digits ? this.state.digits : 5
	 this.reset(this.state.digits)

  }
  reset(digits)
  {
	  if (typeof digits === "number")
			this.initialState = () => {
				return {done:false, 
						digits: digits,
						timerDone: false, 
						ticks: digits*500 + 1500 ,
						maxTicks: digits*500 + 1500, 
						number: this.randNum(digits),
						answer: undefined}
			}
	  this.setState((this.initialState()))
	  this.timer = setInterval(this.tick, 10);
  }
  randNum(digits)
  {
	  if (typeof digits === undefined) digits = 1
	  let num = Math.floor(Math.random()*Math.pow(10,Math.max(digits,1))).toString();
	  return (num.length === digits ? num : "0" + num)
  }

  tick(){
    if (this.state.ticks > 0 && !this.state.done) {
      this.setState({ticks: this.state.ticks - 10})
    }
	else if (this.state.ticks <= 0)
	{
		this.setState({timerDone:true})
	}
  }
  handleInput(event)
  {
	  this.setState({answer: event.target.value});
  }
  handleSubmit(event)
  {
	  console.log(this.state.answer,this.state.number)
	 event.preventDefault();
	 this.setState({done: true})
  }
  render(){
	  let intHeight = 30
	  let height = intHeight +"px";
	  let fill = null
	  if (this.state.mainMenu)
	  {
		  fill = <form onSubmit={(event) => {event.preventDefault();this.setState({mainMenu: false});this.start()}}>
			<div>
				Infinite mode
				<input type="checkbox" onChange={(event) => {this.setState({roguelike: !this.state.roguelike})}}/>
			</div>
			<div style={{marginTop:"1%",marginBottom:"1%"}}>
				Number of digits
				<input type="number" onChange = {(event) => {this.setState({digits: parseInt(event.target.value)})}} style={{marginLeft:"1%"}}/>
			</div>
			<input type="submit" className="submit"/>
		  </form>
	  }
	  else
	  {
		  if (!this.state.done)
		  {
			  fill = <form onSubmit={this.handleSubmit}>

			<h1 id ="number" style={{height:height}}
							onCopy = {(e) => {e.preventDefault(); return false}}>
							{!this.state.timerDone ? this.state.number : "Write the number"}
			</h1>
		  <div className="centered" id="loading" style={{height: intHeight*.1 +"px", 
										width: (this.state.ticks/this.state.maxTicks)*50+"%", 
										backgroundColor: "#555",
										marginBottom: "1%"}}></div>
			{this.state.timerDone ? <div>
				<input type="number" autoFocus style={{ width:"50%", fontSize:height}} onChange={this.handleInput}/>
				<br/>
				<input className="submit" type="submit"/> </div>: 
				undefined
			}
			</form> 
		  }
		  else
		  {
			  let correct = this.state.answer === this.state.number;
			  fill = 		(
				<div >
					<img src={ correct ? MindBlow: 
					"https://www.kindpng.com/picc/m/776-7763784_file-twemoji2-1f921-svg-twitter-clown-emoji-hd.png"}
					style={{width:"100px",height:"100px"}}/>
					<h1>
					{"You got it " + (correct ? "right!" : "wrong!")}
					</h1>
					<h2>
					{"Correct answer: " + this.state.number }
							</h2>
					<h2>
					{"Your answer: " + (this.state.answer ? this.state.answer : "nothing!")}
					</h2>
					<button className="submit" onClick={() => { 
					if (this.state.roguelike && correct) this.reset(this.state.digits + 1); else this.reset()}}>
						Try Again
					</button>
					<br/>
					<button className="submit" onClick={() => this.setState({mainMenu: true})}>
						Main Menu
					</button>
			</div>)
		  }
	  }
	return <div className="centered" style={{width: "100%", textAlign: "center",marginTop:"10%"}}>
		{fill}
    </div>
  }
}


export default App;
