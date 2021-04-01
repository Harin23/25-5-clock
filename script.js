class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            breakLength: 5,
            sessionLength: 25,
            endTime: 0,
            minsLeft: 25,
            secsLeft: 0
        }
    }
    render(){
        return(
            <div className="container" id="clock">
                <div className="container" id="break-time">
                    <button className="btns" id="break-increment"><i className="fa fa-sort-up fa-3x up-icon"></i></button>
                    <h6 id="break-label">Break Length:</h6>
                    <h6 id="break-length">{this.state.breakLength}</h6>
                    <button className="btns" id="break-decrement"><i className="fa fa-sort-down fa-3x down-icon"></i></button>
                </div>
                <div className="container" id="timer">
                    <h6 id="timer-label">Session</h6>
                    <h6 id="time-left">{this.state.minsLeft}:{("0"+this.state.secsLeft).slice(-2)}</h6>
                    <button className="btns-timer" id="start_stop"><i className="fa fa-play fa-3x timer-icon"></i><i className="fa fa-pause fa-3x timer-icon"></i></button>
                    <button className="btns-timer" id="reset"><i className="fa fa-undo fa-3x timer-icon"></i></button>
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