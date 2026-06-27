import { initLogger } from "evlog";

// Boot-time logger configuration. Imported for its side effect by the
// observability plugin so any consumer of the app (including `app.handle()`
// in tests) initializes logging without depending on the runtime entry.
initLogger({
	env: { service: "stack-server" },
});
