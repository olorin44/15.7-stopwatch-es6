"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch() {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};

		_this.start = _this.start.bind(_this);
		_this.stop = _this.stop.bind(_this);
		_this.clear = _this.clear.bind(_this);
		_this.format = _this.format.bind(_this);
		return _this;
	}

	_createClass(Stopwatch, [{
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({
					running: true
				});
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: "format",
		value: function format() {
			var times = this.state.times;
			function pad0(value) {
				var result = value.toString();
				if (result.length < 2) {
					result = '0' + result;
				}
				return result;
			}
			return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: "calculate",
		value: function calculate() {
			var _state$times = this.state.times,
			    minutes = _state$times.minutes,
			    seconds = _state$times.seconds,
			    miliseconds = _state$times.miliseconds;

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
					minutes: minutes,
					seconds: seconds,
					miliseconds: miliseconds
				}
			});
		}
	}, {
		key: "stop",
		value: function stop() {
			this.setState({
				running: false
			});
			clearInterval(this.watch);
		}
	}, {
		key: "clear",
		value: function clear() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: "step",
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"nav",
					{ className: "controls" },
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.start },
						"Start"
					),
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.stop },
						"Stop"
					),
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.clear },
						"Clear"
					)
				),
				React.createElement(
					"div",
					{ className: "time" },
					this.format()
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

var App = function (_React$Component2) {
	_inherits(App, _React$Component2);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: "render",
		value: function render() {
			return React.createElement(Stopwatch, null);
		}
	}]);

	return App;
}(React.Component);

var app = React.createElement(App, null);
ReactDOM.render(app, document.getElementById('stopwatch'));
