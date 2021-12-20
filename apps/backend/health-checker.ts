import "dotenv/load.ts"; // Auto load .env file

const BACKEND_LOCAL_URL = Deno.env.get("BACKEND_LOCAL_URL");

if(!BACKEND_LOCAL_URL) throw new Error("BACKEND_LOCAL_URL environment variable not set!");

let interval: number | null = null;

const restart = () => {
    console.log("Restart app..");
    Deno.run({ cmd: ["pm2", "--update-env", "restart", "dev:@pixelrpg/backend"] });
    if (interval) clearInterval(interval);
    startWatch();
}

const startWatchInterval = (watchInterval: number) => {
    interval = setInterval(async () => {
        try {
            const state = await fetch(BACKEND_LOCAL_URL);
            if (!state.ok) {
                restart();
                
            } else {
                console.log(`ok, next check in ${watchInterval}ms..`);
            }
        } catch (error) {
            console.error(error);
            restart();
        }
        
    }, watchInterval);
}

const startWatch = (startDelay=30000, watchInterval=15000) => {
    console.log(`Start watcher in ${startDelay}ms..`);
    setTimeout(() => {
        startWatchInterval(watchInterval);
    }, startDelay)
}

startWatch();