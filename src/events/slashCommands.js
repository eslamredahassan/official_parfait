const { codeBlock } = require("@discordjs/builders");
const config = require("../config");
const moment = require("moment");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  if (guild) {
    await guild.commands.set([
      {
        name: "setup",
        description: `Launch setup menu to choose between open, close and developer modes`,
        type: "CHAT_INPUT",
        /// default_member_permissions: "8"
      },
      {
        name: "report_bug",
        description: `Report a bug to the developer`,
        type: "CHAT_INPUT",
      },
      {
        name: "message_the_developer",
        description: `Send a message to parfait developer`,
        type: "CHAT_INPUT",
      },
      {
        name: "about",
        description: `Learn more about Parfait bot`,
        type: "CHAT_INPUT",
      },
      {
        name: "status",
        description: `Check Parfait Uptime`,
        type: "CHAT_INPUT",
      },
      {
        name: "ping",
        description: `Check Parfait latency`,
        type: "CHAT_INPUT",
      },
    ]);
  }
  console.log(
    `\x1b[0m`,
    `\x1b[31m 〢`,
    `\x1b[33m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m Slash commands`,
    `\x1b[32m LOADED`,
  );
};
