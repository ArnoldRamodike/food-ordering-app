const { Schema, models, model } = require("mongoose");

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
});

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
    sizes: {
        type: [ExtraPriceSchema], 
    },
    extraIngridientPrices: {
        type: [ExtraPriceSchema], 
    },
    
}, {timeStamp: true});

export const MenuItem = models?.MenuItem  || model("MenuItem", MenuItemSchema);