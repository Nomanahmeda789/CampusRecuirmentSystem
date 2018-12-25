import React, { Component } from 'react'
import { Signup } from './signup'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Fire from './Fire'
import Myroute1 from "./signup"
import Home from './home'

export const Upsign = () => {
    return <Myroute1 />
}

// export const Home1 = () => {
//     return <Home />
// }

export class Myroute extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router history={this.props.history}>
                <div>
                    <Route exact path="/" component={Signin} />
                    <Route path="/signup" component={Upsign} />
                    <Route path="/Home" component={Home} />

                </div>
            </Router>
        )
    }
}

export class Signin extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
            isSelected: '',
            admin: "admin@gmail.com",
            adminPas: "admin12345"
        }
        this.onsubmit = this.onsubmit.bind(this)
        this.text = this.text.bind(this)
        this.text1 = this.text1.bind(this)
        this.signUpDatabase = this.signUpDatabase.bind(this)

        this.changeSelected = this.changeSelected.bind(this)
        this.changeSelected1 = this.changeSelected1.bind(this)
        this.changeSelected2 = this.changeSelected2.bind(this)


    }
    onsubmit(e) {
        e.preventDefault();
        console.log(this.state.email, this.state.pass)
        if (this.state.isSelected === "admin") {
            if (this.state.admin === this.state.email && this.state.adminPas === this.state.pass) {
                this.signUpDatabase();
                this.props.history.push('./Home')
            }
            else {
                alert("U r not admin so kindly check the correct portal")
            }
        }
        else if (this.state.isSelected === "employee") {
            Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then((u) => {
                this.signUpDatabase();
                this.props.history.push('./Home')
            })
                .catch((error) => {
                    console.log(error)
                    alert(error.message)
                })
        }
        else if (this.state.isSelected === "company") {
            Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then((u) => {
                this.signUpDatabase();
                this.props.history.push('./Home')
            })
                .catch((error) => {
                    console.log(error)
                    alert(error.message)
                })

        }
        else {
            alert("please fill the form first")
        }
    }
    changeSelected() {
        this.setState({
            isSelected: "employee"
        })

    }

    changeSelected1() {
        this.setState({
            isSelected: "admin"
        })

    }

    changeSelected2() {
        this.setState({
            isSelected: "company"
        })

    }
    text(e) {
        this.setState({
            email: e.target.value
        })
        console.log(e.target.value)
    }

    text1(e) {

        this.setState({
            pass: e.target.value
        })
        console.log(e.target.value)
    }
    signUpDatabase() {

        var f = Fire.database().ref('myauth').set({
            email: this.state.email,
            portal: this.state.isSelected

        });

    }


    render() {
        return (
            // <Signup />
            // <Upsign/>
            <div>
                <div className="container subDiv">
                    <div className="d1"></div>
                    <div className="divs">
                        <div className="div1">
                            <img src={require("../img/1.png")} className="logo1" />

                        </div>
                        <div className="div2">
                            <h1 className="h11" >Sign in</h1>
                            <div className="d2">
                                <i className="fas fa-envelope-open icon1 d3" ></i>
                                <input type="email" className="inp" id="emailid"
                                    onChange={this.text}
                                    placeholder="Email" />
                                <p className="abc" id="a11">Please fill the input correctly*</p>

                            </div>
                            <div className="d4">
                                <i className="fas fa-unlock-alt icon1 d3"  ></i>
                                <input type="password" className="inp"
                                    onChange={this.text1}
                                    id="passid" placeholder="Password" />
                                <p className="abc" id="a12">Please fill the input correctly*</p>

                            </div>
                            <div className="mmm">
                                {/* <input type="checkbox" />
                                <label className="rem">Remeber me</label> */}
                                <label style={{ marginRight: "10px" }}><input type="radio" value="admin"
                                    checked={this.state.isSelected == "admin"}
                                    onChange={this.changeSelected1}
                                    name="login" />Admin</label>
                                <label style={{ marginRight: "10px" }}><input type="radio" name="login" value="employee"
                                    checked={this.state.isSelected == "employee"}
                                    onChange={this.changeSelected} />Employee</label>
                                <label><input type="radio" name="login" value="company"
                                    checked={this.state.isSelected == "company"}
                                    onChange={this.changeSelected2} />Company</label>

                            </div>
                            <input className="btn btn-md btn-success sign"
                                onClick={this.onsubmit}
                                id="signbtn" type="button" value="Sign in" />
                            <br />
                            <label className="lab">Don't have account ? <p className="ap" onClick={() => this.props.history.push("/signup")}> Sign up</p></label>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
// export default Signin;