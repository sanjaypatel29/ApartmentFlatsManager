import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addFlat, handleState } from '../Redux/FlatReducer/actions'
import { useEffect } from 'react'

export const AddFlates = () => {

    const [flatNumber, setFlatNumber] = useState("")
    const [flat_id, setFlat_id] = useState(121232232)
    const [type, setType] = useState("")
    const [apartment, setApartment] = useState("")
    const [block, setBlock] = useState("")
    const [residents, setResidents] = useState(0)
    const [residentsData, setResidentsData] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const isAdded = useSelector(state => state.flat.isAdd)

    const handleCancel = () => {
        history.push("/admin")
    }

    const handleAdd = (obj) => {
        setResidentsData([...residentsData, obj])
        alert("Flat Added!")
    }

    useEffect(() => {
        if (isAdded) {
            alert("Flate Added Successfully!")
            dispatch(handleState())
            history.push("/admin")
        }
    }, [isAdded, dispatch, history])

    const handleSubmit = () => {
        let payload = { flat_id, flatNumber, type, block, apartment, residents: residentsData }
        console.log(payload)
        dispatch(addFlat(payload))
    }

    const AddResidentsData = () => {
        let getResidents = []
        for (let i = 0; i < residents; i++) {
            getResidents.push(<div key={i}><residents onSubmit={handleAdd} /></div>)
        }
        return getResidents
    }

    return (
        <div className="p-5" style={{ marginLeft: "300px" }}>
            <h3 className="text-center text-info mb-3">Add Flate Here</h3>
            <input className="form-control mb-3" type="text" value={flatNumber} onChange={e => setFlatNumber(e.target.value)} placeholder="Enter Flate Number" />
            <input className="form-control mb-3" type="text" value={flat_id} onChange={e => setFlat_id(e.target.value)} placeholder="Enter Flate Number" />
            <select value={type} onChange={e => setType(e.target.value)} className="form-control mb-3">
                <option value="">Type</option>
                <option value="owner">Owner</option>
                <option value="tenant">Tenant</option>
            </select>
            <select value={block} onChange={e => setBlock(e.target.value)} className="form-control mb-3">
                <option value="">Block</option>
                <option value="owner">A</option>
                <option value="tenant">B</option>
            </select>
            <select value={apartment} onChange={e => setApartment(e.target.value)} className="form-control mb-3">
                <option value="">Apartment</option>
                <option value="gokul">Gokul</option>
                <option value="radhe">Radhe</option>
                <option value="shyam">Shyam</option>
            </select>
            <h5 className="text-info">Residents</h5>
            <Residents onSubmit={handleAdd} />
            {
                AddResidentsData()
            }
            <div className="row text-center">
                <div className="col-4">
                    <button className="btn btn-info px-5" onClick={() => setResidents(residents + 1)}>Add More Residents</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success px-5" onClick={handleSubmit}>Add Flate Data</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-danger px-5" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

function Residents({ onSubmit, key }) {

    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")

    const handleAdd = () => {
        let obj = { name, gender, age }
        onSubmit(obj)
    }

    return (
        <div className="p-5">
            <input className="form-control mb-3" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input className="form-control mb-3" type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" />
            <input className="form-control mb-3" type="text" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
            <button className="btn btn-primary mb-3" onClick={handleAdd}>+</button>
        </div>
    )
}