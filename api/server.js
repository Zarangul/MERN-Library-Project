const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const BookStore = require("./models/BookModel");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req,res)=>{
//     res.send('Welcome fg')
// })

// app.get('/haberler', (req,res)=>{
//     res.send('<h1>Haberler</h1>')
// })

// mongoose connection
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
  )
  .then(console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.get('/books', (req,res)=>{
  BookStore.find().then(books=>res.json(books));
})

app.post('/newbook', async (req, res)=>{
  try{
    const newBook = new BookStore({
      bookName: req.body.bookName,
      author: req.body.author,
      quantity: req.body.quantity,
      department: req.body.department,
      comments: req.body.comments
    })

    const book = await newBook.save();
    res.status(200).json(book);
  }catch(err){
    console.log(err);
  }
})

app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await BookStore.findByIdAndDelete({_id: id})
    res.status(200).json({})
  } catch (err) {
    console.log(err);    
  }
});

app.put('/lend/:id', async (req,res)=>{
  try{
    await BookStore.findByIdAndUpdate(req.params.id, {$inc: {quantity:-1}})
    res.status(200).json({})
  }catch(err){
    console.log(err);
  }
})

app.put('/back/:id', async (req,res)=>{
  try{
    await BookStore.findByIdAndUpdate(req.params.id, {$inc: {quantity:1}})
  }catch(err){
    console.log(err);
  }
})

app.listen(PORT, () => {
  console.log("Server calisti");
});
