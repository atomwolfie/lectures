var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login - Blog' });
});

router.post('/login', function(req, res, next) {
  var sha1sum = crypto.createHash('sha1');

  req.db.driver.execQuery(
    'SELECT * FROM users WHERE email=?;',
    [req.body.email],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      sha1sum.update(req.body.password);
      var hashed_input = sha1sum.digest('hex');
      // 0-9a-f

      if(hashed_input === data.password) //DONT Do this is other projects!!!
      {
        res.cookie('username', data.name);
        res.redirect('/entries/index');
      }
      else
      {
        res.redirect('/login');
      }
    }
  );

});

module.exports = router;
