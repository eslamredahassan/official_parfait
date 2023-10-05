const { Client } = require("discord.js");
Client.setMaxListeners(0);
const { codeBlock } = require("@discordjs/builders")
const config = require("./src/config");
const ready = require("./src/events/ready");
const antiCrash = require('./src/events/antiCrash');
const slashCommands = require('./src/events/slashCommands');
const alive = require('./src/events/alive');
const logo = require("./src/assest/logo");
const moment = require("moment");


const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "MESSAGE_CONTENT"],
});

client.on("ready", async () => {

  alive(client, config);
  antiCrash(client, config);
  ready(client, config);
  slashCommands(client, config);

  // ------ Slash Command ------- //
    const setup_open = require(`./src/interface/setup_open`)(client, config);
    const setup_close = require(`./src/interface/setup_close`)(client, config);
    const maintenance = require(`./src/interface/maintenance`)(client, config);
  // -------------------------------------//
  
  // ------ Application Interactions ------- //
    const application = require(`./src/commands/application`)(client, config);
    const apply = require(`./src/commands/apply`)(client, config);
    const accept = require(`./src/commands/accept`)(client, config);
    const silent_accept = require(`./src/commands/silent_accept`)(client, config);
    const promote = require(`./src/commands/promote`)(client, config);
    const reject = require(`./src/commands/reject`)(client, config);
    const silent_reject = require(`./src/commands/silent_reject`)(client, config);
    const aplogize = require(`./src/commands/apologize`)(client, config);
    const freeze = require(`./src/commands/freeze`)(client, config);
    const requirements = require(`./src/commands/requirements`)(client, config);
    const answer_yes = require(`./src/commands/answer_yes`)(client, config);
    const answer_no = require(`./src/commands/answer_no`)(client, config);
    const reply = require(`./src/commands/reply`)(client, config);
  // -------------------------------------//

  // ------------ Select Menu ------------ //
    const about_menu = require(`./src/select menu/about_menu`)(client, config);
    const faq_menu = require(`./src/select menu/faq_menu`)(client, config);
  // -------------------------------------//
  
  // ------------ Interactions ------------ //
    const questions = require(`./src/interaction/questions`)(client, config);
  // -------------------------------------//

  
  console.log(`\x1b[31m 〢`,
    `\x1b[30m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m ${client.user.tag}`,
    `\x1b[32m ONLINE`
  );

  console.log(`\x1b[31m 〢`,
    `\x1b[30m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m SUN™&Co Smash Legends`,
    `\x1b[32m CHECKED`
  );


});

client.login(config.token);
