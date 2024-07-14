import express from 'express'
import bootstrap from './src/bootstrap.js'
const app = express()
// app.use(cors())
const port = process.env.port || 5000 
bootstrap(app, express)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/**
 * company model >>> hr << job model 

 */