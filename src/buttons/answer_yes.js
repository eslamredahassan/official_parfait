const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const fieldsText = require("../assest/fieldsText.js");
const banners = require("../assest/banners.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");
const moment = require("moment");

module.exports = async (client, config) => {

  let guild = client.guilds.cache.get(config.guildID);

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "#answer_yes":
          {
            let applyButton = new MessageActionRow().addComponents([
              new MessageButton()
                .setStyle("SECONDARY")
                .setDisabled(false)
                .setCustomId("#ap_apply")
                .setLabel("Become a Sun Legend")
                .setEmoji(emojis.apply),
            ]);

          console.log(
            `\x1b[0m`,
            `\x1b[31m 〢`,
            `\x1b[33m ${moment(Date.now()).format("lll")}`,
            `\x1b[34m ${interaction.user.username} Answered`,
            `\x1b[35m Yes for Requirements`,
          );

            return await interaction.update({
              embeds: [
                new MessageEmbed()
                  .setColor(color.gray)
                  .setTitle(`Step Two`)
                  .setDescription(`### You're now ready to apply`)
                  //.setThumbnail(Logo)
                  .setImage(banners.stepTwoBanner)
                  .addFields(
                    {
                      name: `**Tips**`,
                      value: fieldsText.tipOne,
                      inline: false,
                    },
                    {
                      name: `**Warning**`,
                      value: fieldsText.tipTwo,
                      inline: false,
                    },
                  )
                  .setFooter({
                    ///text: `This is for Staff members only, no one else can see it`,
                    text: interaction.guild.name,
                    iconURL: banners.parfaitIcon,
                  }),
              ],
              ephemeral: true,
              components: [applyButton],
            });
          }
        default:
      }
    }
  });
};
