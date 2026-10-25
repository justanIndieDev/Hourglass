
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async readyClient => {
  console.log(`Hourglass is online as ${readyClient.user.tag}`);

  await readyClient.application.commands.set([
    {
      name: 'ping',
      description: 'Check whether Hourglass is online.'
    }
  ]);

  console.log('Slash commands registered.');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply({
      content: `⏳ Hourglass is online! Latency: ${client.ws.ping}ms`,
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
