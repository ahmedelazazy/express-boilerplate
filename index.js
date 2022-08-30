require('dotenv-flow').config()

const express = require('express')
const Redis = require('redis')

const app = express()
const port = process.env.PORT || 3000

console.log(`ENV: ${process.env.NODE_ENV}`)

app.get('/', (req, res) => {
	res.send(`ok`)
})

//key=a&value=b
app.get('/set', async (req, res) => {
	try {
		const reditClient = Redis.createClient({ url: process.env.REDIS_URL })
		reditClient.connect()

		const { key, value } = req.query

		const redisResponse = await reditClient.set(key, value)

		res.json(redisResponse)
	} catch (err) {
		console.error(err)
		res.send(err.message)
	}
})

app.get('/get', async (req, res) => {
	try {
		const { key } = req.query

		const reditClient = Redis.createClient({ url: process.env.REDIS_URL })
		reditClient.connect()

		const redisResponse = await reditClient.get(key)

		res.json(redisResponse)
	} catch (err) {
		console.error(err)
		res.send(err.message)
	}
})

app.listen(port, () => {
	console.log(`App is up on port ${port}`)
})

