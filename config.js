/* eslint-disable max-len */
const config = {
  token: 'NzEyODY4NzU5NzY4OTI0MTYw.XsX2LQ.SRs25lsqSyD2kB7kd_6L68AS8zU',

  // Settings
  defaultSettings: {
    prefix: '/',
    verifiedRole: 'Resident Representatives',
    modRole: 'Redd (MOD)',
    adminRole: 'Nooklings (ADMIN)',
    staffChat: '711067094157885461',
    actionLog: '707084468720238633',
    modLog: '710307401089417217',
    musicText: '708831983232483412',
    music: '704054308890738799',
  },

  // Bot Perms and Stuff
  ownerID: '291252375727898625',

  // Guild Perms and Stuff
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => true,
    },
    {
      level: 1,
      name: 'Island Resident',
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
      name: 'Redd (MOD)',
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
      name: 'Nooklings (ADMIN)',
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
      name: 'Tom Nook (OWNER)',
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
