import logo from './logo.svg';
import './App.css';
import React from 'react';
import MindBlow from './mindblow.png';

class App extends React.Component {
  constructor(props){
    super(props)
    this.tick = this.tick.bind(this)
	this.handleInput = this.handleInput.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
	this.reset = this.reset.bind(this)
    this.state = {ticks: 5000, maxTicks: 5000, number: this.randNum(10)}
  }

  randNum(digits)
  {
	  if (typeof digits === undefined) throw "randNum expects one integer parameter"
	  let num = Math.floor(Math.random()*Math.max(Math.pow(10,digits),1)).toString();
	  return (num.length === digits ? num : "0" + num)
  }
  componentDidMount(){
    this.timer = setInterval(this.tick, 10);
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
  reset()
  {
	  this.setState({done:false,timerDone:false,number: this.randNum(10),ticks: this.state.maxTicks})
  }
  render(){
	  let intHeight = 30
	  let height = intHeight +"px";
	  let fill = null
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
			<input type="number" style={{ width:"50%", fontSize:height}} onChange={this.handleInput}/>
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
			<div>
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
				{"Your answer: " + this.state.answer}
				</h2>
				<button className="submit" onClick={this.reset}>
					Try Again
				</button>
			</div>)
	  }
	return <div className="centered" style={{width: "100%", textAlign: "center",marginTop:"10%"}}>
		{fill}
    </div>
  }
}


export default App;
