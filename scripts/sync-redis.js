const fs = require('fs');
const path = require('path');
const Redis = require('ioredis');

async function main() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.error("REDIS_URL environment variable is missing.");
    process.exit(1);
  }

  const redis = new Redis(redisUrl);
  console.log("Connected to Redis. Syncing namespaces...");

  const rootDir = path.resolve(__dirname, '..');
  const namespaces = ['portal', 'auth', 'api', 'ic_core'];

  for (const ns of namespaces) {
    const nsPath = path.join(rootDir, ns);
    if (!fs.existsSync(nsPath)) continue;

    const files = fs.readdirSync(nsPath).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const lang = path.basename(file, '.json');
      const content = fs.readFileSync(path.join(nsPath, file), 'utf8');
      
      try {
        // Validate JSON
        JSON.parse(content);
        
        // Push to Redis
        const redisKey = `locale:${ns}:${lang}`;
        await redis.set(redisKey, content);
        
        // Notify subscribers
        await redis.publish('locale_updates', `${ns}:${lang}`);
        
        console.log(`✅ Synced ${ns}/${lang} -> ${redisKey}`);
      } catch (err) {
        console.error(`❌ Failed to parse or sync ${ns}/${lang}:`, err.message);
        process.exit(1);
      }
    }
  }

  console.log("Sync complete!");
  redis.quit();
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
