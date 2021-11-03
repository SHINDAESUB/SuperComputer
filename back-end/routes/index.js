const express = require("express")
const gangliaRoutes = require('./ganglia')
const ipmiRoutes = require('./ipmi')
const slurmRoutes = require('./slurm')
const slurmOutRoutes = require('./out')

const router = express.Router()

router.use('/ganglia', gangliaRoutes)
router.use('/ipmi', ipmiRoutes)
router.use('/slurm', slurmRoutes)
router.use('/out', slurmOutRoutes)

module.exports = router;