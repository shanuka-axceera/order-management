const mongoose = require('mongoose')

const completeSchema = new mongoose.Schema({

    DeliveryDate:{
        type: String,
        required:true,
    },
    TimeReleased:{
        type:String,
        required:true,
    },
    TimeReceived:{
        type:String,
        required:true
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'orders'
    },
    riders:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'riders'
    },
        orderId:{
            type:String,
            required:true
        }
},
    {
        timestamps:true
    })

const completeOrderModel = mongoose.model('completes',completeSchema);
module.exports=completeOrderModel;