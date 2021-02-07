import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

var destination = document.querySelector("#root");
var xhr;


class MainPanel extends Component {

    constructor(){
        super()  
        const chilliDataDefault = [
            { "scoville": 1, "name": '--' },
        ]; 

        this.state = { 
            chilliData : chilliDataDefault,
            topInput : 1,
            bottomInput : 1,
            topSelect : 1,
            bottomSelect : 1
        }

        this.processRequest = this.processRequest.bind(this);
        this.topSelectChange = this.topSelectChange.bind(this);
        this.bottomSelectChange = this.bottomSelectChange.bind(this);
        this.topInputChange = this.topInputChange.bind(this);
        this.bottomInputChange = this.bottomInputChange.bind(this);

        this.computeCount = this.computeCount.bind(this);

    }
    createSelectItems() {
        console.log("Inside Create Select Items")
        console.log(this.state.chilliData)
        console.log(this.state.chilliData[0].scoville)
        console.log(this.state.topSelect)
        console.log(this.state.bottomSelect)

        return this.state.chilliData.map((e, key) => {
                return <option key={key} value={e.scoville}>{e.name} - ({e.scoville})</option>;
            })
    } 

    componentDidMount() {
        xhr = new XMLHttpRequest();
        console.log(process.env)
        let restAPI = "/chillilist";
        xhr.open("GET",restAPI,true);
        xhr.send();
        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {

        console.log(xhr.readyState)
        console.log(xhr.status)
        if (xhr.readyState === 4 && xhr.status === 200) {
            var respObj = JSON.parse(xhr.responseText);
            this.setState((state, props) => {
                state.topSelect = respObj[0].scoville;
                state.bottomSelect = respObj[0].scoville;
                return {chilliData: respObj};
            });

        }
    }

    computeCount(fromCount, fromScoville, toScoville) {
        let count;
 
        if (toScoville !== 0)
            count = ((fromCount * fromScoville)/toScoville).toFixed(2);

        return count
    }
    
    topSelectChange(event){

        console.log("Top Select Change")
        console.log(this.state.topInput)
        console.log(event.target.value)
        console.log(this.state.bottomSelect)

        var newBottomInput = this.computeCount(this.state.topInput,
                                            event.target.value,
                                            this.state.bottomSelect);

        this.setState({topSelect : event.target.value})
        this.setState({bottomInput : newBottomInput })

    }

    bottomSelectChange(event){

        console.log("Bottom Select Change")
        console.log(this.state.topInput)
        console.log(this.state.topSelect)
        console.log(event.target.value)

        var newBottomInput = this.computeCount(this.state.topInput, 
                                            this.state.topSelect,
                                            event.target.value);

        this.setState({bottomSelect : event.target.value})
        this.setState({bottomInput : newBottomInput })
 
    }

    topInputChange(event){

        console.log("Top Input  Change")
        console.log(event.target.value)
        console.log(this.state.topSelect)
        console.log(this.state.bottomSelect)
        console.log(this.state.bottomInput)
        console.log(event.target.value)

        var newBottomInput = this.computeCount(event.target.value,
                                            this.state.topSelect,
                                            this.state.bottomSelect);

        this.setState({topInput: event.target.value})
        this.setState({bottomInput : newBottomInput })
 
    }

    bottomInputChange(event){

        console.log("Bottom Input Change")
        console.log(this.state.topInput)
        console.log(this.state.topSelect)
        console.log(this.state.bottomSelect)
        console.log(event.target.value)

        var newTopInput = this.computeCount(event.target.value, 
                                        this.state.bottomSelect, 
                                        this.state.topSelect);

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
