const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const config = require(`${__dirname}/config.json`);

const SnoowrapClient = new Snoowrap(config);
const SnoostormClient = new Snoostorm(SnoowrapClient);

SnoostormClient.CommentStream({
  subreddit: 'CrewsCrew',
  results: 5,
  pollTime: 2000
}).on('comment', async (comment) => {
  if (comment.body.toLowerCase().startsWith('!crewscoin')) {
    comment.reply('https://i.imgur.com/mgeSQtZ.jpg');
  }
});