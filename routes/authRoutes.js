const passport = require('passport');

module.exports = app => {
  // request type이 'get'이고 '/auth/google'로 들어오면 passport가 handle이 처리하도록 함. 
  app.get(
    '/auth/google',
    // GoogleStrategy 내에 internal identifier로 'google' string이 있음. 
    // 그래서 여기서 'google'을 넣으면 Google Strategy라는 것이 인지됨
    passport.authenticate('google', {
      // scope에서 contact list, image등을 요구 할 수도 있음. 여기서는 예로써 'profile', 'email'을 포함시킴 것임.
      scope: ['profile', 'email']
    })
  );

  // google authenticate 가 끝나면 /airdata 로 돌아감.
  app.get(
    '/auth/google/callback',
    passport.authenticate( 'google' ),
    ( req, res ) => {
      res.redirect('/airdata')
    }
  );
  // logout
  app.get('/api/logout', (req, res)=> {
    req.logout()
    res.redirect('/');
  })

  // serializeUser가 보낸 req.user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  });
  // serializeUser가 보낸 req.session.passport
  app.get('/api/session/passport', (req, res)=> {
    res.send(req.session.passport)
  })
  // cookie-session이 de-encrypt하여 넘겨 준 req.session
  app.get('/api/session', (req, res)=>{
    res.send(req.session)
  })

};
