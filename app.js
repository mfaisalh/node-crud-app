const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { sequelize } = require('./models');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();