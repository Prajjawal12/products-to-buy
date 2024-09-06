const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose

  .connect(
    'mongodb+srv://deepyadavprajjawal:SpIY2pcI0fY9oZPL@cluster0.aoi3w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const Item = mongoose.model('Item', {
  name: String,
});
//Create
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.send(newItem);
});

//Read
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

//Update
app.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  const deleteItem = await Item.findByIdAndDelete(req.params.id);
  res.send(deleteItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
