const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')
const i18nBackend = require('i18next-node-fs-backend')
const path = require('path')

module.exports = class Hikari extends AkairoClient {
  constructor (prefix) {
    super({ // Akairo Client Options
      ownerID: [
        '312632996119445504', // PillGP aka Barbosicks 2.0
        '176093529053855744', // jpsl00
        '178750706981928961', // Nameless
        '168759625875718145' // nitro.
      ]
    }, { // Discord.js Client Options
      shardCount: 3, // Internal sharding? OwO
      disableEveryone: true, // Bot won't ping @everyone... unless specified to do so ( ͡° ͜ʖ ͡°)
      disabledEvents: [ // No need to trigger these events
        'PRESENCE_UPDATE'
      ],
      retryLimit: 2, // Retry twice on 5xx, then give up
      messageCacheLifetime: 600, // 10 minutes lifetime
      messageSweepInterval: 900, // Sweep messages every 15 minutes
      ws: { // WS Options
        compress: true // Self-explanatory huh?
      },
      http: { // HTTP Options
        api: 'https://canary.discordapp.com/api' // Let's give it a shot
      }
    })

    this.i18n = require('i18next')

    this.commandHandler = new CommandHandler(this, {
      directory: path.join(__dirname, '..', 'commands'),
      classToHandle: require('./Command'), // Handle our new, modified class
      prefix: 'c!',
      allowMention: false, // @Hikari won't work as prefix
      aliasReplacement: /-/g, // Example: bot-info would work but botinfo also would
      commandUtil: true,
      commandUtilLifetime: 300000, // Memory-management
      handleEdits: true, // User *Edits message* Bot *Interprets as new command*
      defaultCooldown: 2000,
      ignoreCooldown: this.ownerID, // Cooldown? What's that?
      ignorePermissions: this.ownerID // Permissions? What's that?
    })

    // this.listenerHandler = new ListenerHandler(this, {})
  }

  initializei18n () {
    if (!this.i18n) throw new Error({ message: `Client doesn't have i18n defined` })

    console.log('Loading i18n')
    this.i18n.use(i18nBackend).init({
      backend: {
        loadPath: `${path.join(__dirname, '..', 'locales')}/{{lng}}/{{ns}}.json`
      },
      preload: ['en-US', 'pt-BR'],
      ns: [ 'common', 'errors', 'permissions', 'regions', 'commands', 'categories', 'listeners', 'inhibitors' ],
      nonExplicitWhitelist: true,
      debug: false,
      load: 'all',
      // fallbackLng: 'en-US',
      returnEmptyString: false
    })
  }

  start (token) {
    console.log('Initializing Client')
    this.initializei18n()
    this.commandHandler.loadAll()

    this.login(token).then(() => {
      console.log('Logged in!')
    })
  }
}
