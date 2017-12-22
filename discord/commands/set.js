exports.run = async function set (Bot, msg) {
  msg.channel.send('What\'s the trigger of the response you\'d like to edit?');

  const cancel = () => msg.channel.send('Cancelled.');

  let name = await msg.channel.awaitMessages(message => message.author.id === msg.author.id, { max: 1, time: 30000 });
  if (name) {
    name = name.first().content;
    if (name === 'cancel') {
      return cancel();
    }
  } else {
    return;
  }

  msg.channel.send(`What's the new content of \`${name}\`?`);
  let content = await msg.channel.awaitMessages(message => message.author.id === msg.author.id, { max: 1, time: 30000 });
  if (content) {
    content = content.first().attachments.first() ? content.first().attachments.first().url : content.first().content;
    if (content === 'cancel') {
      return cancel();
    }
  } else {
    return;
  }


  Bot.updateResponses({ [name.replace(/ /g, '')]: content });
  msg.channel.send(':ok_hand:');
};

exports.props = {
  name: 'set',
  usage: '{command} <responseTrigger> <responseText>',
  description: 'soon:tm:'
};