import React, { Component } from 'react'
import { Card, Input, Button, Table ,Content} from 'antd'
import { Layout } from 'antd'
import api from '../api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
var math=require('mathjs')
var dataT = []
var dataA = []
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
  ];
  var fx=" "
class Onepoint extends Component{
    constructor(){
        super();
        this.state = {
            fx: "",
            xo: 0,
            showOutputChart: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    onepoint(xold){
        fx=this.state.fx;
        var xnew=0;
        var sum=0;
        var n=0;
        var data=[];
        data['x']=[];
        data['error']=[];
        do{
            xnew=this.func(xold).toFixed(6);
            console.log("xnew"+xnew);
            sum=this.error(xnew,xold).toFixed(6);
            console.log("sum"+sum);
            data['x'][n]=xnew;
            data['error'][n]=Math.abs(sum).toFixed(6);
            n++;
            console.log(n+".");
            xold=xnew;
            console.log(data['x'][n]);
        }while(Math.abs(sum)>0.000001);
        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputChart: true,
            showGraph: true
        })
    }
    func(X){
        let scope = {x:parseFloat(X)};
        var pps=math.compile(this.state.fx);
        return pps.eval(scope);
    }
    error=(xnew,xold)=>{return Math.abs((xnew-xold)/xnew);}
    createTable(x, error) {
        dataT = []
        dataA = []
        for (var i=0 ; i<x.length ; i++) {
            dataT.push({
                iteration: i+1,
                x: x[i],
                error: error[i],
            });
            dataA.push({
                iteration: i + 1,
                x: x[i],
                y: this.func(x[i]).toFixed(6),
                error: error[i],
            });
        }
    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentDidMount = async() => { 
        await api.getBisection("5e7b450fb737f838a4cf387d").then(db => {
        this.setState({
            fx:db.data.data[2].fx,
            xo:db.data.data[2].xl,
        })
        })
      }
    render(){
        return(
            <Layout style={{background: '#C9E2EF',padding: 24,minHeight: 1000, marginLeft: 0}}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Onepoint Iteration </h2>
                <div onChange={this.handleChange}>
                    <h2>Fx&nbsp;&nbsp;<Input /*placeholder="input fx here"*/ size="medium" name="fx" style={{ width: 300 }}></Input></h2>
                    <h2>X<sub>0</sub>&nbsp;&nbsp;<Input size="medium" name="xo" style={{ width: 300 }}></Input></h2>
                    <Button onClick={() => this.onepoint(parseFloat(this.state.xo))}
                            style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                    <Button onClick={() => this.onepoint(parseFloat(this.state.xo))}
                            style={{  marginLeft: 45 ,color:'#ffffff',background:'#12406A'}}>Fx : {this.state.fx} X<sub>0</sub>:{this.state.xo}</Button><br/><br/>
                </div>
                {this.state.showGraph &&
                        <div>
                                <LineChart
                                    width={950}
                                     height={400}
                                    data={dataA}
                                     margin={{ top: 30, bottom: 10 }}
                                    style={{ backgroundColor: "#fff" }}
                                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" />
                                <YAxis
                                type="number"
                                 dataKey="y"
                                 domain={["auto", "auto"]}
                                 allowDataOverflow="true"
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="linear" dataKey="y" stroke="#8884d8" />
                                </LineChart>
                           
                        </div>
                        }
                {this.state.showOutputChart &&
                            <div
                                title={"Output12"}
                                bordered={true}
                                style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                                id="output12"
                            >
                                <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} >

                                </Table>
                            </div>
                        }
            </Layout>
        )
    }
}
export default Onepoint;