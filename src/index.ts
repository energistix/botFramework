import { Client } from "discord.js"
import { config } from "dotenv"
config()

const client = new Client({
  intents: [],
})

client.on("ready", () => {
  console.log("ready")
})

client.login()
