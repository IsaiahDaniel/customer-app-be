import express, { Response, Request } from "express";
import dotenv from "dotenv";
import colors from "colors";
// import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db";
import CustomerRoute from "./routes/CustomersRoute";

import errorHandler from "./middleware/error";


const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if(process.env.NODE_ENV === "development"){
//   app.use(morgan("dev"));
// }

app.use(cors());
app.use(helmet());

connectDB();

// Routes
app.get('/', (req: Request, res: Response) => res.send('Hello, World!'));
app.use("/api/v1/customers", CustomerRoute);

app.use(errorHandler);

// Export the Express app instance
export default app;
