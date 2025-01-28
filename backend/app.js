const express = require('express');
const gameRoutes = require('./routes/gameRoutes');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors(
  {
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }
));


app.use(express.json());
app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
