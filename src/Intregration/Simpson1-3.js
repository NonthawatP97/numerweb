import React, { Component } from 'react'
import { Card, Input, Button, Table ,Content,Layout } from 'antd';
import { create, all } from 'mathjs'
import api from '../api'
var math=create(all)
math.import(require('mathjs-simple-integral'))

class Simpson13 extends Component{
    constructor(){
        super();
        this.state={
            fx:"",
            a: 0,
            b: 0,
            n: 0,
            real: 0,
            ans: 0,
            error: 0,
            showOutput: false,
        }
    }
    simpson13=(a,b,n)=>{
        var ans=0,real=0,error=0,str
        var i=0
        var x=a
        var h=(b-a)/2
        if(n % 2==0){
            for (i=0;i<=2;i++){
                if (i===0 || i===2){
                    ans +=this.func(x)
                }
                else{
                    ans += 4*this.func(x)
                }
                x+=h
            }
        }
        ans *= h/3
        real=math.integral(this.state.fx,'x')
        str=real.toString()
        real=math.compile(str).evaluate({x: b})-math.compile(str).evaluate({x: a})
        real=real.toFixed(6)
        ans=ans.toFixed(6)
        error=this.error(real,ans).toFixed(6)
        this.setState({
            real: real,
            ans: ans,
            error: error,
            showOutput: true,
        })
        console.log(real)
        console.log(ans)
        console.log(error)
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
               <h2 style={{ color: "black", fontWeight: "bold" }}>Simpson 1/3</h2>
                    <div onChange={this.handleChange}>
                    <h2>Fx&nbsp;&nbsp;<Input size="medium" name="fx" style={{ width: 300 }}></Input></h2>
                    <h2>a&nbsp;&nbsp;<Input size="medium" name="a" style={{ width: 300 }}></Input></h2>
                    <h2>b&nbsp;&nbsp;<Input size="medium" name="b" style={{ width: 300 }}></Input></h2>
                    <h2>n&nbsp;&nbsp;<Input size="medium" name="n" style={{ width: 300 }}></Input></h2>
                    <Button onClick={() => this.simpson13(parseFloat(this.state.a),parseFloat(this.state.b),parseFloat(this.state.n))
                            }
                            style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                    <Button onClick={() => this.simpson13(parseFloat(this.state.a), parseFloat(this.state.b),parseFloat(this.state.n))
                            }
                        style={{  marginLeft: 45 ,color:'#ffffff',background:'#12406A'}}>Fx : {this.state.fx} a : {this.state.a} b : {this.state.b} n : {this.state.n}</Button><br/><br/>
                    </div>
                    {this.state.showOutput &&
                        <div style={{background: '#FFE7E2',width: 400}}>
                            <h2>Real Value: {this.state.real}</h2>
                            <h2>Simpson 1/3: {this.state.ans}</h2>
                            <h2>Error: {this.state.error}</h2>
                        </div>
                    }
               </div>
           </Layout>
        )
    }
}
export default Simpson13