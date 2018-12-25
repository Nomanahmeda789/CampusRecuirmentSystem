import React, { Component } from 'react'
import Fire from './Fire'
import { auth } from 'firebase';

export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        var portal = ''
        var f1 = Fire.database().ref('myauth');
        f1.on('value', (v) => {
            portal = v.val().portal;
        })
        return (
            <div>
                {/* {portal==="admin" ? <Admin  /> :
            ( <Employee />)} */}
                {portal == "admin" ? <Admin /> :
                    (portal == "employee" ? <Employee /> : ( portal == "company" ? <Company /> : window.location.pathname = "/"))
                }
                {/* <Admin /> */}
            </div>
        )
    }
}

//Admin portal
export class Admin extends Component {
    constructor() {
        super();
        this.delete = this.delete.bind(this)
        this.deletecom = this.deletecom.bind(this)
        this.deletejob = this.deletejob.bind(this)
        this.logout=this.logout.bind(this)

        this.state = {
            arr: [],
            comarr: [],
            jobarr: [],
        }
    }
    componentDidMount() {
        var ref = Fire.database().ref('objects')
        ref.on('value', (data) => {
            if (data.val()) {
                var arr = Object.entries(data.val())
                console.log(arr)
            }
            else {
                var arr = []
            }
            this.setState({
                arr
            })
        })
        var comp = Fire.database().ref("company")
        comp.on('value', (data) => {
            if (data.val()) {
                var comarr = Object.entries(data.val())

            }
            else {
                var comarr = []
            }
            this.setState({
                comarr
            })
        })
        var job = Fire.database().ref("jobs")
        job.on('value', (data) => {
            if (data.val()) {
                var jobarr = Object.entries(data.val())
            }
            else {
                var jobarr = []
            }
            this.setState({
                jobarr
            })
        })

    }
    delete(index) {
        var ref = Fire.database().ref("objects");
        ref.child(index).remove();
    }

    logout(){
        Fire.auth().signOut().then(()=>{
            // this.props.history.push("/")
            window.location.pathname = "/"
        })
    }
    deletecom(index, e) {
        var keyval = [];
        var key = ''
        var ref = Fire.database().ref("company");
        // console.log(index)
        var comemail = ''
        ref.on('value', (data) => {
            if (data.val()) {
                var ar = Object.entries(data.val())
                for (var i = 0; i < ar.length; i++) {
                    if (index == ar[i][0]) {
                        comemail = ar[i][1].c
                    }
                }
            }
            else {
                var ar = []
            }
        })
        var del = Fire.database().ref("jobs")
        del.on('value', (data) => {
            if (data.val()) {
                var dele = Object.entries(data.val())
                for (var i = 0; i < dele.length; i++) {
                    if (comemail == dele[i][1].id) {
                        var l = Fire.database().ref("jobs")
                        l.child(dele[i][0]).remove()
                        ref.child(index).remove();


                    }
                }
            }
            else {
                var dele = []
            }
        })
        // var jobrem=Fire.database().ref("jobs")
        // jobrem.on('value',(data)=>{
        //     keyval=Object.entries(data.val())
        //     // console.log(keyval)
        // })
        // for(var i=0;i<keyval.length;i++){
        //     if(e===keyval[i][1].id){
        //         console.log(keyval[i][1].id)
        //     }
        // }
    }


    deletejob(index) {
        var ref = Fire.database().ref("jobs");
        ref.child(index).remove();
    }

    render() {
        var count = 0;
        var count1 = 0;
        var count2 = 0;
        return (
            <div >
                <button onClick={this.logout}>log out</button>
                <h1 className="text-center text-warning">Admin Portal</h1>

                {/* <h1 className="text-center">Sign up's in database</h1>
            <ul>
            {
                this.state.arr.map((val,index)=>{
                    return <li>
                                <h3>User {index+1}</h3>
                                <pre>Name       : {val[1].a}</pre>
                                <pre>Education  : {val[1].b}</pre>
                                <pre>Email      : {val[1].c}</pre>
                                {(val[1].f)?
                                <pre>Address    : {val[1].f}</pre>:
                                ''                                
                                }
                                 {(val[1].e)?
                                <pre>Age        : {val[1].e}</pre>:
                                ''                                
                                }
                                 {(val[1].g)?
                                <pre>contact    : {val[1].g}</pre>:
                                ''                                
                                }
                                <button className="btn btn-success" onClick={()=>{
                                    this.delete(val[0])
                                }}>Delete</button>
                           </li>
                })
            }
            </ul> */}
                <div className="row">
                    <div className="col" style={{ width: "30%" }}>
                        <h1 className="text-center" style={{ border: "1px solid gray" }}>Employees</h1>
                        {(this.state.arr.length) ? (this.state.arr.map((val, index) => {

                            return <div>
                                <h4>Employee {++count}</h4>
                                <br />
                                <table className="table" >
                                    <tbody>
                                        <tr>
                                            <th style={{ border: "1px solid gray", width: "49%" }}>Name </th>
                                            <td style={{ border: "1px solid gray", width: "49%" }}>{val[1].a}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Education </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].b}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Email </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].c}</td>
                                        </tr>
                                        {(val[1].e) ?
                                            <tr>
                                                <th style={{ border: "1px solid gray" }}>Age </th>
                                                <td style={{ border: "1px solid gray" }}>{val[1].c}</td>
                                            </tr>
                                            : ''}
                                        {(val[1].f) ?
                                            <tr>
                                                <th style={{ border: "1px solid gray" }}>Adress </th>
                                                <td style={{ border: "1px solid gray" }}>{val[1].c}</td>
                                            </tr>
                                            : ''}
                                        {(val[1].g) ?
                                            <tr>
                                                <th style={{ border: "1px solid gray" }}>Contact </th>
                                                <td style={{ border: "1px solid gray" }}>{val[1].c}</td>
                                            </tr>
                                            : ''}
                                    </tbody>
                                    <br />
                                    <button className="btn btn-success" onClick={() => {
                                        this.delete(val[0])
                                    }}>Delete</button>
                                </table>
                            </div>
                        }))
                            : <h4 className="text-center text-danger">There is no record for employee</h4>

                        }
                    </div>

                    <div className="col" style={{ width: "30%" }}>
                        <h1 className="text-center" style={{ border: "1px solid gray" }}>companies</h1>
                        {(this.state.comarr.length) ? (this.state.comarr.map((val, index) => {

                            return <div>
                                <h4>Company {++count1}</h4>
                                <br />
                                <table className="table" >
                                    <tbody>
                                        <tr>
                                            <th style={{ border: "1px solid gray", width: "49%" }}>Company Name </th>
                                            <td style={{ border: "1px solid gray", width: "49%" }}>{val[1].a}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Company Work </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].b}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Company Email </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].c}</td>
                                        </tr>

                                    </tbody>
                                    <br />
                                    <button className="btn btn-success" onClick={() => {
                                        this.deletecom(val[0], val[1].c)
                                    }}>Delete</button>
                                </table>
                            </div>
                        }))
                            : <h4 className="text-center text-danger">There is no record for Company</h4>

                        }


                    </div>

                    <div className="col" style={{ width: "30%" }}>
                        <h1 className="text-center" style={{ border: "1px solid gray" }}>jobs</h1>
                        {(this.state.jobarr.length) ? (this.state.jobarr.map((val, index) => {

                            return <div>
                                <h4>Job {++count2}</h4>
                                <br />
                                <table className="table" >
                                    <tbody>
                                        <tr>
                                            <th style={{ border: "1px solid gray", width: "49%" }}>Company Email </th>
                                            <td style={{ border: "1px solid gray", width: "49%" }}>{val[1].id}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Title </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].title}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Qualification needed </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].qulification}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Salary </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].salary}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Timings </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].timings}</td>
                                        </tr>

                                    </tbody>
                                    <br />
                                    <button className="btn btn-success" onClick={() => {
                                        this.deletejob(val[0])
                                    }}>Delete</button>
                                </table>
                            </div>
                        }))
                            : <h4 className="text-center text-danger">There is no record for job</h4>

                        }


                    </div>
                </div>
            </div>
        )
    }
}

//Employee portal

export class Employee extends Component {
    constructor() {
        super();
        this.gotdata = this.gotdata.bind(this)
        this.errData = this.errData.bind(this)
        this.Data = this.Data.bind(this)
        this.applyjob = this.applyjob.bind(this)
        this.updateFields = this.updateFields.bind(this)
        this.logout=this.logout.bind(this)
        
        this.state = {
            name: '',
            education: '',
            email: '',
            age: '',
            contact: '',
            add: '',
            jobarr: [],
            proposalarr: [],
            authdata: '',
            emparr: []
        }
    }

    Data() {
        var ref = Fire.database().ref('objects');
        ref.on('value', this.gotdata, this.errdata);

    }
    gotdata(data) {

        var myobj = data.val();
        var keys = Object.keys(myobj)
        var f1 = Fire.database().ref('myauth');

        f1.on('value', (v) => {

            for (var i = 0; i < keys.length; i++) {
                if (v.val().email == myobj[keys[i]].c) {
                    // console.log("+"+myobj[keys[i]].c)
                    this.setState({
                        name: myobj[keys[i]].a,
                        education: myobj[keys[i]].b,
                        email: myobj[keys[i]].c,
                        age: myobj[keys[i]].e,
                        contact: myobj[keys[i]].g,
                        add: myobj[keys[i]].f
                    })

                }
            }

        })

        // console.log(this.state.checkemail)
        // console.log(keys)
        // console.log(myobj)


        //   console.log(myobj[keys[1]].a)
        // console.log(this.state.mobj[this.state.mkeys[0]].a);
    }
    updateFields() {
        // console.log(this.state.name)
        // console.log(this.state.education)
        // console.log(this.state.age)
        // console.log(this.state.add)
        // console.log(this.state.contact)


        var f1 = Fire.database().ref('myauth');
        var ref = Fire.database().ref('objects')
        f1.on('value', (v) => {

            ref.on('value', (data) => {
                var arr = Object.entries(data.val())
                for (var i = 0; i < arr.length; i++) {
                    if (v.val().email == arr[i][1].c) {
                        var ref = Fire.database().ref("objects");
                        ref.child(arr[i][0]).update({
                            a: this.state.name,
                            b: this.state.education,


                        })
                        if (this.state.add) {
                            ref.child(arr[i][0]).update({
                                f: this.state.add,
                            })
                        }
                        if (this.state.age) {
                            ref.child(arr[i][0]).update({
                                e: this.state.age,
                            })
                            if (this.state.contact) {
                                ref.child(arr[i][0]).update({
                                    g: this.state.contact
                                })
                            }

                        }
                    }
                }

            })
        })

    }
    errData(err) {
        console.log('Error!!!!!!!!!')
        console.log(err)
    }
    logout(){
        Fire.auth().signOut().then(()=>{
            // this.props.history.push("/")
            window.location.pathname = "/"
        })
    }
    componentWillMount() {
        this.Data();
        var job = Fire.database().ref("jobs")
        job.on('value', (data) => {
            if (data.val()) {
                var jobarr = Object.entries(data.val())
            }
            else {
                var jobarr = []
            }
            this.setState({
                jobarr
            })
        })


    }
    //   console.log(myobj[keys[1]].uname)
    applyjob(index) {
        var myindex = index;
        // var ref = Fire.database().ref("myauth");
        var authdata =  this.state.email;
        // ref.on('value', (data) => {
        //     authdata = data.val().email;
        //     // console.log(authdata+"+"+this.state.authdata)
            this.setState({
                authdata
            })

        // })
        var empldata = Fire.database().ref("objects")
        empldata.on('value', (data) => {
            if (data.val()) {
                var emparr = Object.entries(data.val())

            }
            else {
                var emparr = []
            }
            this.setState({
                emparr
            })
            // console.log(this.state.emparr)
        })
        for (var i = 0; i < this.state.emparr.length; i++) {
            if (this.state.emparr[i][1].c === this.state.authdata) {
                var proposal = this.state.emparr[i][0];
                var p1 = []
                var ref1 = Fire.database().ref("jobs")
                var reference = ''
                ref1.on('value', (data) => {
                    var p = Object.entries(data.val())
                    for (var i = 0; i < p.length; i++) {
                        if (p[i][0] === myindex) {
                            if (p[i][1].proposalarr) {
                                p1 = p[i][1].proposalarr
                                // console.log(p1)        
                                break;
                            }
                            else {
                                var pro = Fire.database().ref("jobs")
                                pro.child(index).update({
                                    proposalarr: []
                                })
                            }
                        }
                    }
                })
                var flag = true;
                for (var i = 0; i < p1.length; i++) {
                    if (p1[i] == proposal) {
                        flag = false
                    }
                }
                if (flag == true) {
                    p1.push(proposal)
                    alert("Job Posted")
                }
                else {
                    alert("You have already applied in this job")
                }
                console.log(p1)
                var pro = Fire.database().ref("jobs")
                pro.child(index).update({
                    proposalarr: p1
                })












                // proposalarr.push(proposal)
                // this.setState({
                //     proposalarr
                // })


                // console.log(this.state.proposalarr)

            }
        }



    }
    render() {
        var count2 = 0
        return (

            <div className="row">
                <div className="col" style={{ width: "49%", display: "inline-block" }}>
                    <button onClick={this.logout}>log out</button>
                   
                    <h1 className="text-center text-warning" style={{ border: "1px solid gray" }}>My Data</h1>
                    <table className="table">
                        <tr>
                            <td style={{ border: "1px solid gray", width: "49%" }}>Name</td>

                            <td style={{ border: "1px solid gray", width: "49%" }}>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid gray", width: "49%" }}>Education</td>
                            <td style={{ border: "1px solid gray", width: "49%" }}>{this.state.education}</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid gray", width: "49%" }}>Email</td>
                            <td style={{ border: "1px solid gray", width: "49%" }}>{this.state.email}</td>
                        </tr>
                        {this.state.add ?
                            <tr>
                                <td style={{ border: "1px solid gray", width: "49%" }}>Address</td>
                                <td style={{ border: "1px solid gray", width: "49%" }}>{this.state.add}</td>
                            </tr>
                            : ''
                        }

                        {this.state.age ?
                            <tr>
                                <td style={{ border: "1px solid gray", width: "49%" }}>Age</td>
                                <td style={{ border: "1px solid gray", width: "49%" }}>{this.state.age}</td>
                            </tr>
                            : ''
                        }

                        {this.state.contact ?
                            <tr>
                                <td style={{ border: "1px solid gray", width: "49%" }}>Contact</td>
                                <td style={{ border: "1px solid gray", width: "49%" }}>{this.state.contact}</td>
                            </tr>
                            : ''
                        }

                    </table>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        Edit or Add Fields
                </button>
                </div>

                <div className="col" style={{ width: "49%", display: "inline-block" }}>
                    <h1 className="text-center text-danger" style={{ border: "1px solid gray" }}>Jobs for you</h1>
                    {(this.state.jobarr.length) ? (this.state.jobarr.map((val, index) => {

                        return <div>
                            <h4>Job {++count2}</h4>
                            <br />
                            <table className="table" >
                                <tbody>
                                    <tr>
                                        <th style={{ border: "1px solid gray", width: "49%" }}>Company Email </th>
                                        <td style={{ border: "1px solid gray", width: "49%" }}>{val[1].id}</td>
                                    </tr>

                                    <tr>
                                        <th style={{ border: "1px solid gray" }}>Title </th>
                                        <td style={{ border: "1px solid gray" }}>{val[1].title}</td>
                                    </tr>

                                    <tr>
                                        <th style={{ border: "1px solid gray" }}>Qualification needed </th>
                                        <td style={{ border: "1px solid gray" }}>{val[1].qulification}</td>
                                    </tr>

                                    <tr>
                                        <th style={{ border: "1px solid gray" }}>Salary </th>
                                        <td style={{ border: "1px solid gray" }}>{val[1].salary}</td>
                                    </tr>

                                    <tr>
                                        <th style={{ border: "1px solid gray" }}>Timings </th>
                                        <td style={{ border: "1px solid gray" }}>{val[1].timings}</td>
                                    </tr>

                                </tbody>
                                <br />
                                <button className="btn btn-success" onClick={() => {
                                    this.applyjob(val[0])
                                }}>Apply Now</button>
                            </table>
                        </div>
                    }))
                        : <h4 className="text-center text-danger">There is no record for job</h4>

                    }

                </div>


                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Update it</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <input type="text" placeholder="Name"
                                    defaultValue={this.state.name}
                                    onChange={(val) => {
                                        this.state.name = val.target.value;
                                    }}
                                    style={{ width: "100%", borderRadius: "10px", padding: "5px" }} />
                                <input type="text" placeholder="Education"
                                    defaultValue={this.state.education}
                                    onChange={(val) => {
                                        this.state.education = val.target.value;
                                    }}
                                    style={{ width: "100%", borderRadius: "10px", padding: "5px" }} />
                                <input type="text" placeholder="Adress"
                                    onChange={(val) => {
                                        this.state.add = val.target.value;
                                    }}
                                    style={{ width: "100%", borderRadius: "10px", padding: "5px" }} />
                                <input type="text" placeholder="Age"
                                    onChange={(val) => {
                                        this.state.age = val.target.value;
                                    }}
                                    style={{ width: "100%", borderRadius: "10px", padding: "5px" }} />
                                <input type="text" placeholder="Phone No."
                                    onChange={(val) => {
                                        this.state.contact = val.target.value;
                                    }}
                                    style={{ width: "100%", borderRadius: "10px", padding: "5px" }} />

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger"
                                    onClick={this.updateFields}
                                    data-dismiss="modal">Update</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//Company portal

export class Company extends Component {
    constructor() {
        super()
        this.addjob = this.addjob.bind(this)
        this.proposalsubmit = this.proposalsubmit.bind(this)
        this.applied = this.applied.bind(this)
        this.logout=this.logout.bind(this)
        

        this.state = {
            cname: '',
            cwork: '',
            cemail: '',
            dupemail: '',
            dupemail1: '',
            title: '',
            salary: '',
            qulification: '',
            timings: '',
            duparr: [],
            dupprop: [],
            appliedarr: []

        }
    }

    async componentDidMount() {

        var ref = Fire.database().ref('myauth').once('value').then( (v) => {
            this.setState({
                dupemail: v.val().email,
                dupemail1: v.val().email
            })
        })
        var company = Fire.database().ref('company');
       await company.on('value', (v) => {
            if (v.val()) {
                var arr = v.val() ? Object.entries(v.val()) : [];
                // console.log(arr)
                
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][1].c == this.state.dupemail) {
                        this.setState({
                            cname: arr[i][1].a,
                            cwork: arr[i][1].b,
                            cemail: arr[i][1].c,
                        })
                        break;
                    }
                }
            }
            else {
                var arr = []
            }
        })

        var jobs = Fire.database().ref("jobs")
        jobs.on('value', (data) => {
            if (data.val()) {
                // var arr=Object.entries(data.val())
                // console.log(arr)
                this.setState({
                    duparr: Object.entries(data.val())
                })
                // console.log(this.state.duparr)
                // console.log(this.state.dupemail)

            }
            else {

            }


        })
    }

    addjob() {
        // console.log(this.state.salary)
        // console.log(this.state.qulification)
        // console.log(this.state.timings)        
        // console.log(this.state.title)
        var ind = this.state.dupemail.indexOf('@')
        var extension = this.state.dupemail.slice(0, ind)
        if (this.state.salary.length > 3 && this.state.title.length > 3 && this.state.timings.length > 3 && this.state.qulification.length > 3) {
            var ref = Fire.database().ref("jobs")
            ref.push({
                id: this.state.dupemail,
                title: this.state.title,
                salary: this.state.salary,
                qulification: this.state.qulification,
                timings: this.state.timings,
            })
        }
        else {
            alert("Please fill the form correctly")
        }
    }
    logout(){
        Fire.auth().signOut().then(()=>{
            // this.props.history.push("/")
            window.location.pathname = "/"
        })
    }
    proposalsubmit(index) {
        var ref = Fire.database().ref("jobs")
         ref.on('value', (data) => {
            var dupprop = Object.entries(data.val())
            for (var i = 0; i < dupprop.length; i++) {
                if (index == dupprop[i][0]) {
                    this.setState({
                        dupprop: dupprop[i][1].proposalarr
                    })


                }
            }
            this.applied(this.state.dupprop)
        })
    }
   async applied(a) {
        var ref = Fire.database().ref("objects")
        var lp = []
       await ref.on('value', (data) => {
            var appliedarr = Object.entries(data.val())
            for (var i = 0; i < appliedarr.length; i++) {
                if (a) {
                    for (var j = 0; j < a.length; j++) {
                        if (appliedarr[i][0] === a[j]) {
                            lp.push(appliedarr[i][1])
                        }
                    }
                }
            }
        })
        this.setState({
            appliedarr: lp
        })
        console.log(this.state.appliedarr)
    }

    render() {
        var count = 0;
        return (
            <div>
                <button onClick={this.logout}>log out</button>
                
                <h1 className="text-center text-danger">Company Portal</h1>
                <div style={{ width: "49%", float: "left", display: "inline-block" }}>
                    <table className="table" >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid gray" }}>Company Name </th>
                                <td style={{ border: "1px solid gray" }}>{this.state.cname}</td>
                            </tr>

                            <tr>
                                <th style={{ border: "1px solid gray" }}>Company Work </th>
                                <td style={{ border: "1px solid gray" }}>{this.state.cwork}</td>
                            </tr>

                            <tr>
                                <th style={{ border: "1px solid gray" }}>Company Email </th>
                                <td style={{ border: "1px solid gray" }}>{this.state.cemail}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* modal   */}
                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal11">
                        click Here to add a job
                    </button>

                    {/* <!-- The Modal --> */}
                    <div className="modal fade" id="myModal11">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header" style={{ borderBottom: "none" }}>
                                    <h4 classname="modal-title">Add Job</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <input type="text"
                                    onChange={(v) => {
                                        this.setState({
                                            title: v.target.value
                                        })
                                    }}
                                    className="form-control" placeholder="Job title" style={{ width: "80%", margin: "10px auto" }} />
                                <input type="text"
                                    onChange={(v) => {
                                        this.setState({
                                            salary: v.target.value
                                        })
                                    }}
                                    placeholder="Salary" className="form-control" style={{ width: "80%", margin: "10px auto" }} />
                                <input type="text"
                                    onChange={(v) => {
                                        this.setState({
                                            qulification: v.target.value
                                        })
                                    }}
                                    placeholder="Qulification required" className="form-control" style={{ width: "80%", margin: "10px auto" }} />
                                <input type="text"
                                    onChange={(v) => {
                                        this.setState({
                                            timings: v.target.value
                                        })
                                    }}
                                    placeholder="Job Timings" className="form-control" style={{ width: "80%", margin: "10px auto" }} />

                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer" style={{ borderTop: "none" }}>
                                    <button type="button"
                                        onClick={this.addjob}
                                        className="btn btn-secondary" data-dismiss="modal">Add</button>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>
                <div style={{ width: "49%", float: "right", display: "inline-block" }}>
                    <h3 className="text-center text-danger" style={{ border: "1px solid gray" }}>Jobs </h3>

                    {this.state.duparr.map((val, index) => {

                        return ((this.state.dupemail === val[1].id) ?
                            <div>
                                <h4>Job {++count}</h4>
                                <table className="table" >
                                    <tbody>
                                        <tr>
                                            <th style={{ border: "1px solid gray", width: "49%" }}>Company Title </th>
                                            <td style={{ border: "1px solid gray", width: "49%" }}>{val[1].title}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Qualification </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].qulification}</td>
                                        </tr>

                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Salary </th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].salary}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ border: "1px solid gray" }}>Timings</th>
                                            <td style={{ border: "1px solid gray" }}>{val[1].timings}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="btn btn-warning text-white"
                                    data-toggle="modal" data-target="#myModalq"
                                    onClick={() => {
                                        this.proposalsubmit(val[0])
                                    }}
                                >Click here to check submitted proposal</button>
                            </div> : <h1></h1>)
                    })
                    }
                </div>


                {/* propsal modal */}

                {/* <!-- The Modal --> */}
                <div class="modal fade" id="myModalq">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div class="modal-header" style={{ borderBottom: "none" }}>
                                <h4 class="modal-title">All proposals for this job</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div class="modal-body">
                                {
                                    (this.state.appliedarr) ? this.state.appliedarr.map((val, index) => {
                                        return (
                                            <div>
                                                <h3>Employee {index + 1}</h3>
                                                <br />
                                                <table className="table" >
                                                    <tbody>
                                                        <tr>
                                                            <th style={{ border: "1px solid gray", width: "49%" }}>Name </th>
                                                            <td style={{ border: "1px solid gray", width: "49%" }}>{val.a}</td>
                                                        </tr>

                                                        <tr>
                                                            <th style={{ border: "1px solid gray" }}>Education</th>
                                                            <td style={{ border: "1px solid gray" }}>{val.b}</td>
                                                        </tr>

                                                        <tr>
                                                            <th style={{ border: "1px solid gray" }}>Email </th>
                                                            <td style={{ border: "1px solid gray" }}>{val.c}</td>
                                                        </tr>

                                                    </tbody>
                                                    {/* <br/>
                                                    <button className="btn btn-success" onClick={()=>{
                                                    this.applyjob(val[0])
                                                    }}>Apply Now</button> */}
                                                </table>
                                            </div>
                                        )
                                    })
                                        :
                                        ''
                                }
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div class="modal-footer" style={{ borderTop: "none" }}>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

// export class Jobs extends Component{
//     render(){
//         return(
//             <div>



//             </div>    
//         )
//     }
// }