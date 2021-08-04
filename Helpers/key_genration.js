import crypto from 'crypto'

const accessSecret = crypto.randomBytes(32).toString('hex')
const refreshSecret = crypto.randomBytes(32).toString('hex')

console.table({accessSecret, refreshSecret})