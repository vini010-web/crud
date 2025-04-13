const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    f_name:
    {
        type: String,
        require: true
    },
    l_name:
    {
        type: String,
        require: true
    },
    age:
    {
        type: String,
       
    },
    qli:
    {
        type: String,
        
    },
    gender:
    {
        type: String,
        
    },

    email_id:
    {
        type: String,
        require: true,
        unique: true
    },
    mob_num:
    {
        type: String,
        require: true,
        unique: true
    },
    state:
    {
        type: String,
       
    },
    city:
    {
        type: String,
        
    },
    pass:
    {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('user', userSchema);