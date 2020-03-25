import React, { Component } from 'react'
import { Card, Input, Button, Table ,Content} from 'antd';
import { Layout } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import api from '../api'
var math = require('mathjs')
var dataT = []
var dataA = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Xl",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "Xr",
        dataIndex: "xr",
        key: "xr"
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
var fx = " " 
class Falseposition extends Component {
    constructor(){
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.Falseposition=this.Falseposition.bind(this);
    }

    Falseposition(xl,xr){
        fx=this.state.fx;
        var XFunction = false;
        var xm = 0;
        var sum=parseFloat(0.000000);
        var i=0;
        var data=[]
        data['xl']= []
        data['xr']=[]
        data['x']=[]
        data['error']=[]
        data['iteration']=[]
        if (this.func(xl) < this.func(xr)){
            XFunction=true;
        }
        do {
            xm=(xl*this.func(xr) - xr*this.func(xl))/(this.func(xr)-this.func(xl));
            if (this.func(xm)* this.func(xl)< 0){
                sum=this.error(xm,xr);
                xr=xm;
            }
            else {
                sum=this.error(xm,xl);
                xl=xm;
            }
            data['iteration'][i] = i;
            data['xl'][i]=xl.toFixed(6);
            data['xr'][i]=xr.toFixed(6);
            data['x'][i]=xm.toFixed(6);
            data['error'][i]=Math.abs(sum).toFixed(6);
            console.log(data['xl'][i]);
            console.log(data['xr'][i]);
            i++;
        }while (Math.abs(sum) > 0.000001);
        data['error'][0]="None";
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutput: true,
            showGraph: true
        })
    }
    error=(xnew, xold) =>{
        return Math.abs((xnew - xold) / xnew);
    }
    func(X) {  
        let scope = { x: parseFloat(X) };
        var variable = math.compile(this.state.fx);
      
        return variable.eval(scope);
    }
    createTable(xl, xr, x, error) {
        dataT = []
        dataA = []
        for (var i = 0; i < xl.length; i++) {
            dataT.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
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
        await api.getBisection("5e7b481160fb634364abbceb").then(db => {
        this.setState({
            fx:db.data.data[1].fx,
            xr:db.data.data[1].xr,
            xl:db.data.data[1].xl,
        })
        console.log(this.state.fx);
        console.log(this.state.xl);
        console.log(this.state.xr);
        })
      }

    render(){
        return( 
            <Layout style={{background: '#C9E2EF',padding: 24,minHeight: 1000, marginLeft: 0}}>
                <div onChange={this.handleChange}>
                    <h2 style={{ color: "black", fontWeight: "bold" }}>False Position</h2>
                    <h2>Fx&nbsp;&nbsp;<Input size="medium" name="fx" style={{ width: 300 }}></Input></h2>
                    <h2>X<sub>L</sub>&nbsp;&nbsp;<Input size="medium" name="xl" style={{ width: 300 }}></Input></h2>
                    <h2>X<sub>R</sub>&nbsp;&nbsp;<Input size="medium" name="xr" style={{ width: 300 }}></Input></h2>
                    <Button onClick={() => this.Falseposition(parseFloat(this.state.xl), parseFloat(this.state.xr))
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                     <Button onClick={() => this.Falseposition(parseFloat(this.state.xl), parseFloat(this.state.xr))
                            }
                        style={{  marginLeft: 45 ,color:'#ffffff',background:'#12406A'}}>Fx : {this.state.fx} X<sub>L</sub>:{this.state.xl} X<sub>R</sub>:{this.state.xr}</Button><br/><br/>    
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
                        {this.state.showOutput &&
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
                </div>
            </Layout>
        )
    }
}
export default Falseposition;