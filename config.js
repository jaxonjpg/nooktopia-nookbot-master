/* eslint-disable max-len */
const config = {
  token: 'insert-token-here',

  // Settings
  defaultSettings: {
    prefix: '.',
    verifiedRole: 'Island Staff',
    modRole: 'Island Moderators',
    adminRole: 'Island Administrators',
    staffChat: '711237845859434589',
    actionLog: '711237845859434592',
    modLog: '711237845859434594',
    musicText: '711237846026944521',
    music: '711237845859434595',
  },

  // Bot Perms and Stuff
  ownerID: '292467662020411392',

  // Guild Perms and Stuff
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => true,
    },
    {
      level: 1,
      name: 'Island Staff',
      check: (client, message) => {
        if (message.guild) {
          const verifiedRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === client.getSettings(message.guild).verifiedRole.toLowerCase());

          if (verifiedRole && message.member.roles.cache.has(verifiedRole.id)) {
            return true;
          }
        }
        return false;
      },
    },
    {
      level: 2,
      name: 'Island Moderators',
      check: (client, message) => {
        if (message.guild) {
          const modRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === client.getSettings(message.guild).modRole.toLowerCase());

          if (modRole && message.member.roles.cache.has(modRole.id)) {
            return true;
          }
        }
        return false;
      },
    },
    {
      level: 3,
      name: 'Island Administrators',
      check: (client, message) => {
        if (message.guild) {
          const adminRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === client.getSettings(message.guild).adminRole.toLowerCase());

          if ((adminRole && message.member.roles.cache.has(adminRole.id)) || message.member.hasPermission('ADMINISTRATOR')) {
            return true;
          }
        }
        return false;
      },
    },
    {
      level: 4,
      name: 'Owner',
      check: (client, message) => {
        if (message.guild && message.author.id === message.guild.ownerID) {
          return true;
        }
        return false;
      },
    },
    {
      level: 8,
      name: 'Bot Support',
      check: (client, message) => config.support.includes(message.author.id),
    },
    {
      level: 9,
      name: 'Bot Admin',
      check: (client, message) => config.admins.includes(message.author.id),
    },
    {
      level: 10,
      name: 'Bot Owner',
      check: (client, message) => config.ownerID === message.author.id,
    },
  ],
};

module.exports = config;