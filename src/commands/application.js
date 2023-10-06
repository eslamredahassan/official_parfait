const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Modal,
  TextInputComponent,
} = require("discord.js");

const os = require("os");
const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

const responses = require("../assest/responses.js");
const interface = require("../assest/interface.js");
const fieldsText = require("../assest/fieldsText.js");
const banners = require("../assest/banners.js");
const errors = require("../assest/errors.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      switch (interaction.commandName) {
        case "setup":
          {
            console.log(
              `\x1b[0m`,
              `\x1b[31m 〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m ${interaction.user.username} USED`,
              `\x1b[35m Setup Command`,
            );
            const cooldownResponse = [
              `${responses.lazy}`,
              `${responses.know}`,
              `${responses.busy}`,
              `${responses.wait}`,
            ];
            const cooldownResponseMessages =
              cooldownResponse[
                Math.floor(Math.random() * cooldownResponse.length)
              ];

            if (cooldown.has(interaction.user.id)) {
              interaction.reply({
                embeds: [
                  {
                    title: `${emojis.cooldown} Cooldown`,
                    description:
                      `${emojis.whiteDot} Hi  <@${interaction.user.id}>` +
                      ` ${cooldownResponseMessages}`,
                    color: color.gray,
                  },
                ],
                //this is the important part
                ephemeral: true,
              });
            } else {
              const btnui = new MessageActionRow().addComponents([
                new MessageButton()
                  .setStyle(2)
                  .setDisabled(false)
                  .setCustomId("#setup_open")
                  .setLabel("⠀Opened⠀")
                  .setEmoji(emojis.unlock),
                new MessageButton()
                  .setStyle(2)
                  .setDisabled(false)
                  .setCustomId("#setup_close")
                  .setLabel("⠀Closed⠀")
                  .setEmoji(emojis.lock),
                new MessageButton()
                  .setStyle(2)
                  .setDisabled(false)
                  .setCustomId("#setup_maintenance")
                  .setLabel("⠀Developers Mode⠀")
                  .setEmoji(emojis.dev),
              ]);

              const perms = [`${config.devRole}`, `${config.STAFF}`];
              let staff = guild.members.cache.get(interaction.user.id);
              if (staff.roles.cache.hasAny(...perms)) {
                await interaction.reply({
                  embeds: [
                    {
                      title: `${emojis.settings} Setup Options`,
                      description: `### ${emojis.warn} Choose the mode you want to use carefully`,
                      ///thumbnail: { url: "https://i.imgur.com/COzCPdd.png" },
                      image: { url: `${banners.setupBanner}` },
                      color: color.gray,
                      fields: [
                        {
                          name: `${emojis.unlock} Opened Mode`,
                          value: `${fieldsText.openedMessage}`,
                          inline: false,
                        },
                        {
                          name: `${emojis.lock} Closed Mode`,
                          value: `${fieldsText.closedMessage}`,
                          inline: false,
                        },
                        {
                          name: `${emojis.dev} Developers Mode`,
                          value: `${fieldsText.devMessage}`,
                          inline: false,
                        },
                        {
                          name: `${emojis.info} Notes`,
                          value: `${fieldsText.noteMessage}`,
                          inline: false,
                        },
                      ],
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                  components: [btnui],
                });
              } else {
                await interaction
                  .reply({
                    embeds: [
                      {
                        title: `${emojis.alert} Permission denied`,
                        description: errors.permsError,
                        color: color.gray,
                      },
                    ],
                    //this is the important part
                    ephemeral: true,
                  })
                  .catch(() => console.log("Error Line 118"));
              }
              cooldown.add(interaction.user.id);
              setTimeout(() => {
                // Removes the user from the set after a minute
                cooldown.delete(interaction.user.id);
              }, 60000);
            }
          }
          break;
        case "status":
          {
            function uptimeString(seconds) {
              let days = Math.floor(seconds / (3600 * 24));
              seconds -= days * 3600 * 24;
              let hours = Math.floor(seconds / 3600);
              seconds -= hours * 3600;
              let minutes = Math.floor(seconds / 60);
              seconds -= minutes * 60;
              return `${days} Days, ${hours} Hours, ${minutes} Minutes, and ${seconds} seconds`;
            }

            const usedMemory = os.totalmem() - os.freemem(),
              totalMemory = os.totalmem();
            const getpercentage =
              ((usedMemory / totalMemory) * 100).toFixed(2) + "%";
            // in Giga `(usedMemory / Math.pow(1024, 3)).toFixed(2)`

            const discordJSVersion = packageJSON.dependencies["discord.js"];

            await interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(color.gray)
                  .setTitle(`${emojis.alert} ${client.user.tag} status`)
                  .setDescription("")
                  //.setThumbnail(Logo)
                  .setImage(banners.aboutBanner)
                  .addFields(
                    {
                      name: `${emojis.nodejs} Discord.js version`,
                      value: `${emojis.threadMark} ${discordJSVersion}`,
                      inline: true,
                    },
                    {
                      name: `${emojis.cpu} Used memory`,
                      value: `${emojis.threadMark} ${getpercentage}`,
                      inline: true,
                    },
                    {
                      name: `${emojis.time} Uptime`,
                      value: `${emojis.threadMark} ${uptimeString(
                        Math.floor(process.uptime()),
                      )}`,
                      inline: false,
                    },
                  )
                  .setFooter({
                    ///text: `This is for Staff members only, no one else can see it`,
                    text: `Parfait - Advanced Discord Application Bot`,
                    iconURL: banners.parfaitIcon,
                  }),
              ],
              ephemeral: true,
              components: [],
            });
          }
          break;
        case "ping":
          {
            const sent = await interaction.reply({
              content: "Thinking...",
              fetchReply: true,
              ephemeral: true,
            });
            await wait(3000);
            interaction.editReply({
              content: `🏓 Latency is: ${
                sent.createdTimestamp - interaction.createdTimestamp
              } ms`,
              ephemeral: true,
            });
            console.log(
              `\x1b[0m`,
              `\x1b[31m 〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m ${interaction.user.username} USED`,
              `\x1b[35m Ping Command`,
              `\x1b[36m ${
                sent.createdTimestamp - interaction.createdTimestamp
              } ms`,
            );
          }
          break;
        case "report_bug":
          {
            console.log(
              `\x1b[0m`,
              `\x1b[31m 〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m ${interaction.user.username} USED`,
              `\x1b[35m Report Bug Command`,
            );
            //// Modal application code ///
            let report_modal = new Modal()
              .setTitle(`🐞 Report bug`)
              .setCustomId(`report_modal`);

            const where = new TextInputComponent()
              .setCustomId("bug_where")
              .setLabel(`Which bug you want to report?`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(65)
              .setRequired(true)
              .setPlaceholder(`Name the bug or say where you found it`)
              .setStyle(1);
            const details = new TextInputComponent()
              .setCustomId("bug_details")
              .setLabel(`Type details about this bug`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(365)
              .setRequired(true)
              .setPlaceholder(`Type the details here `)
              .setStyle(2);

            let row_where = new MessageActionRow().addComponents(where);
            let row_details = new MessageActionRow().addComponents(details);
            report_modal.addComponents(row_where, row_details);
            await interaction.showModal(report_modal);
          }
          break;
        case "message_the_developer":
          {
            console.log(
              `\x1b[0m`,
              `\x1b[31m 〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m ${interaction.user.username} USED`,
              `\x1b[35m Message Dev Command`,
            );
            //// Modal application code ///
            let sendToDev_modal = new Modal()
              .setTitle(`📧 Send a message to the developer`)
              .setCustomId(`sendToDev_modal`);

            const message = new TextInputComponent()
              .setCustomId("user_message")
              .setLabel(`Message`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(365)
              .setRequired(true)
              .setPlaceholder(`Type your message here`)
              .setStyle(2);

            let row_usermessage = new MessageActionRow().addComponents(message);
            sendToDev_modal.addComponents(row_usermessage);
            await interaction.showModal(sendToDev_modal);
          }
          break;
        case "about":
          {
            console.log(
              `\x1b[0m`,
              `\x1b[31m 〢`,
              `\x1b[33m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m ${interaction.user.username} USED`,
              `\x1b[35m About Command`,
            );

            function uptimeString(seconds) {
              let days = Math.floor(seconds / (3600 * 24));
              seconds -= days * 3600 * 24;
              let hours = Math.floor(seconds / 3600);
              seconds -= hours * 3600;
              let minutes = Math.floor(seconds / 60);
              seconds -= minutes * 60;
              return `\`\`${days}\`\` Days, \`\`${hours}\`\` Hours, \`\`${minutes}\`\` Minutes, and \`\`${seconds}\`\` seconds`;
            }

            const aboutParfait = new MessageActionRow().addComponents([
              new MessageButton()
                .setStyle("LINK")
                .setLabel(`⠀Contact with IEgyGamerI`)
                .setURL(`https://discordapp.com/users/123788535324082178`)
                .setEmoji(emojis.discord),
              new MessageButton()
                .setStyle("LINK")
                .setLabel(`⠀Parfait Status⠀`)
                .setURL(`https://parfait.pikapod.net/status/parfait`)
                .setEmoji(emojis.dev),
            ]);

            await interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(color.gray)
                  .setTitle(`${emojis.alert} About ${client.user.tag}`)
                  .setDescription(interface.aboutMessage)
                  .setThumbnail(Logo)
                  .setImage(banners.aboutBanner)
                  .addFields(
                    {
                      name: `${emojis.developer} Programmed by`,
                      value: fieldsText.programed,
                      inline: true,
                    },
                    {
                      name: `${emojis.build} Build`,
                      value: fieldsText.build,
                      inline: true,
                    },
                    {
                      name: `${emojis.version} Version`,
                      value: fieldsText.version,
                      inline: true,
                    },
                    {
                      name: `${emojis.time} Uptime`,
                      value: `${emojis.threadMark} ${uptimeString(
                        Math.floor(process.uptime()),
                      )}`,
                      inline: true,
                    },
                    {
                      name: `${emojis.order} Order one for your server`,
                      value: fieldsText.contact,
                      inline: false,
                    },
                  )
                  .setFooter({
                    ///text: `This is for Staff members only, no one else can see it`,
                    text: `Parfait - Advanced Discord Application Bot`,
                    iconURL: banners.parfaitIcon,
                  }),
              ],
              ephemeral: true,
              components: [aboutParfait],
            });
          }
          client.on("interactionCreate", async (interaction) => {
            if (interaction.isSelectMenu()) {
              let choice = interaction.values[0];
              if (choice == "A") {
                const b1 = new MessageActionRow().addComponents([
                  new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`Discord`)
                    .setURL(`https://discord.gg/ymGenWPwTv`)
                    .setEmoji(emojis.discordO),
                ]);

                await interaction.reply({
                  content: "Selected A",
                  ephemeral: true,
                  components: [b1],
                });
              } else if (choice == "B") {
                const b2 = new MessageActionRow().addComponents([
                  new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`Discord`)
                    .setURL(`https://discord.gg/ymGenWPwTv`)
                    .setEmoji(emojis.discordO),
                ]);

                await interaction.reply({
                  content: "Selected B",
                  ephemeral: true,
                  components: [b2],
                });
              }
            }
          });
          break;
        default:
          interaction.reply({
            content: `command not found ${interaction.commandName}`,
            ephemeral: true,
          });
          break;
      }
    }
    if (interaction.customId === "report_modal") {
      let where = interaction.fields.getTextInputValue("bug_where");
      let details = interaction.fields.getTextInputValue("bug_details");

      let reportBugChannel = client.channels.cache.get(config.reportBugChannel);
      if (!reportBugChannel) return;

      const reply = new MessageActionRow().addComponents([
        new MessageButton()
          .setStyle(2)
          .setCustomId("#profile")
          .setLabel(`Reply ${interaction.user.username}`)
          .setEmoji(emojis.dm),
      ]);

      /// Embed of data in review room ///
      await reportBugChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(color.gray)
            .setTitle(`${emojis.log} **Bug report**`)
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(``)
            //.setThumbnail( interaction.user.displayAvatarURL() )
            .setImage(banners.channelBugBanner)
            .addFields([
              {
                name: `${emojis.id} Reported by`,
                value: `${emojis.threadMark} ${interaction.user}`,
                inline: true,
              },
              {
                name: `${emojis.time} Reported Since`,
                value: `${emojis.threadMark} <t:${Math.floor(
                  Date.now() / 1000,
                )}:R>`,
                inline: true,
              },
              {
                name: `${emojis.bug} Founded in`,
                value: `${emojis.threadMark} ${where}`,
                inline: false,
              },
              {
                name: `${emojis.reason} Bug details`,
                value: `${emojis.threadMark} ${details}`,
                inline: false,
              },
            ])
            .setTimestamp()
            .setFooter({
              text: interaction.user.id,
              iconURL: banners.parfaitIcon,
            }),
        ],
        components: [reply],
      });

      return await interaction.reply({
        embeds: [
          {
            title: `${emojis.check} Your report has been sent to the developer`,
            description: `- Thank you ${interaction.user} for report this bug\n- We are also sorry to make you encounter this bug and we will work to fix it as soon as possible`,
            color: color.gray,
            ///thumbnail: { url: 'https://i.imgur.com/FiSTCop.png', },
            image: { url: banners.reportBugBanner },
          },
        ],
        //this is the important part
        ephemeral: true,
        components: [],
      });
    }
    if (interaction.customId === "sendToDev_modal") {
      let message = interaction.fields.getTextInputValue("user_message");

      let dmDevChannel = client.channels.cache.get(config.dmDevChannel);
      if (!dmDevChannel) return;

      const reply = new MessageActionRow().addComponents([
        new MessageButton()
          .setStyle(2)
          .setCustomId("#profile")
          .setLabel(`Reply ${interaction.user.username}`)
          .setEmoji(emojis.dm),
      ]);

      /// Embed of data in review room ///
      await dmDevChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(color.gray)
            .setTitle(`${emojis.newMail} **New Message**`)
            .setDescription(``)
            //.setThumbnail(banners.newMessageBanner)
            .setImage(banners.newMessageBanner)
            .addFields(
              {
                name: `${emojis.id} Sender`,
                value: `${emojis.threadMark} ${interaction.user}`,
                inline: true,
              },
              {
                name: `${emojis.time} Sent Since`,
                value: `${emojis.threadMark} <t:${Math.floor(
                  Date.now() / 1000,
                )}:R>`,
                inline: true,
              },
              {
                name: `${emojis.email} Message Content`,
                value: `${emojis.threadMark} ${message}`,
                inline: false,
              },
            )
            .setTimestamp()
            .setFooter({
              text: interaction.user.id,
              iconURL: banners.parfaitIcon,
            }),
        ],
        components: [reply],
      });

      await interaction.reply({
        embeds: [
          {
            title: `${emojis.check} Your message sent has been sent to my developer`,
            description: `- Thank you ${interaction.user} Your message will be answered soon if necessary`,
            color: color.gray,
            ///thumbnail: { url: 'https://i.imgur.com/FiSTCop.png', },
            image: { url: banners.channelMessageBanner },
          },
        ],
        //this is the important part
        ephemeral: true,
        components: [],
      });
    }
  });
};
