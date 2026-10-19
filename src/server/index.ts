import amqp from "amqplib";
import { publishJSON } from "../internal/pubsub/publish.js"; 


async function main() {
  const rbbtConStr = "amqp://guest:guest@localhost:5672/";
  const conn = await amqp.connect(rbbtConStr);
  const newcon = await conn.createConfirmChannel();
  const exchange = "peril_direct";
  const routingKey = "pause";
  
  await publishJSON(newcon,exchange,routingKey,{isPaused: true})
  
  console.log("Connecting... to Peril server")
  console.log("Starting Peril server... ")
  process.on('SIGINT', async () => { 
  console.log("Shutting down...");
  conn.close();
  process.exit(0);
  }
)
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
