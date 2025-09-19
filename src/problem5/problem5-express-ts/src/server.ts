import "dotenv/config";
import express from "express";
import cors from "cors";
import { resourcesRouter } from "./routes/resources";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "problem5-express-ts-crud" });
});

app.use("/api/resources", resourcesRouter);

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
