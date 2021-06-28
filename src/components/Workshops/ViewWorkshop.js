import React, {useState, useEffect} from "react";
import axios from "axios";
import WorkshopConductorSideNav from "../Navbar/WorkshopConductorSideNav";

export default function ViewWorkshop(props) {

    const [data, setData] = useState({
        id: "",
        conferenceDetailsId: "",
        topic: "",
        name: "",
        description: "",
        documentURL: ""
    });

    useEffect(() => {
        getWorkshop();
    }, [])

    function getWorkshop() {
        const workshopId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/workshops/" + workshopId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const workshopId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/workshops/" + workshopId, data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/workshops");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.documentURL !== undefined) {
                alert(err.response.data.documentURL);
            } else if(err.response.data.message !== undefined) {
                alert(err.response.data.message);
            } else {
                alert(err);
            }
        })
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    return(
        <div className="main">
            <WorkshopConductorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1000px'
            }}>
                <br/>
                <div className="card" style={{width : '72%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Workshop</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => submit(e)}>
                            <div className="form-group row">
                                <label htmlFor="id" className="col-sm-3">Id</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="id" value={data.id} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="conferenceDetailsId" className="col-sm-3">Conference Details Id</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="conferenceDetailsId" value={data.conferenceDetailsId} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="topic" className="col-sm-3">Topic</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" id="topic" value={data.topic} readOnly/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => handle(e)} id="name" placeholder="Enter Name" value={data.name} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3">Description</label>
                                <div className="col-sm-5">
                                    <textarea className="form-control" onChange={(e) => handle(e)} id="description" cols="30" rows="6" placeholder="Enter Description" value={data.description} />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="documentURL" className="col-sm-3">Document</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => handle(e)} id="documentURL" placeholder="Enter Document" value={data.documentURL} required/>
                                </div>
                            </div><br/>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}