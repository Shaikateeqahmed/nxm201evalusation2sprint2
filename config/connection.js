const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connection = mongoose.connect("mongodb+srv://ShaikAteeqAhmed:shaik@cluster0.yyxbopz.mongodb.net/nxm201evals2?retryWrites=true&w=majority");
module.exports={connection};