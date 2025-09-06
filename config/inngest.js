import User from "@/models/user";
import { Inngest } from "inngest";
import { connect } from "mongoose";
import connetDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest function  to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event : 'clerk/user.created'
    },
    async ({event}) =>{
        const {id,first_name,last_name,email_addresses,
image_ur,} = event.data
const userData = {
    _id:id,
    email:email_addresses[0].email_address,
    name: first_name + ' '+last_name,
    imageUrl:image_ur
}

await connectDB()
    await User.create(userData)

    }
      
)

//Inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {
        event:'clerk/user.update'
    },
    async ({event})=>{
        const {id,first_name,last_name,email_addresses,
image_ur,} = event.data
const userData = {
    _id:id,
    email:email_addresses[0].email_address,
    name: first_name + ' '+last_name,
    imageUrl:image_ur
}
await connetDB()
await User.findByIdAndUpdate(id.userData)

    }
)
// inngest function to delete user to database
export const syncDeletion=inngest.createFunction({
    id:'delete-user-with-clerk'
},

    {event:'clerk/user.deleted'},
    
    async({event})=>{
        const {id}=event.data

        await User.findByIdAndDelete(id)
    }

)