import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

//La función use() sirve para procesar datos antes de que llegen a las rutas especificadas. Esto es util a la hora de por ejemplo autentificar usuarios, ya que antes de que accedan a la ruta tendrán que pasar por un middleware que valide sus credenciales. A esto se le llama middleware

app.use(express.json()); //Este middleware se encarga de parsear los datos json recibidos por el cliente a objeto javascript y así pueda leerlo el servidor.

app.use(cors()); //Este middleware permite resolver el error de CORS(Cross-Origin Resource Sharing). CORS es un mecanismo utilizado por los navegadores para permitir que los servidores especifiquen qué dominios tienen permitido acceder a los recursos del servidor. En este caso, estoy tratando de hacer una solicitud desde el dominio 'http://127.0.0.1:5173' (front end) a 'http://localhost:4000' (back end), lo que se considera una solicitud entre diferentes orígenes. Por lo tanto al utlizar este middleware habilita todas las peticiones al servidor desde todos los diferentes posibles dominios.

app.use(indexRoutes);
app.use(taskRoutes);

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
