const { Client } = require('discord.js');
const fs = require('fs');

const Events = require('./events');

class CrewsCrewBot extends Client {
  constructor () {
    super();
    this.config = require('./config.json');
    this.responses = require('./responses.json');

    this.login(this.config.token);

    this.commands = new Map();
    this.loadCommands();

    this
      .on('ready', Events.onReady)
      .on('message', Events.onMessage);
  }

  loadCommands() {
    fs.readdir(`${__dirname}/commands/`, (err, files) => {
      if (err) {
        return console.log(err.stack);
      }
      console.log(`Loading a total of ${files.length} commands.`);

      files.forEach(file => {
        const command = require(`${__dirname}/commands/${file}`);
        if (!command.props) {
          return;
        }
        this.commands.set(command.props.name, command);
      });
    });
  }

  updateResponses (override) {
    console.log(override);
    this.responses = Object.assign(this.responses, override);

    fs.writeFileSync('./responses.json', JSON.stringify(this.responses, '', '  '))
  }
}

new CrewsCrewBot();