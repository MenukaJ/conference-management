import React, {useState, useEffect} from "react";
import axios from "axios";
import EditorSideNav from "../Navbar/EditorSideNav";

export default function ViewTrack(props) {

    const [data, setData] = useState({
        id: "",
        name: "",
        imageURL: "",
        status: ""
    });

    useEffect(() => {
        getTrack();
    }, [])

    function getTrack() {
        const trackId = props.match.params.id;
        axios.get("https://icaf-backend.herokuapp.com/tracks/" + trackId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const trackId = props.match.params.id;
        axios.put("https://icaf-backend.herokuapp.com/tracks/" + trackId, data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/tracks");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert(err.response.data.name);
            } else if(err.response.data.imageURL !== undefined) {
                alert(err.response.data.imageURL);
            } else if(err.response.data.status !== undefined) {
                alert(err.response.data.status);
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
            <EditorSideNav />
            <div className="container mt-3" style={{
                marginLeft: '60px',
                backgroundColor: '#ccccff',
                boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                borderRadius: '5px',
                height : '1000px'
            }}>
                <br/>
                <div className="card" style={{width : '60%', marginTop: 0, marginLeft : '15px', borderRadius: '5px'}}>
                    <div className="card-header" style={{backgroundColor: '#f2f2f2'}}>
                        <h4>Track</h4>
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
                                <label htmlFor="name" className="col-sm-3">Name</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => handle(e)} id="name" placeholder="Enter Name" value={data.name} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="imageURL" className="col-sm-3">Image</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" onChange={(e) => handle(e)} id="imageURL" placeholder="Enter Image" value={data.imageURL} />
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label htmlFor="status" className="col-sm-3">Status</label>
                                <div className="col-sm-5">
                                    <select className="form-control" onChange={(e) => handle(e)} id="status" value={data.status} required>
                                        <option defaultValue disabled>{data.status}</option>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="INACTIVE">INACTIVE</option>
                                    </select>
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