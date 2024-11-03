import bodyParser from 'body-parser'
import express, { Application } from 'express'
import { AppDataSource } from './db/dbConfig'
import poiRouter from './routers/poi.router'
import pumpRouter from './routers/pump.router'

class Server {
    private app: Application

    constructor() {
        this.app = express()
        this.config()
        this.routerConfig()
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json({ limit: '1mb' })) // 100kb default
    }

    private routerConfig() {
        this.app.get('/test', (req, res) => {
            res.send('Test route works!')
        })

        this.app.use('/api/pois', poiRouter)
        this.app.use('/api', pumpRouter)
    }

    public start = (port: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            // Ensure that the database is connected before starting the server
            AppDataSource.isInitialized
                ? this.app
                      .listen(port, () => resolve(port))
                      .on('error', (err) => reject(err))
                : reject(new Error('Database connection is not initialized.'))
        })
    }
}

export default Server
