const Bi = require('../models/bisection')
const Differ = require('../models/diff')
const Intre = require('../models/intregral')
createBi = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const Bisec = new Bi(body)

    if (!Bisec) {
        return res.status(400).json({ success: false, error: err })
    }

    Bisec
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: Bisec._id,
                message: 'Root created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Root not created!',
            })
        })
}

getBisection = async (req, res) => {
    await Bi.find({}, (err, falseposition) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!falseposition.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: falseposition })
    }).catch(err => console.log(err))
}

createDiff = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const Diff = new Differ(body)

    if (!Diff) {
        return res.status(400).json({ success: false, error: err })
    }

    Diff
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: Diff._id,
                message: 'Diff created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Diff not created!',
            })
        })
}
getDiff = async (req, res) => {
    await Differ.find({}, (err, falseposition) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!falseposition.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: falseposition })
    }).catch(err => console.log(err))
}

createIntre = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const Intregral = new Intre(body)

    if (!Intregral) {
        return res.status(400).json({ success: false, error: err })
    }

    Intregral
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: Intregral._id,
                message: 'Intregral created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Intregral not created!',
            })
        })
}
getIntre = async (req, res) => {
    await Intre.find({}, (err, falseposition) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!falseposition.length) {
            return res
                .status(404)
                .json({ success: false, error: `Intregral not found` })
        }
        return res.status(200).json({ success: true, data: falseposition })
    }).catch(err => console.log(err))
}
module.exports = {
    createBi,
    getBisection,
    createDiff,
    getDiff,
    createIntre,
    getIntre,
}