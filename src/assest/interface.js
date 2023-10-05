const emojis = require("../assest/emojis");
const moment = require("moment");
require("moment-duration-format");

const members = require("../assest/members");

module.exports = {

  RequirementsMessage: `### ${emojis.rules} **Rules and terms**\n${emojis.threadMarkmid} No toxicity allowed\n${emojis.threadMarkmid} No offensive discord nickname\n${emojis.threadMarkmid} No offensive in-game nickname\n ${emojis.threadMarkmid} Only **Europe players** allowed to apply\n${emojis.threadMarkmid} If you spam the application will get you permanently banned\n${emojis.threadMarkmid} Absence of more than \`\`7 days\`\` without excuse is not allowed\n${emojis.threadMark} All applications not matching our requirements will be rejected`,

  
  MainUImessage: `### ${emojis.info} **Do you want to join Sun Legends clan ?**\n${emojis.threadMarkmid} Click on **Sun Application** button\n${emojis.threadMarkmid} Then read all requirements\n${emojis.threadMark} Then continue to apply\n### ${emojis.QA} Check our new FAQ feature\n### ${emojis.warn} **To join you must be**`,

  
  maintenanceMessage: `### ${emojis.maintenance} **Maintenance**\n${emojis.threadMark} **Parfait under maintenance now**\n### ${emojis.info} **What does this mean?**\n${emojis.threadMarkmid} Parfait will be unusable during this period\n${emojis.threadMarkmid} All features are disabled during this period\n${emojis.threadMarkmid} Current applications will be paused\n${emojis.threadMark} Maintenance takes \`\`1 hour\`\` or more sometimes`,

  
  aboutMessage: `### ${emojis.info} Parfait is a discord application manager bot\n${emojis.threadMarkmid} Coded with more than \`\`6500\`\` lines of code\n${emojis.threadMarkmid} More than \`\`175\`\` emoji and icon\n${emojis.threadMarkmid} More than \`\`25\`\` banners and images\n${emojis.threadMarkmid} To facilitate the recruitment process\n${emojis.threadMarkmid} It's named by ${members.candy}\n${emojis.threadMark} And it's being developed regularly`

  
}
console.log(
  `\x1b[31m 〢`,
  `\x1b[30m ${moment(Date.now()).format("LT")}`,
  `\x1b[31m Interface File`,
  `\x1b[32m LOADED`
);