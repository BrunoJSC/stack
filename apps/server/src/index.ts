import { app } from "@/app";

// Bun runtime entry. The only place `.listen()` is called.
app.listen(Number(process.env.PORT) || 3000, ({ hostname, port }) => {
	console.log(`Server is running on http://${hostname}:${port}`);
});
