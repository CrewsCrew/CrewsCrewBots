const VALID_EMBED_FORMATS = ['png', 'jpg', 'gif'];

async function processResponses (msg) {
  for (const response in this.responses) {
    if (msg.isMentioned(this.user) && new RegExp(response).test(msg.content.replace(/ /g, ''))) {
      const media = this.responses[response];
      const content = VALID_EMBED_FORMATS.some(format => media.endsWith(format))
        ? { embed: { image: { url: media } } }
        : media;

      msg.channel.send(content);
      return true;
    }
  }
}

async function onMessage (msg) {
  if (msg.author.bot) {
    return;
  }

  const rx = new RegExp(`<@!*${this.user.id}>`);
  const match = msg.content.slice(0, 22).match(rx);
  const prefix = match ? `${match[0]} ` : this.config.prefix;
  let isCommand = false;
  if (msg.content.toLowerCase().startsWith(prefix)) {
    isCommand = true;
  }

  const args = msg.content.slice(prefix.length).split(' ').filter(arg => arg.length > 0);
  let command = args.shift();

  if (this.commands.has(command)) {
    command = this.commands.get(command);
  }

  if (isCommand && command && command instanceof Object) {
    try {
      await command.run(this, msg, args);
    } catch (err) {
      msg.channel.send(`fuck\n${err.message}`);
      console.log(err.stack);
    }
  } else {
    processResponses.bind(this)(msg);
  }
}

module.exports = onMessage;