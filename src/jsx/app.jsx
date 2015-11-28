var MyComponent = React.createClass({
	render: function() {
		return <div className="note">
				<h1>{this.props.text}</h1>
				<p>{this.props.children}</p>
		</div>
	}
});

ReactDOM.render(
	<div><MyComponent text="yo">This is a hello.</MyComponent>
	<MyComponent text="hey">This is a hey.</MyComponent>
	<MyComponent text="what's happening">This is a what is happening.</MyComponent></div>,
	document.getElementById('root')
);