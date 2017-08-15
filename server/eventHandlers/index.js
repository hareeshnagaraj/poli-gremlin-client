const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello, World!')
})

router.get('/:name', (req, res) => {
    const { name } = req.params

    res.send(`Hello, ${name}!`)
})

module.exports = router
