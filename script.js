class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            breakLength: 5,
            sessionLength: 25,
            endTime: 0,
            minsLeft: 25,
            secsLeft: 0,
            paused: true,
            currTimer: "Session"
        }
        this.startStopTimer=this.startStopTimer.bind(this);
        this.timer=this.timer.bind(this);
        this.switchTimer=this.switchTimer.bind(this);
        this.updateEndTime=this.updateEndTime.bind(this);
        this.resetTimer=this.resetTimer.bind(this);
        this.updateBreakLength=this.updateBreakLength.bind(this);
        this.timerCaller;
    }
    startStopTimer(){
        if(this.state.paused==true){
            this.updateEndTime([this.state.minsLeft, this.state.secsLeft]);
            this.setState({paused: false});
            this.timerCaller = setInterval(this.timer, 200);
        }else{
            this.setState({paused: true});
            clearInterval(this.timerCaller);
        }
    }
    timer(){
        var timeLeft=this.state.endTime-Date.now();
        if(timeLeft>0){
            this.setState({
                minsLeft: Math.floor(timeLeft/60000),
                secsLeft: Math.floor((timeLeft%60000)/1000)
            });
        }else{
            clearInterval(this.timerCaller);
            this.switchTimer()
        }
    }
    updateEndTime(timerEnd){
        this.setState({
            endTime: new Date().getTime()+(timerEnd[0]*60000)+(timerEnd[1]*1000)
        });
    }
    resetTimer(){
        this.setState(state=>({
            endTime: 0,
            minsLeft: state.sessionLength,
            secsLeft: 0,
            paused: true,
            currTimer: "Session"
        }))
    }
    switchTimer(){
        if(this.state.currTimer=="Session"){
            this.setState(state=>({
                minsLeft: state.breakLength,
                secsLeft: 0,
                paused: true,
                currTimer: "Break"
            }));
            this.startStopTimer();
        }else{
            this.setState(state=>({
                minsLeft: state.sessionLength,
                secsLeft: 0,
                paused: true,
                currTimer: "Session"
            }));
            this.startStopTimer();
        }
    }
    updateBreakLength(e){
        if(e.target.parentElement.id=="break-increment"){
            this.setState(state=>({
                breakLength: state.breakLength+1
            }))
        }else{
            this.setState(state=>({
                breakLength: state.breakLength-1
            }))
        }
    }
    render(){
        return(
            <div className="container" id="clock">
                <div className="container" id="break-time">
                    <button onClick={this.updateBreakLength}className="btns" id="break-increment"><i className="fa fa-sort-up fa-3x up-icon"></i></button>
                    <h6 id="break-label">Break Length:</h6>
                    <h6 id="break-length">{this.state.breakLength}</h6>
                    <button onClick={this.updateBreakLength}className="btns" id="break-decrement"><i className="fa fa-sort-down fa-3x down-icon"></i></button>
                </div>
                <div className="container" id="timer">
                    <h6 id="timer-label">{this.state.currTimer}</h6>
                    <h6 id="time-left">{this.state.minsLeft}:{("0"+this.state.secsLeft).slice(-2)}</h6>
                    <button onClick={this.startStopTimer} className="btns-timer" id="start_stop"><i className="fa fa-play fa-3x timer-icon"></i><i className="fa fa-pause fa-3x timer-icon"></i></button>
                    <button onClick={this.resetTimer} className="btns-timer" id="reset"><i className="fa fa-undo fa-3x timer-icon"></i></button>
                </div>
                <div className="container" id="session-time">
                    <button className="btns" id="session-increment"><i className="fa fa-sort-up fa-3x up-icon"></i></button>
                    <h6 id="session-label">Session Length:</h6>
                    <h6 id="session-length">{this.state.sessionLength}</h6>
                    <button className="btns" id="session-decrement"><i className="fa fa-sort-down fa-3x down-icon"></i></button>
                </div>
            </div>
        )
    }
} 

ReactDOM.render(<App/>, document.getElementById("app"));