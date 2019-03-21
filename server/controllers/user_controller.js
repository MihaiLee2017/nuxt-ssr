import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Email from '../dbs/config'
import Passport from '../utils/passport'
import axios from '../utils/axios'
// import axios from 'axios'
import ApiError from '../utils/error/ApiError'
import ApiErrorNames from '../utils/error/ApiErrorNames'
let Store = new Redis().client

export async function signUp(ctx, next) {
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        throw new ApiError(ApiErrorNames.CODE_EXPIRE.name)
      }
    } else {
      throw new ApiError(ApiErrorNames.CODE_ERROR.name)
    }
  } else {
    throw new ApiError(ApiErrorNames.CODE_NO_EXIT.name)
  }
  let user = await User.find({ username })
  if (user.length) {
    throw new ApiError(ApiErrorNames.USER_EXIST.name)
  }
  let nuser = await User.create({ username, password, email })
  if (nuser) {
    axios.post('/api/user/signin', { username, password }).then(res => {
      ctx.body = res.data
    }).catch(err => {
      throw err
    })
  } else {
    throw new ApiError(ApiErrorNames.REGISTER_ERROR.name)
  }
}

export async function signIn(ctx, next) {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      throw err
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          message: '登录成功',
          data: {
            user
          }
        }
        return ctx.login(user)
      } else {
        throw {
          message: info || '',
          code: -1
        }
      }
    }
  })(ctx, next)
}

export async function verify(ctx, next) {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    // ctx.body = {
    //   code: -1,
    //   msg: '验证请求过于频繁，1分钟内1次'
    // }
    throw { message: '验证请求过于频繁，1分钟内1次', code: -1 }
    // return false
  }
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"Mihai" <${Email.smtp.user}>`,
    to: ko.email,
    subject: 'NUXT SSR SENT MAIL',
    html: `nodemailer plugs send key code: ${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
}

export async function exit(ctx, next) {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      // code: 0
    }
  } else {
    ctx.body = {
      // code: -1
    }
  }
}
export async function getUser(ctx, next) {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      data: {
        user: {
          name: username,
          email
        }
      }
    }
  } else {
    ctx.body = {
      data: {
        user: '',
        email: ''
      }
    }
  }
}
