import mongoose from 'mongoose';


const notificationsSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    body: {
        type:String,
    },
    avatar:{
        type:String,
    },
    userId:{
        type:String,
    },
},{timestamps:true})

const Notification=mongoose.models.Notification || mongoose.model('Notification',notificationsSchema);

export default Notification;