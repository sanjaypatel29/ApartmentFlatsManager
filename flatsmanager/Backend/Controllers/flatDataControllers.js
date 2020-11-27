const { flatValidator } = require("../Validation/validation")
const FlatData = require("../Models/flatData")
const mongoose = require("mongoose");
const flatData = require("../Models/flatData");


const postFlatData = async (req, res) => {
    const { error } = flatValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const flat = new FlatData({
        flat_id: req.body.flat_id,
        apartment: req.body.apartment,
        type: req.body.type,
        flatNumber: req.body.flatNumber,
        residents: req.body.residents
    });

    try {
        const savedFlatData = await flat.save();
        res.send(savedFlatData);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getAllflats = async (req, res, next) => {
    let { flatNumber, apartment, type } = req.query;

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    let sortByflatNumber = flatNumber === 'asc' ? 1 : flatNumber === 'desc' ? -1 : 0;
    if (type !== undefined && apartment === undefined) {
        const flatDatas = await flatData.countDocuments(
            {
                type: { $regex: type }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({
                type: { $regex: type }
            })
                .sort({ flatNumber: sortByflatNumber })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (type === undefined && apartment !== undefined) {
        const flatDatas = await flatData.countDocuments(
            {
                apartment: { $regex: apartment }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({
                apartment: { $regex: apartment }
            })
                .sort({ flatNumber: sortByflatNumber })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (apartment !== undefined && type !== undefined) {
        const flatDatas = await flatData.countDocuments(
            {
                apartment: { $regex: apartment },
                type: { $regex: type }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({
                apartment: { $regex: apartment },
                type: { $regex: type }
            })
                .sort({ flatNumber: sortByflatNumber })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else {
        const flatDatas = await flatData.countDocuments({}, (err) => {
            if (err) console.log(err);
        });
        const finalPage = Math.ceil(flatDatas / limit);
        try {
            const results = await flatData.find({}).sort({ flatNumber: sortByflatNumber }).skip((page - 1) * limit).limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    }
};
const flatDataId = (req, res) => {
    console.log(req.query.id);
    FlatData.findById(req.query.id)
        .then((flatData) => res.json(flatData))
        .catch((err) => res.status(400).json('Error' + err));
};



const getflatSearch = async (req, res) => {
    try {
        const block = req.query.block.toLowerCase()
        let search_params
        if (req.query.flat_id != "")
            search_params = { flat_id: mongoose.Types.ObjectId(req.query.flat_id) };

        let flates
        if (req.query.flat_id != "") {
            flates = await FlatData.find(search_params)
        }
        else {
            flates = await FlatData.find()
        }

        let result = flates.filter(item => item.block.toUpperCase().includes(block))

        res.send({ flates: result, count: result.length })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

const editFlate = async (req, res) => {
    FlatData.findById(req.params.id)
        .then(flat => {
            flat.apartment = req.body.name
            flat.type = req.body.type
            flat.residents = req.body.residents

            flat.save()
                .then(() => res.json("Flat Data updated Successfully!"))
                .catch(err => res.status(400).json(`Error : ${err}`))
        })
        .catch(err => res.status(400).json(`ERROR : ${err}`))
}

const deleteFlate = async (req, res) => {
    const id = req.params.id
    flatData.findByIdAndDelete(id)
        .then(() => res.json("flat Data deleted Successfully!"))
        .catch(err => res.status(400).json(`Error : ${err}`))
}


module.exports = { postFlatData, getAllflats, flatDataId, deleteFlate, getflatSearch, editFlate }