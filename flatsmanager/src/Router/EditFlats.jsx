import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { editFlate, handleState } from '../Redux/FlatReducer/actions'
import { useEffect } from 'react'
export const EditFlats = (data) => {
    const [flatNumber, setFlatNumber] = useState(data.data.flatNumber)
    const [flat_id, setFlat_id] = useState(data.data.flat_id)
    const [type, setType] = useState(data.data.type)
    const [apartment, setApartment] = useState(data.data.apartment)
    const [block, setBlock] = useState(data.data.block)
    let residents = data.data.residents
    const [residentsCount, setResidentsCount] = useState(residents.length)
    const history = useHistory()
    const isEdit = useSelector(state => state.flat.isEdit)
    const dispatch = useDispatch()

    const editing = () => {
        let payload = {
            ...data.data,
            flatNumber,
            flat_id,
            type,
            apartment,
            block,
            residents
        }
        console.log(payload)
        dispatch(editFlate({ payload }))
    }

    const handleEditAdd = (obj, index) => {
        residents = residents.map((item, i) => i === index ? obj : item)
        alert("Flat updated!")
    }

    const addResidents = () => {
        let getResidents = []
        for (let i = 0; i < residentsCount; i++) {
            getResidents.push(<div key={i}><Residents onSubmit={handleEditAdd} data={residents[i]} i={i} /></div>)
        }
        return getResidents
    }

    const addMoreResidents = () => {
        setResidentsCount(residentsCount + 1)
        residents.push({ name: "", gender: "", age: "" })
    }

    useEffect(() => {
        if (isEdit) {
            alert("Flats Updated Successfully!")
            dispatch(handleState())
            // history.push("/admin")
        }
    }, [isEdit, dispatch, history])

    return (
        <div className="px-5 pt-4 container">
            <h3 className="text-center text-info">EditFlates Here</h3>
            <input className="form-control mb-3" type="text" value={flatNumber} onChange={e => setFlatNumber(e.target.value)} placeholder="Enter Flate Number" />
            <input className="form-control mb-3" type="text" value={flat_id} onChange={e => setFlat_id(e.target.value)} placeholder="Enter Flate Number" />
            <select value={type} onChange={e => setType(e.target.value)} className="form-control mb-3">
                <option value="">Type</option>
                <option value="owner">Owner</option>
                <option value="tenant">Tenant</option>
            </select>
            <select value={block} onChange={e => setBlock(e.target.value)} className="form-control mb-3">
                <option value="">Block</option>
                <option value="A">A</option>
                <option value="B">B</option>
            </select>
            <select value={apartment} onChange={e => setApartment(e.target.value)} className="form-control mb-3">
                <option value="">Apartment</option>
                <option value="gokul">Gokul</option>
                <option value="radhe">Radhe</option>
                <option value="syam">Shyam</option>
            </select>
            <h5 className="text-info">Residents</h5>
            {
                addResidents()
            }
            <div className="row text-center">
                <div className="col-4">
                    <button className="btn btn-info px-5" onClick={() => addMoreResidents()}>Add More Residents</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success px-5" onClick={() => editing()}>Update Change</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-danger px-5" onClick={() => history.push("/admin")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

function Residents({ onSubmit, data, i }) {
    const [name, setName] = useState(data.name)
    const [gender, setGender] = useState(data.gender)
    const [age, setAge] = useState(data.age)

    const handleEdit = () => {
        if (name === "" || gender === "" || age === "") {
            alert("No field should be empty")
            return
        }
        let obj = { name, gender, age }
        onSubmit(obj, i)
    }
    return (
        <div className="px-5">
            <input className="form-control mb-3" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input className="form-control mb-3" type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" />
            <input className="form-control mb-3" type="text" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
            <button className="btn btn-primary mb-3" onClick={handleEdit}>update Flat</button>
        </div>
    )
}
