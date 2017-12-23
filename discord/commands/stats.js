const totalMem = require('os').totalmem();
const { version } = require('discord.js');

const parseTime = (time) => {
  const methods = [86400, 3600, 60, 1];
  const timeStr = [Math.floor(time / methods[0]).toString().padStart(2, '0')];
  for (let i = 0; i < 3; i++) {
    timeStr.push(Math.floor(time % methods[i] / methods[i + 1]).toString().padStart(2, '0'));
  }
  return timeStr.join(':');
};

exports.run = async function (Bot, msg) {
  const cUsage = process.memoryUsage();

  const inline = true;

  msg.channel.send({ embed: {
    color: Bot.config.embedColor,
    title: `CrewsCrewBot ${Bot.package.version}`,
    fields: [
      { name: 'Uptime', value: parseTime(process.uptime()), inline },
      { name: 'Ping', value: `${Bot.ping.toFixed()}ms`, inline },
      { name: 'RAM Usage', value: `${(cUsage.rss / 1048576).toFixed()}MB/${(totalMem > 1073741824 ? `${(totalMem / 1073741824).toFixed(1)} GB` : `${(totalMem / 1048576).toFixed()} MB`)}\n(${(cUsage.rss / totalMem * 100).toFixed(2)}%)`, inline },
      { name: 'System Info', value: `${process.platform} (${process.arch})\n${(totalMem > 1073741824 ? `${(totalMem / 1073741824).toFixed(1)} GB` : `${(totalMem / 1048576).toFixed(2)} MB`)}`, inline },
      { name: 'Libraries', value: `[Discord.js](https://discord.js.org) v${version}\n[Node.js](https://nodejs.org) ${process.version}`, inline },
      { name: '\u200b', value: '\u200b', inline }
    ]
  }});
};

exports.props = {
  name: 'stats',
  usage: '{command}',
  aliases: ['info'],
  description: 'soon:tm:'
};