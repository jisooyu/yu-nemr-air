const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res)=> {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res)=>{
    res.send(req.user)
  })
  // serializeUser가 보낸 req.session.passport
  app.get('/api/session/passport', (req, res)=> {
    res.send(req.session.passport)
  })
  // cookie-session이 de-encrypt하여 넘겨 준 req.session
  app.get('/api/session', (req, res)=>{
    res.send(req.session)
  })

};
