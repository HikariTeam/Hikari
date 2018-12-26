const { Structures: { Command } } = require('../')

module.exports = class TestCommand extends Command {
  constructor () {
    super('test', {
      aliases: ['test']
    })
  }

  run ({ t, m }) {
    m.util.send(t('commands:test.default'))
  }
}
