const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db_connection');
const todoRouter = require('./routes/todos');
const userRouter = require('./routes/users');
const cors = require('cors');
const PORT =  process.env.PORT || 5000;

const app = express();
app.use(cors({
    origin: 'https://frontend--strong-chebakia-5d96ad.netlify.app'
}));
app.use(bodyParser.json());
app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});