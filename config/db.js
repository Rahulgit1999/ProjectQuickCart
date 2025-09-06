import mongoose from "mongoose"

let cached = global.mongoose

if (!cached){
    cached=global.mongoose={conn:null , promise : null}
}

async function connetDB(){
    if (cached.conn){
        return cached.conn
    }

    if (!cached.promise){
        const opts={
            bufferCommands:false
        }

        cached.promise=mongoose.connect(`${ProcessingInstruction.env.MONGODB_URI}/quickcart`,opts).then(mongooseb =>{return mongoose})



    }

    catched.con=await cached.promise
    return cached.conn
}
export default connetDB