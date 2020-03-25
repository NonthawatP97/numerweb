import React, { Component } from 'react'
import { Card, Input, Button, Table ,Content,Layout } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import api from '../api'
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
        title: "Xi",
        dataIndex: "xo",
        key: "xo"
    },
    {
        title: "Xi+1",
        dataIndex: "xn",
        key: "xn"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
class Newtonraphson extends Component{
    constructor(){
        super();
            this.state={
                fx: "",
                xo: 0,
                showTable: false,
                showGraph:false,
            }
    }
    newton=(xo)=>{
        var fx
        var xn=0
        var sum=parseFloat(0.000000);
        var i=0
        var data=[]
        data['xo']=[]
        data['xn']=[]
        data['iteration']=[]
        data['error']=[]
        data['fx']=[]
        console.log(this.funcd(xo))
        do{
            xn=xo-(this.func(xo)/this.funcd(xo))
            data['fx'][i]=xn.toFixed(6)
            sum=this.error(xn,xo)
            data['iteration'][i] = i;
            data['xn'][i]=xn.toFixed(6)
            data['xo'][i]=xo.toFixed(6)
            data['error'][i]=math.abs(sum).toFixed(6)
            xo=xn
            console.log(data['xn'][i])
            console.log(data['xo'][i])
            i++
        }while(Math.abs(sum) > 0.000001);
        data['error'][0]="None";
        this.createTable(data['xo'], data['xn'], data['error'],data['fx']);
        this.setState({
            showTable: true,
            showGraph: true,
        })
       
    }
    func(X){
        let scope={ x: parseFloat(X) }
        var variable = math.compile(this.state.fx);
        return variable.eval(scope);
    }
    funcd(X){
        let scope={ x: parseFloat(X) }
        var variable=math.derivative(this.state.fx,'x').evaluate({x: scope.x})
        return variable
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xo, xn, error,fx) {
        dataT = []
        dataA = []
        for (var i = 0; i < xn.length; i++) {
            dataT.push({
                iteration: i + 1,
                xo: xo[i],
                xn: xn[i],
                error: error[i],
            });
            dataA.push({
                iteration: i + 1,
                x: xn[i],
                y: fx[i],
                error: error[i],
            });
        }
    }
    handleChange=(event)=> {
        this.setState({
            [event.target.name]: event.target.value 
        });
    }
    componentDidMount = async() => { 
        await api.getBisection().then(db => {
        this.setState({
            fx:db.data.data[3].fx,
            xo:db.data.data[3].xl,
        })
        })
      }
    render(){
        return(
            <Layout style={{background: '#C9E2EF',padding: 24,minHeight: 1000, marginLeft: 0}}>
                <div>
                    <h2 style={{ color: "black", fontWeight: "bold" }}>Newton-Raphson</h2>
                    <div onChange={this.handleChange}>
                        <h2>Fx&nbsp;&nbsp;<Input size="medium" name="fx" style={{ width: 300 }}></Input></h2>
                        <h2>X<sub>0</sub>&nbsp;&nbsp;<Input size="medium" name="xo" style={{ width: 300 }}></Input></h2>
                        <Button onClick={() => this.newton(parseFloat(this.state.xo))
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                        <Button onClick={() => this.newton(parseFloat(this.state.xo))}
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
                    {this.state.showTable &&
                            <div
                                title={"Table"}
                                bordered={true}
                                style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                                id="output12"
                            >
                                <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} >

                                </Table>
                            </div>
                    }    
                </div>
            </Layout>
        )
    }
}
export default Newtonraphson;