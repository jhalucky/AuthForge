import app from "./app";
import { env } from "./config/env";

app.listen(process.env.PORT, () => {
  console.log("Server running on port", env.PORT);
});