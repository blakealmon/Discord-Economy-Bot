const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const ecoSchema = require('../../Schemas.js/ecoSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gamble')
    .setDescription('Gamble for money'),
    async execute (interaction) {

        const {user, guild} = interaction;

        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id});

        let negative = Math.round((Math.random() * -300) - 10)
        let positive = Math.round((Math.random() * 300) + 10)

        const posN = [negative, positive];

        const amount = Math.round((Math.random() * posN.length));
        const value = posN[amount];

        if(!value) return await interaction.reply({ content: 'You recieved no money 😞, but you should be happy you broke even.', ephemeral: true});

        if (Data) {
            Data.Wallet += value;
            await Data.save();
        }

        if (value > 0) {
            const positiveChoices = [
                "You got lucky, take your profits while you still can 💰. You won : ",
                "Luck is upon you 🌈💰🍀. You won :  ",
                "Luck is on your side, one more won't hurt 🤑. You won : ",
                "You won this time, hopefully next time too 🙌 .", 
            ]
        
            const posName = Math.floor(Math.random() * positiveChoices.length);

            
            const embed1 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Beg Command")
            .addFields({ name: "Gamble Result", value: `${positiveChoices[[posName]]} $${value}`})

            await interaction.reply({ embeds: [embed1] });
        } 
        else {
            const negativeChoices = [
                "You lost, Try again next time 🥺. You lost : ",
                "Remember 99% of gamblers quit before their next big win 😪. You lost :  ",
                "You lost money, remember never back down, never what? 😫. You lost :  ",
                "I wish you better luck next time 🙏🏻🥺. ",
            ]

            const negName = Math.round((Math.random() * negativeChoices.length));

            const stringV = `${value}`;

            const nonSymbol = await stringV.slice(1);

            const embed2 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Gamble Command")
            .addFields({ name: "Gamble Result", value: `${negativeChoices[[negName]]} $${nonSymbol}`})

            await interaction.reply({ embeds: [embed2]})
        }








    }
}