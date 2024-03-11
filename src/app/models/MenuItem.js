const { Schema, models, model } = require("mongoose");

const MenuItemSchema = new Schema ({
    image: {
        type: String, 

    },
    name: {
        type: String, 
    },

    description: {
        type: String,  
    },
    basePrice: {
        type: Number, 

    },


}, {timeStamp: true});

export const MenuItem = models?.MenuItem  || model("MenuItem", MenuItemSchema);