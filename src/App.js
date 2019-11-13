import React, { useState, useEffect } from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ["ryan", "mark", "mark2"],
      tempName: "",
      duration: ""
    };
  }

  // call api here
  componentDidMount() {
    axios
      .get("https://panjs.com/ywc.json")
      .then(res => this.setState({ duration: res.data.duration }));
  }

  addNameToList(text) {
    const list = this.state.name;
    list.push(text);

    this.setState({
      name: list
    });
  }

  saveInputToTemp(text) {
    console.log(text);
    this.setState({
      tempName: text
    });
  }

  render() {
    return (
      <div>
        {/* list - key */}
        {this.state.name.map(aname => (
          <Child text={aname} key={aname} />
        ))}

        {/* event */}
        <input onChange={event => this.saveInputToTemp(event.target.value)} />
        <button onClick={() => this.addNameToList(this.state.tempName)}>
          submit
        </button>

        {/* call api */}
        <div>ระยะเวลา {this.state.duration}</div>

        {/* react hooks */}
        <Hooks />
      </div>
    );
  }
}

class Child extends React.Component {
  render() {
    if (this.props.aaa) {
      return <div>You're not ryan. you're {this.props.text}</div>;
    }

    return <div>hello {this.props.text}</div>;
  }
}

function Hooks() {
  const [name, setName] = useState("ryan");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    axios.get("https://panjs.com/ywc.json").then(res => {
      setDuration(res.data.duration);
    });
  }, [duration]);

  return (
    <div>
      <input onChange={event => setName(event.target.value)} />
      {name}
      <br />
      {duration}
    </div>
  );
}

export default App;
