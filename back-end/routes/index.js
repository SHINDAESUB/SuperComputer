const express = require("express")
const gangliaRoutes = require('./ganglia')
const ipmiRoutes = require('./ipmi')
const slurmRoutes = require('./slurm')

const router = express.Router()

router.use('/ganglia', gangliaRoutes)
router.use('/ipmi', ipmiRoutes)
router.use('/slurm', slurmRoutes)

module.exports = router;