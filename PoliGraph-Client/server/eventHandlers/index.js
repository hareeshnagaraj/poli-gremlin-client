const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('Hello, World!')
    res.sendFile(path.resolve(__dirname, '../../', 'tmp.json'));
})

router.get('/:name', (req, res) => {
    const { name } = req.params

    res.send(`Hello, ${name}!`)
})

module.exports = router
