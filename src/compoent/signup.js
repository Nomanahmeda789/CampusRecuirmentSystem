import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {Myroute} from './signin'
import  { Signin } from './signin'
import Fire from './Fire'

export const Sign12=()=>{
    return (
    <Myroute />
        // <h1>askjds</h1>
)
}

const Myroute1=()=>{
    return(
        <Router>
                <div>
                <Route  path="/signup" component={Signup}/>
                <Route  exact path="/" component={Sign12}/>
                </div>
        </Router>    

)
}
export default Myroute1;

export  class Signup extends Component{
   
    constructor(){
        super();
        this.state={
            uname:'',
            edu:'',
            email:'',
            pass:'',
            obj:{},
            arr:[],
            isSelected:'',

            

        }
        this.text1=this.text1.bind(this)
        this.text2=this.text2.bind(this)
        this.text3=this.text3.bind(this)
        this.text4=this.text4.bind(this)
        this.onsubmit=this.onsubmit.bind(this)
        this.signUpDatabase=this.signUpDatabase.bind(this)
        this.signUpDatabase1=this.signUpDatabase1.bind(this)        
        this.changeSelected=this.changeSelected.bind(this)
        this.changeSelected1=this.changeSelected1.bind(this)
        
    }
   text1(e){
    this.setState({
        uname:e.target.value
    })
   }
   text2(e){
    this.setState({
        edu:e.target.value
    })
   }
   text3(e){
    this.setState({
        email:e.target.value
    })
   }
   text4(e){
    this.setState({
        pass:e.target.value
    })
   }

   
   changeSelected(){
    this.setState({
        isSelected:"employee"
    })
    
    }

    changeSelected1(){
        this.setState({
            isSelected:"company"
        })
        
    }

   onsubmit(e){
        e.preventDefault();
        console.log(this.state.uname,this.state.edu,this.state.email,this.state.pass)
        if( (this.state.uname.length<3) || (this.state.edu.length<3)){
            alert("please fill the form properly")
        }   
        else{
            if(this.state.isSelected=="company"){
                Fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass).then(()=>{
                    this.signUpDatabase1();    
                    this.props.history.push("/")
                    }).catch((error)=>{
                        
                    alert(error.message)
                        
                    })
            }
            else if(this.state.isSelected=="employee"){
            Fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass).then(()=>{
            this.signUpDatabase();    
            this.props.history.push("/")
            }).catch((error)=>{
                
            alert(error.message)
                
            })    
            }
        }
   }
   //signup database 
   signUpDatabase(){
        this.setState({
            obj:{
                a:this.state.uname,
                b:this.state.edu,
                c:this.state.email,
                d:this.state.pass
            },
        })
        console.log(this.state.obj)
        var f= Fire.database().ref('objects');
        f.push(this.state.obj);
        
   }
   
   //signup database 
   signUpDatabase1(){
        this.setState({
            obj:{
                a:this.state.uname,
                b:this.state.edu,
                c:this.state.email,
                d:this.state.pass
            },
        })
        console.log(this.state.obj)
        var f= Fire.database().ref('company');
        f.push(this.state.obj);
        
    }
   
    render(){
        return(
    <div>
        
        <div className="container subDiv">
        <div className="d1"></div>
        <div className="divs">
            <div className="div1 dd1">
                <img src={require("../img/5.png")} className="logo1 dd2" />

            </div>
            <div className="div2 dd3">
                    <h1 className="h1h">Sign Up</h1>
                    <div className="dd4"> 
                            <i className="fas fa-user icon1 d3" ></i>
                            <input type="text" className="inp"
                            onChange={this.text1}
                            id="userid" placeholder="User's or Company Name"/>
                            <p className="abc" id="a1">Please fill the input correctly*</p>
                    </div>
                    <div className="dd4"> 
                            <i className="fas fa-graduation-cap icon1 d3" ></i>
                            <input type="text" className="inp" 
                            onChange={this.text2}                            
                            id="eduid" placeholder="Education or Working"/>
                            <p className="abc" id="a2">Please fill the input correctly*</p>                        
                    </div>
                    <div className="dd4"> 
                        <i className="fas fa-envelope-open icon1 d3"></i>
                        <input type="email" className="inp" 
                            onChange={this.text3}
                            id="emailid" placeholder="Email"/>
                        <p className="abc" id="a3">Please fill the input correctly*</p>
                        
                    </div>
                    <div className="dd4">
                        <i className="fas fa-unlock-alt icon1 d3"></i>
                        <input type="password" className="inp" 
                            onChange={this.text4}
                            id="passid" placeholder="Password"/>
                        <p className="abc" id="a4"> Please fill the input correctly*</p>

                    </div>
                    
                    <div className="mmm">
                                
                                <label  style={{marginRight:"20px"}}><input type="radio" value="company" 
                                checked={this.state.isSelected=="company"}
                                onChange={this.changeSelected1}
                                name="login" />Company</label>
                                <label><input type="radio" name="login" value="employee" 
                                checked={this.state.isSelected=="employee"}
                                onChange={this.changeSelected}/>Employee</label>
                                
                    </div>
                            


                    <input type="button" className="btn btn-md btn-success sign"
                    onClick={this.onsubmit}
                    id="signupbtn" value="Sign up"/>
                   <br/>
                    <label className="lab">I am already a member ! 
                     <p className="ap" onClick={() => this.props.history.push("/")}> Sign in</p>
                    
                    </label>
                </div>
        </div>
        </div>
     </div>  
        )
    }
}