// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  // #staff-discussion but the name might change so the id is best
  const modMailCh = client.guilds.cache.first().channels.cache.get('703735047382892624');

  if (message.channel === modMailCh) {
    // This was sent in the staff channel, so they are trying to reply to modmail.
    let member = message.mentions.members.first();
    if (!member) {
      if (parseInt(args[0], 10)) {
        try {
          member = await client.users.fetch(args[0]);
        } catch (err) {
          // Don't need to send a message here
        }
      }
    }

    if (!member) {
      client.error(message.channel, 'Invalid Member!', 'Please mention a valid member of this server!');
      return;
    }

    try {
      const dmCh = await member.createDM();
      const attachments = message.attachments.map((a) => a.url);

      await dmCh.send(`__**Mod Mail Response**__\n**${message.author.tag}** (${message.author.id}) : ${args.slice(1).join(' ')}`, { split: true, files: attachments });
      client.success(modMailCh, 'Mod Mail Response Sent!', `I've successfully sent your response to **${member.guild ? member.user.tag : member.tag || member}**!`);
      return;
    } catch (err) {
      client.error(message.channel, 'Unable to DM that Member!', 'The user must have their DMs closed or is otherwise unavailable.');
      return;
    }
  }

  if (args.length === 0) {
    const initMsg = `Hello **${message.author.username}!** You've initiated Mod Mail communication! I'll direct your next message to the staff channel so go ahead, I'm listening!`;
    const dmCh = await message.author.createDM();
    if (message.guild) {
      message.delete().catch((err) => console.error(err));
      dmCh.send(initMsg)
        .then(() => message.channel.send("I've sent you a DM!"))
        .catch((err) => {
          client.error(message.channel, 'Error!', 'Failed to send a DM to you! Do you have DMs off?');
          return console.error(err);
        });
    } else if (message.channel.type === 'dm') {
      await dmCh.send(initMsg);
    }

    const filter = (m) => !m.author.bot;
    await dmCh.awaitMessages(filter, { max: 1, time: 180000, errors: ['time'] })
      .then(async (collected) => {
        const attachments = collected.first().attachments.map((a) => a.url);
        await modMailCh.send(`**${message.author.tag}** (${message.author}) : ${collected.first().content}`, { split: true, files: attachments });
        await client.success(dmCh, 'Sent!', 'Pete has delivered your message safely to the Town Hall!');
      })
      .catch(() => {
        client.error(dmCh, "Time's Up!", "Time has expired! You'll have to run the command again if you want to send a message to the staff!");
      });
  } else {
    const attachments = message.attachments.map((a) => a.url);
    await modMailCh.send(`**${message.author.tag}** (${message.author}) : ${args.join(' ')}`, { split: true, files: attachments });
    // Remove the message from the guild chat as it may contain sensitive information.
    if (message.guild) {
      message.delete().catch((err) => console.error(err));
    }
    await client.success(message.channel, 'Sent!', 'Pete has delivered your message safely to the Town Hall!');
  }
};

module.exports.conf = {
  guildOnly: false,
  aliases: ['mod', 'mail', 'mm'],
  permLevel: 'User',
  cooldown: 60,
};

module.exports.help = {
  name: 'modmail',
  category: 'moderation',
  description: 'Sends the provided message to the staff channel',
  usage: 'modmail <message>',
  details: 'message => Anything you wish to report to the staff team',
};
