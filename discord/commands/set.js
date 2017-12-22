exports.run = async function set (Bot, msg, args) {
  if (!args[1]) {
    return msg.channel.send('Missing required arguments.');
  }
  
  Bot.updateResponses({ [args[0]]: args[1] });
  msg.channel.send('gud');
}

exports.props = {
  name: 'set',
  usage: '{command} <responseTrigger> <responseText>',
  description: 'soon:tm:'
};