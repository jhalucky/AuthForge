import { env } from "./config/env";  // ← must be first import
import app from "./app";

app.listen(env.PORT, () => {
  console.log("Server running on port", env.PORT);
});