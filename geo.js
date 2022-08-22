const fetch = require('cross-fetch')
const Reader = require('@maxmind/geoip2-node').Reader

const DB_PATH = '/usr/share/GeoIP'
const DB_NAME = 'GeoLite2-City.mmdb'

const init = async () => {
	const dbPath = require.resolve(`${DB_PATH}/${DB_NAME}`)

	return await Reader.open(dbPath)
}

//
const get = async (req, res) => {
	try {
		const reader = await init()

		let ip = req.clientIp

		if (req.query.ip) ip = req.query.ip

		if (ip === '::1') {
			ip = await getMyIP()
		}

		const maxStart = Date.now()

		const response = reader.city(ip)
		const maxtState = response?.subdivisions?.[0]?.isoCode

		const maxEnd = Date.now()
		const maxTime = maxEnd - maxStart

		if (response.country?.isoCode === 'US') {
			res.send({
				ip,
				maxtState,
				maxTime,
			})
		} else {
			res.send({ ip, msg: 'not usa' })
		}
	} catch (error) {
		res.json({ error: error.message })
	}
}

const getMyIP = async () => {
	try {
		const url = `https://pro.ip-api.com/json/?key=WBj4D53RvSW7byu&fields=query`
		const response = await fetch(url)
		const json = await response.json()
		return json.query
	} catch (err) {
		return null
	}
}

module.exports = {
	get,
}

