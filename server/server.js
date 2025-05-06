// server.js
const mongoose = require('mongoose');
const app = require('./app'); // import app
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


app.get('/',(req,res)=>{

  res.json("welcome")
})

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
}
