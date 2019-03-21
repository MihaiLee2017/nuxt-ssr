import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../dbs/models/users'

/**
 * github 策略
 * */
// import GitHubStrategy from 'passport-github'
// passport.use(new GitHubStrategy({
//   clientID: githubConf.clientId,
//   clientSecret: githubConf.secret,
//   callbackURL: githubConf.callback
// },
//   function (accessToken, refreshToken, profile, done) {
//     // console.log(accessToken, refreshToken, profile)
//     return done(null, { accessToken, refreshToken, profile })
//   }
// ))

passport.use(new LocalStrategy(async function (username, password, done) {
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  return done(null, user)
})
export default passport

// 执行策略
// passport.authenticate('策略', ...)
// 认证用户
// ctx.state.user
// 登录用户（序列化用户）
// ctx.login(user)
// 判断是否认证
// ctx.isAuthenticated()
