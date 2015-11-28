var MyComponent = React.createClass({
	render: function() {
		return <div className="note">
					<span>
						<button className="button"><i className="fi-pencil"></i></button>
						<button className="button"><i className="fi-trash"></i></button>
					</span>
			</div>
	}
});

ReactDOM.render(
	<MyComponent text="yo">This is a hello.</MyComponent>,
	document.getElementById('root')
);