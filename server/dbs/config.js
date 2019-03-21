module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/mt',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
      // return 'smtp.sina.com'
    },
    get user() {
      return '923142305@qq.com'
      // return 'mihailee@sian.com'
    },
    get pass() {
      return 'qmsyyjimdtoabbbe'
      // return 'li86444794'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 1000
      }
    }
  }
}
