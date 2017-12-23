exports.run = async function SetCommand (Bot, msg) {
  if (!msg.member.roles.has(Bot.config.roleID)) {
    return msg.channel.send('You are not authorized to use this command.');
  }

  msg.channel.send('What\'s the trigger of the response you\'d like to edit?');

  const cancel = () => msg.channel.send('Cancelled.');

  let name = await msg.channel.awaitMessages(message => message.author.id === msg.author.id, { max: 1, time: 30000 });
  if (name) {
    name = name.first().content.replace(/ /g, '');
    if (name === 'cancel') {
      return cancel();
    }
  } else {
    return;
  }

  msg.channel.send(`What's the new content of \`${name}\`?`);
  let content = await msg.channel.awaitMessages(message => message.author.id === msg.author.id, { max: 1, time: 30000 });
  if (content) {
    content = content.first();
    content = content.attachments.first() ? content.attachments.first().url : content.content;
    if (content === 'cancel') {
      return cancel();
    }
  } else {
    return;
  }

  Bot.updateResponses({ [name]: content });
  msg.channel.send(':ok_hand:');
};

exports.props = {
  name: 'set',
  usage: '{command} <responseTrigger> <responseText>',
  description: 'soon:tm:'
};