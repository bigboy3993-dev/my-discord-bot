const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ------------------------------
// CONFIG
// ------------------------------
const LOG_CHANNEL = "1457111697587310642"; // your log channel

// ------------------------------
// BOT READY
// ------------------------------
client.on("ready", () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});

// ------------------------------
// POLLING LOOP (checks server.js)
// ------------------------------
setInterval(() => {
    fetch("http://localhost:3000/get-command")
        .then(res => res.json())
        .then(data => {
            if (!data || data === "none") return;

            // STAFF JOIN LOG
            if (data.type === "staff-join") {
                const channel = client.channels.cache.get(LOG_CHANNEL);
                if (channel) {
                    channel.send(`🟢 **Staff Joined the Game:** ${data.username}`);
                }
            }

            // STAFF LEAVE LOG + PLAYTIME
            if (data.type === "staff-leave") {
                const channel = client.channels.cache.get(LOG_CHANNEL);
                if (channel) {
                    const minutes = Math.floor(data.playtime / 60);
                    const seconds = data.playtime % 60;

                    channel.send(
                        `🔴 **Staff Left the Game:** ${data.username}\n` +
                        `⏱️ **Playtime:** ${minutes}m ${seconds}s`
                    );
                }
            }

        })
        .catch(err => {
            console.log("Polling error:", err);
        });
}, 2000);

// ------------------------------
// LOGIN
// ------------------------------
client.login("MTQ1NzA5MjMwMTkxNzY1MDk5Nw.G18wol.er9VQ0FAq_A4u0_HVkTnxHQhaVIWvND2Wtq7tc");



