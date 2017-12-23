exports.run = async function (Bot, msg) {
    msg.channel.send('```\n' + Object.keys(Bot.responses).map(r => `${r.padStart(10)} | ${Bot.responses[r]}`).join('\n') + '```');
};

exports.props = {
  name: 'list',
  usage: '{command}',
  description: 'soon:tm:'
};