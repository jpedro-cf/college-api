import dotenv from 'dotenv'
dotenv.config()

export const env = {
    mongoUrl: process.env.MONGO_URL,
    port: 3030,
    jwtSecret: process.env.JWT_SECRET,
    discordToken: process.env.DISCORD_TOKEN,
    discordClientID: process.env.DISCORD_CLIENT_ID
}
