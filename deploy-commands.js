require('dotenv').config()
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const TOKEN = process.env.TOKEN;
const CLIENT_ID = '1444367521544143160';
const GUILD_ID = '1136595997783494686';

const commands = [
    new SlashCommandBuilder()
        .setName('setpseudo')
        .setDescription('Change le pseudo yorra')
        .addStringOption(option =>
            option.setName('pseudo')
                  .setDescription('Nouveau pseudo')
                  .setRequired(true))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Mise en place des commandes globales...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('Commandes globales installées ✅');
    } catch (error) {
        console.error(error);
    }
})();