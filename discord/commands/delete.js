exports.run = async function DeleteCommand (Bot, msg, args) {
  if (!msg.member.roles.has(Bot.config.roleID)) {
    return msg.channel.send('You are not authorized to use this command.');
  }

  if (!args[0]) {
    return msg.channel.send('Missing required arguments.');
  }

  args = args.join(' ').replace(/ /g, '');

  if (!Bot.responses[args]) {
    msg.channel.send(`No response with the name \`${args}\` found.`);
  } else {
    delete Bot.responses[args];
    Bot.updateResponses();
    msg.channel.send(':ok_hand:');
  }
};

exports.props = {
  name: 'delete',
  usage: '{command} <responseTrigger>',
  description: 'soon:tm:'
};