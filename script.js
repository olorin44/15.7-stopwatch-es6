class Stopwatch extends React.Component {
	constructor() {
		super();
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		}

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.clear = this.clear.bind(this);
		this.format = this.format.bind(this);
	}

	start() {
		if (!this.state.running) {
			this.setState({
				running: true
			});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	format() {
		const times = this.state.times;
		function pad0(value) {
			let result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;  
		}
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	calculate() {
		let {minutes, seconds, miliseconds} = this.state.times;
		miliseconds += 1;
		if (miliseconds >= 100) {
			seconds += 1;
			miliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
		}

		this.setState({
			times: {
				minutes,
				seconds,
				miliseconds
			}
		})
	}

	stop() {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}

	clear() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
	}

	render() {
		return (
		<div>
			<nav className="controls">
				<a href="#" className="button" onClick={this.start}>Start</a>
				<a href="#" className="button" onClick={this.stop}>Stop</a>
				<a href="#" className="button" onClick={this.clear}>Clear</a>
			</nav>
			<div className="time">{this.format()}</div>
		</div>
		)
	}
}

class App extends React.Component {
	render() {
		return <Stopwatch />
	}
}

var app = <App/>;
ReactDOM.render(app, document.getElementById('stopwatch'));