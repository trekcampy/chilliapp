import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

var destination = document.querySelector("#root");
var xhr;

class MainPanel extends Component {
    chilliData = [
        { "scoville": 20000, "name": 'Raja1' },
        { "scoville": 1, "name": 'Paul' }            
    ]; 

    constructor(){
        super()  
        const chilliDataDefault = [
            { "scoville": 20000, "name": 'Raja1' },
            { "scoville": 1, "name": 'Paul' }            
        ]; 

        this.state = { 
            chilliData : chilliDataDefault,
            topInput : 10,
            bottomInput : 10,
            topSelect : -1,
            bottomSelect : -1
         }
        this.processRequest = this.processRequest.bind(this);
        this.topSelectChange = this.topSelectChange.bind(this);
        this.bottomSelectChange = this.bottomSelectChange.bind(this);
        this.topInputChange = this.topInputChange.bind(this);
        this.bottomInputChange = this.bottomInputChange.bind(this);

    }
    createSelectItems() {
        console.log("Inside Create Select Items")
        console.log(this.state.chilliData)
        console.log(this.state.chilliData[0].scoville)

        if (this.state.topSelect === -1) {
            var defaultSelect = this.state.chilliData[0].scoville
        
            this.setState(function (state, prop) {
                state.topSelect = defaultSelect;
                state.bottomSelect =  defaultSelect;
                return null;
            });
        }

        return this.state.chilliData.map((e, key) => {
                return <option key={key} value={e.scoville}>{e.name}</option>;
            })
    } 

    componentDidMount() {
        xhr = new XMLHttpRequest();
        xhr.open("GET","http://172.16.42.3:8000/chillilist",true);
        xhr.send();

        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {

        console.log(xhr.readyState)
        console.log(xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
            var respObj = JSON.parse(xhr.responseText);
            this.setState((prevState, props) => {
                return {chilliData: respObj};
            });

        }
    }

    topSelectChange(event){

        console.log("Top Select Change")
        console.log(this.state.topInput)
        console.log(event.target.value)
        console.log(this.state.bottomSelect)

        var newBottomInput = Math.round((this.state.topInput * event.target.value)/this.state.bottomSelect,5);

        this.setState({topSelect : event.target.value})
        this.setState({bottomInput : newBottomInput })

    }

    bottomSelectChange(event){

        console.log("Bottom Select Change")
        console.log(this.state.topInput)
        console.log(this.state.topSelect)
        console.log(event.target.value)

        var newBottomInput = Math.round((this.state.topInput * this.state.topSelect)/event.target.value,5);

        this.setState({bottomSelect : event.target.value})
        this.setState({bottomInput : newBottomInput })
 
    }

    topInputChange(event){

        console.log("Top Input  Change")
        console.log(event.target.value)

        var newBottomInput = Math.round((event.target.value * this.state.topSelect)/this.state.bottomSelect,5);

        this.setState({topInput: event.target.value})
        this.setState({bottomInput : newBottomInput })
 
    }

    bottomInputChange(event){

        console.log("Bottom Input Change")
        console.log(event.target.value)

        var newTopInput = Math.round((event.target.value * this.state.bottomSelect)/this.state.topSelect,5);

        this.setState({bottomInput : event.target.value})
        this.setState({topInput : newTopInput })
 
    }

    render() {
        return (
            <div className="mainpanel">
                <div className="subpanel">
                    <input className="input" onChange={this.topInputChange} value={this.state.topInput}>
                    </input>
                    <select className="chilli-list" onChange={this.topSelectChange}>
                        {this.createSelectItems()}
                    </select>
                </div>
                <br></br>
                <div className="subpanel">
                    <input className="input" onChange={this.bottomInputChange} value={this.state.bottomInput}>
                    </input>
                    <select className="chilli-list" onChange={this.bottomSelectChange}>
                        {this.createSelectItems()}
                    </select>
                </div>  
            </div>              
        );
    }
}
ReactDOM.render(
    <div>
        <MainPanel />
    </div>,
    destination
);