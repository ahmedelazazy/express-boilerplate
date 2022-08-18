const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const requestIp = require('request-ip')

const appName = process.env.APP_NAME || '_App_Name_'
const version = '1.0'
app.use(requestIp.mw())

app.get('/', (req, res) => {
	console.log(process.env)
	const myVar = process.env.MY_VAR
	res.send(`v9`)
})

app.get('/path1', (req, res) => {
	res.send(`/path1 - ${appName}`)
})

app.get('/path2', (req, res) => {
	res.send(`/path2 - ${appName}`)
})

app.get('/ip', (req, res) => {
	const ip = req.clientIp || 'Not detected'
	res.send(ip)
})

app.listen(port, () => {
	console.log(`${appName} is up on port ${port}`)
})

