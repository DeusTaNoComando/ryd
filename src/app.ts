import { AppDataSource } from './db/dbConfig'
import Server from './server'

const port = parseInt(process.env.APP_PORT || '3000')

AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established.')
        const server = new Server()
        server
            .start(port)
            .then((port) => console.log(`Running on port ${port}`))
            .catch((error) => {
                console.error('Failed to start server:', error)
            })
    })
    .catch((error) => {
        console.error('Database initialization failed:', error)
    })
