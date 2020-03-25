import React, { Component } from 'react'
import { Card, Input, Button, Table ,Content,Layout } from 'antd';
import { create, all } from 'mathjs'
import api from '../api'
var math=create(all)
math.import(require('mathjs-simple-integral'))

class Trapzoidal extends Component{
    constructor(){
        super();
        this.state={
            fx:"",
            a: 0,
            b: 0,
            real: 0,
            n: 0,
            ans: 0,
            error: 0,
            showOutput: false,
        }
    }
    trapzoidal=(a,b)=>{
        var ans,real,error,str
        real=math.integral(this.state.fx,'x')
        str=real.toString()
        real=math.compile(str).evaluate({x: b})-math.compile(str).evaluate({x: a})

        ans=((b-a)/2)*(this.func(a)+this.func(b))
        error=this.error(real,ans).toFixed(6)
        this.setState({
            real: real,
            ans: ans,
            error: error,
            showOutput: true,
        })
    }
    func(X){
        return math.compile(this.state.fx).evaluate({x: X})
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    handleChange=(event)=> {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentDidMount = async() => { 
        await api.getIntre("5e7b450fb737f838a4cf387d").then(db => {
        this.setState({
            fx:db.data.data[0].fx,
            a:db.data.data[0].a,
            b:db.data.data[0].b,
            n:db.data.data[0].n,
        })
        })
      }
    render(){
        return(
           <Layout style={{background: '#C9E2EF',padding: 24,minHeight: 1000, marginLeft: 0}}>
               <div>
               <h2 style={{ color: "black", fontWeight: "bold" }}>Trapezoidal</h2>
                    <div onChange={this.handleChange}>
                    <h2>Fx&nbsp;&nbsp;<Input size="medium" name="fx" style={{ width: 300 }}></Input></h2>
                    <h2>a&nbsp;&nbsp;<Input size="medium" name="a" style={{ width: 300 }}></Input></h2>
                    <h2>b&nbsp;&nbsp;<Input size="medium" name="b" style={{ width: 300 }}></Input></h2>
                    <Button onClick={() => this.trapzoidal(parseFloat(this.state.a),parseFloat(this.state.b))
                            }
                            style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                    <Button onClick={() => this.trapzoidal(parseFloat(this.state.a), parseFloat(this.state.b))
                            }
                        style={{  marginLeft: 45 ,color:'#ffffff',background:'#12406A'}}>Fx : {this.state.fx} a : {this.state.a} b : {this.state.b}</Button><br/><br/>
                    </div>
                    {this.state.showOutput &&
                        <div style={{background: '#FFE7E2',width: 400}}>
                            <h2>Real Value: {this.state.real}</h2>
                            <h2>Trapezoidal: {this.state.ans}</h2>
                            <h2>Error: {this.state.error}</h2>
                        </div>
                    }
               </div>
           </Layout>
        )
    }
}
export default Trapzoidal