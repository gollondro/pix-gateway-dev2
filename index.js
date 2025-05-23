const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

// Cargar dotenv primero
dotenv.config();

// Luego acceder a las variables de entorno
console.log('API URL:', process.env.RENPIX_API_URL);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/login", require("./routes/login"));
app.use("/api/payment", require("./routes/payment")); // Aquí van todos los endpoints de payment.js, incluyendo /payment-link
app.use("/api/webhook", require("./routes/webhook"));
app.use("/api/pending", require("./routes/pending"));
app.use("/api/paid", require("./routes/paid"));
app.use("/api/venta-tienda", require("./routes/ventaTienda"));
app.use('/admin', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  
  const usersRoutes = require('./routes/users');
  app.use('/api/users', usersRoutes);
});