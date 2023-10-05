const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const banners = require("../assest/banners.js");
const errors = require("../assest/errors.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");
const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

module.exports = async (client, config) => {

  let guild = client.guilds.cache.get(config.guildID);

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "#ap_reply":
          {
            console.log(
              `\x1b[31m 〢`,
              `\x1b[30m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m${interaction.user.username} USED`,
              `\x1b[35m Reply Button`
            );

            const footerID = interaction.message.embeds[0].footer.text;
            const user = await interaction.guild.members.fetch(footerID);

            //// Modal application code ///
            let reply_modal = new Modal()
              .setTitle(`Send message to ${user.user.username}`)
              .setCustomId(`reply_modal`);

            const ap_reply = new TextInputComponent()
              .setCustomId("ap_reply")
              .setLabel(`Direct Messaging box`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(365)
              .setRequired(true)
              .setPlaceholder(`Type your message here`)
              .setStyle(2);

            let row_reply = new MessageActionRow().addComponents(ap_reply);
            reply_modal.addComponents(row_reply);


            const perms = [`${config.devRole}`, `${config.STAFF}`]
            let staff = guild.members.cache.get(interaction.user.id);
            if (staff.roles.cache.hasAny(...perms)) {
              await interaction.showModal(reply_modal);

            } else {
              await interaction
                .reply({
                  embeds: [
                    {
                      title: `${emojis.alert} Permission denied`,
                      description: `${errors.permsError}`,
                      color: `${color.gray}`,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                })
                .catch(() => console.log('Error Line 2622'));

              console.log(
                `\x1b[31m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m Permission denied`
              );
            }
          }
        default:
          break;
      }
    }
    //// Send application results in review room ////
    if (interaction.customId === 'reply_modal') {
      let reply = interaction.fields.getTextInputValue("ap_reply");

      /// Embed of data in review room ///
      const ID = interaction.message.embeds[0].footer.text;
      const user = await interaction.guild.members.fetch(ID);

      try {
        await user.send({
          embeds: [
            {
              title: `${emojis.email} Message from ${interaction.user.username}`,
              description: reply,
              color: color.gray,
              thumbnail: { url: interaction.user.displayAvatarURL() },
              //image: { url: `${banners.appSentbanner}` },
              timestamp: new Date(),
              footer: {
                text: "Sun&CO Staff - Please don't reply to this message here",
                icon_url: banners.parfaitIcon,
              },
            },
          ],
          components: [],
        });

        const log = interaction.guild.channels.cache.get(config.log);
        await log.send({
          embeds: [
            {
              title: `${emojis.log} Message Log`,
              description: `${emojis.email} ${interaction.user} sent a message to ${user.user}`,
              color: color.gray,
              fields: [
                {
                  name: `${emojis.reason} Message Content`,
                  value: reply,
                  inline: false
                },
              ],
              timestamp: new Date(),
              footer: {
                text: 'Sent in',
                icon_url: banners.parfaitIcon,
              },
            },
          ],
          //this is the important part
          ephemeral: false,
        });

        await interaction.reply({
          embeds: [
            {
              title: `${emojis.check} Message Sent`,
              description: `${emojis.threadMark} Your message has been sent to ${user}`,
              color: `${color.gray}`,
              fields:
                [{
                  name: `${emojis.email} Message Content:`,
                  value: reply,
                  inline: false,
                }],
              ///thumbnail: { url: 'https://i.imgur.com/FiSTCop.png', },
              //image: { url: `${banners.appSentbanner}` },
            },
          ],
          //this is the important part
          ephemeral: true,
          components: [],
        });
      }
      catch (e) {
        return await interaction.reply({
          content: `The ${user} Dms Were Closed.`,
          ephemeral: true,
        })
      }
    }
  });
};
