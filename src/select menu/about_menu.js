const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

const fieldsText = require("../assest/fieldsText.js");
const banners = require("../assest/banners.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "#about-menu":
          {
            console.log(
              `\x1b[31m  〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m${interaction.user.username} USED`,
              `\x1b[35m About Button`,
            );

            const aboutmenu = new MessageActionRow().addComponents(
              new MessageSelectMenu()
                .setCustomId("#about-menu")
                .setPlaceholder("Press here to select the category")
                .addOptions([
                  {
                    label: "About Sun Community",
                    value: "ASC",
                    emoji: emojis.aboutSun,
                  },
                  {
                    label: "Hall of fame for tourney wins",
                    value: "HOFFTW",
                    emoji: emojis.otherAchv,
                  },
                  {
                    label: "Sun Leaders",
                    value: "SL",
                    emoji: emojis.leader,
                  },
                  {
                    label: "Staff Members",
                    value: "SM",
                    emoji: emojis.staff,
                  },
                  {
                    label: "Our Partners",
                    value: "OP",
                    emoji: emojis.partner,
                  },
                ]),
            ); // End of .addComponents()
            await interaction.reply({
              embeds: [
                {
                  title: `${emojis.aboutSun} About ${interaction.guild.name}`,
                  description: `**We're glad that you are interested in knowing more about us**`,
                  image: { url: banners.aboutSunBanner },
                  color: color.gray,
                  fields: [
                    {
                      name: `${emojis.warning} Notice`,
                      value: `${emojis.threadMark} The this menu will be updated from time to time`,
                      inline: false,
                    },
                    {
                      name: `${emojis.lastUpdate} Last update`,
                      value: `${emojis.threadMark} <t:1693612080:D>`,
                      inline: true,
                    },
                  ],
                },
              ],
              //this is the important part
              ephemeral: true,
              components: [aboutmenu],
            });
          }
          client.on("interactionCreate", async (interaction) => {
            if (interaction.isSelectMenu()) {
              let choice = interaction.values[0];
              if (choice == "ASC") {
                const controll = new MessageActionRow().addComponents([
                  new MessageButton()
                    .setStyle(5)
                    .setLabel(`Youtube`)
                    .setURL(
                      `https://www.youtube.com/channel/UCxtjE4pbP7O3RwKm5yyhltg`,
                    )
                    .setEmoji(emojis.youtube),
                  new MessageButton()
                    .setStyle(5)
                    .setLabel(`Twitch`)
                    .setURL(`https://www.twitch.tv/suncosmash`)
                    .setEmoji(emojis.twitch),
                  new MessageButton()
                    .setStyle(5)
                    .setLabel(`Battlefy`)
                    .setURL(`https://battlefy.com/sunco-smash-legends`)
                    .setEmoji(emojis.battlefy),
                ]);

                const aboutmenu = new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                    .setCustomId("#about-menu")
                    .setPlaceholder("Select From Here")
                    .addOptions([
                      {
                        label: "About Sun Community",
                        value: "ASC",
                        default: true,
                        emoji: emojis.aboutSun,
                      },
                      {
                        label: "Hall of fame for tourney wins",
                        value: "HOFFTW",
                        emoji: emojis.otherAchv,
                      },
                      {
                        label: "Sun Leaders",
                        value: "SL",
                        emoji: emojis.leader,
                      },
                      {
                        label: "Staff Members",
                        value: "SM",
                        emoji: emojis.staff,
                      },
                      {
                        label: "Our Partners",
                        value: "OP",
                        emoji: emojis.partner,
                      },
                    ]),
                ); // End of .addComponents()

                console.log(
                  `\x1b[31m  〢`,
                  `\x1b[33m ${moment(Date.now()).format("lll")}`,
                  `\x1b[34m ${interaction.user.username} WATCH`,
                  `\x1b[35m About Sun&CO Category`,
                );

                return await interaction.update({
                  embeds: [
                    {
                      title: `${emojis.aboutSun} About ${interaction.guild.name}`,
                      description: fieldsText.aboutSun,
                      image: { url: banners.sunBanner },
                      color: color.gray,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                  components: [controll, aboutmenu],
                });
              } else if (choice == "HOFFTW") {
                const aboutmenu = new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                    .setCustomId("#about-menu")
                    .setPlaceholder("Select From Here")
                    .addOptions([
                      {
                        label: "About Sun Community",
                        value: "ASC",
                        emoji: emojis.aboutSun,
                      },
                      {
                        label: "Hall of fame for tourney wins",
                        value: "HOFFTW",
                        default: true,
                        emoji: emojis.otherAchv,
                      },
                      {
                        label: "Sun Leaders",
                        value: "SL",
                        emoji: emojis.leader,
                      },
                      {
                        label: "Staff Members",
                        value: "SM",
                        emoji: emojis.staff,
                      },
                      {
                        label: "Our Partners",
                        value: "OP",
                        emoji: emojis.partner,
                      },
                    ]),
                ); // End of .addComponents()

                console.log(
                  `\x1b[31m  〢`,
                  `\x1b[33m ${moment(Date.now()).format("lll")}`,
                  `\x1b[34m ${interaction.user.username} WATCH`,
                  `\x1b[35m Hall of fame Category`,
                );

                return await interaction.update({
                  embeds: [
                    {
                      title: `${emojis.achv} Hall of fame for tourney wins`,
                      description: fieldsText.hallOfFame,
                      image: { url: banners.hofBanner },
                      color: color.gray,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                  components: [aboutmenu],
                });
              } else if (choice == "SM") {
                const aboutmenu = new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                    .setCustomId("#about-menu")
                    .setPlaceholder("Select From Here")
                    .addOptions([
                      {
                        label: "About Sun Community",
                        value: "ASC",
                        emoji: emojis.aboutSun,
                      },
                      {
                        label: "Hall of fame for tourney wins",
                        value: "HOFFTW",
                        emoji: emojis.otherAchv,
                      },
                      {
                        label: "Sun Leaders",
                        value: "SL",
                        emoji: emojis.leader,
                      },
                      {
                        label: "Staff Members",
                        value: "SM",
                        default: true,
                        emoji: emojis.staff,
                      },
                      {
                        label: "Our Partners",
                        value: "OP",
                        emoji: emojis.partner,
                      },
                    ]),
                ); // End of .addComponents()

                console.log(
                  `\x1b[31m  〢`,
                  `\x1b[33m ${moment(Date.now()).format("lll")}`,
                  `\x1b[34m ${interaction.user.username} WATCH`,
                  `\x1b[35m Staff Members Category`,
                );
                return await interaction.update({
                  embeds: [
                    {
                      title: `Staff Members`,
                      description: fieldsText.staffMembers,
                      image: { url: banners.staffBanner },
                      color: color.gray,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                  components: [aboutmenu],
                });
              } else if (choice == "SL") {
                const aboutmenu = new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                    .setCustomId("#about-menu")
                    .setPlaceholder("Select From Here")
                    .addOptions([
                      {
                        label: "About Sun Community",
                        value: "ASC",
                        emoji: emojis.aboutSun,
                      },
                      {
                        label: "Hall of fame for tourney wins",
                        value: "HOFFTW",
                        emoji: emojis.otherAchv,
                      },
                      {
                        label: "Sun Leaders",
                        value: "SL",
                        default: true,
                        emoji: emojis.leader,
                      },
                      {
                        label: "Staff Members",
                        value: "SM",
                        emoji: emojis.staff,
                      },
                      {
                        label: "Our Partners",
                        value: "OP",
                        emoji: emojis.partner,
                      },
                    ]),
                ); // End of .addComponents()

                console.log(
                  `\x1b[31m  〢`,
                  `\x1b[33m ${moment(Date.now()).format("lll")}`,
                  `\x1b[34m ${interaction.user.username} WATCH`,
                  `\x1b[35m Leaders Category`,
                );

                return await interaction.update({
                  embeds: [
                    {
                      title: `Sun Community Leaders`,
                      description: fieldsText.leaders,
                      image: { url: banners.leadersBanner },
                      color: color.gray,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                  components: [aboutmenu],
                });
              } else if (choice == "OP") {
                const aboutmenu = new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                    .setCustomId("#about-menu")
                    .setPlaceholder("Select From Here")
                    .addOptions([
                      {
                        label: "About Sun Community",
                        value: "ASC",
                        emoji: emojis.aboutSun,
                      },
                      {
                        label: "Hall of fame for tourney wins",
                        value: "HOFFTW",
                        emoji: emojis.otherAchv,
                      },
                      {
                        label: "Sun Leaders",
                        value: "SL",
                        emoji: emojis.leader,
                      },
                      {
                        label: "Staff Members",
                        value: "SM",
                        emoji: emojis.staff,
                      },
                      {
                        label: "Our Partners",
                        value: "OP",
                        default: true,
                        emoji: emojis.partner,
                      },
                    ]),
                ); // End of .addComponents()

                console.log(
                  `\x1b[31m  〢`,
                  `\x1b[33m ${moment(Date.now()).format("lll")}`,
                  `\x1b[34m ${interaction.user.username} WATCH`,
                  `\x1b[35m Partners Category`,
                );

                return await interaction.update({
                  embeds: [
                    {
                      title: `Our Partners`,
                      description: fieldsText.partners,
                      image: { url: banners.partnerBanner },
                      color: color.gray,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                  components: [aboutmenu],
                });
              }
            }
          });
          break;
        default:
      }
    }
  });
};
