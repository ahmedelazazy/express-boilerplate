const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const appName = process.env.APP_NAME || ''

app.get('/', (req, res) => {
	res.send(`App ${appName} is up and running`)
})

app.listen(port, () => {
	console.log(`App ${appName} is up on port ${port}`)
})

