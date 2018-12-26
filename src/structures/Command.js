const { Command, AkairoError } = require('discord-akairo')

module.exports = class i18nCommand extends Command {
  /**
   * Hooks the exec call from the Handler and calls this.run with i18n
   * @abstract
   * @param {Message} message - Message that triggered the command.
   * @param {Object} args - Evaluated arguments.
   * @returns {any}
   */
  exec (message, args) {
    const t = this.client.i18n.getFixedT('pt-BR')
    return this.run({ t, m: message, args })
  }

  /**
   * Executes the command.
   * @abstract
   * @param {Object} data
   * @param {i18n} data.t - i18n
   * @param {Message} data.m - Message that triggered the command.
   * @param {Object} data.args - Evaluated arguments.
   * @returns {any}
   */
  run () {
    throw new AkairoError('NOT_IMPLEMENTED', this.constructor.name, 'run')
  }
}
