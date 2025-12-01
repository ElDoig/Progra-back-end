
import express from "express";
import productoRouter from "./src/routes/producto.js";
import usuarioRouter from "./src/routes/usuario.js";
import tiendaRouter from "./src/routes/tienda.js";
import bodyParser from "body-parser";
import cors from "cors";


import categoriaRouter from "./src/routes/categoria.js"; 
import ordenRouter from "./src/routes/orden.js";
const app = express();


app.use(
  cors()
);

app.use(bodyParser.json()); 


app.get("/", (req, resp) => {
  return resp.json({ mensaje: "Hola mundo", code: 200 });
});
app.use("/auth", usuarioRouter);
app.use("/producto", productoRouter);
app.use("/tienda", tiendaRouter);
app.use("/categorias", categoriaRouter);
app.use("/ordenes", ordenRouter);    

export default app;