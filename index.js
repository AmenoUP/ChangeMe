require('dotenv').config()


const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    partials: [Partials.GuildMember]
});

// 🔑 Remplace avec le token de ton bot
const TOKEN = process.env.TOKEN;

// 🧍 Ton ID Discord
const MON_ID = '1135572806545985536';

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'setpseudo') {
        const nouveauPseudo = interaction.options.getString('pseudo');

        try {
            const membre = await interaction.guild.members.fetch(MON_ID);
            if (!membre) return interaction.reply("Impossible de trouver l'utilisateur.");

            await membre.setNickname(nouveauPseudo);
            interaction.reply(`✅ Le pseudo a été changé en : **${nouveauPseudo}**`);
        } catch (error) {
            console.error(error);
            interaction.reply("❌ Impossible de changer le pseudo. Vérifie les permissions du bot et la hiérarchie des rôles.");
        }
    }
});

client.login(TOKEN);