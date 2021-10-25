# MongoDB mongoose
_Notes taken while experimenting, needs revisiting_
```shell
npm install mongoose --save

```

```js
// server/modules/db.js
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        //database Name
        const databaseName='demomern';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
```

#### Add to server.js
```js
import connectDB from './backend/config/db.js'

connectDB()
```