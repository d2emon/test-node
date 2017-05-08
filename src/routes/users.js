var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.redirect('/users/user.html');
});

router.get('/new', function(req, res) {
  res.render('users/new', {
    user: new User()
  });
});

router.get('/user.:format?', function(req, res) {
  var user = new User(req.body.user);

  function userSaved() {
    switch (req.params.format) {
      case 'json':
        res.send(user.__doc);
        break;
      default:
        req.session.user_id = user.id;
	res.redirect('/documents');
    }
  }

  function userSaveFailed() {
    res.render('users/new', {
      user: user
    });
  }

  user.save(userSaved, userSaveFailed);
});

module.exports = router;
