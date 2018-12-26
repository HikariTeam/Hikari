const { Structures } = require('./src')
const { Hikari } = Structures

const client = new Hikari(process.env.PREFIX)

client.start(process.env.DISCORD_TOKEN)
