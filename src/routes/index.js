var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/documents.:format?', function(req, res) {
  Document.find().exec(function(err, documents) {
    switch (req.params.format) {
      case 'json':
        res.send(documents.map(function(d) {
          return d.__doc;
        }));
        break;
      default:
        res.render('documents/index', {
	  title: 'Documents',
	  count: documents.count,
	  documents: documents
	});
    }
  });
});

router.post('/documents.:format?', function(req, res) {
  var document = new Document(req.body['document']);
  document.save(function() {
    switch (req.params.format) {
      case 'json':
        res.send(document.__doc);
        break;
      default:
        res.redirect('/documents');
    }
  });
});

router.get('/documents/:id.:format?/edit', function(req, res) {
  Document.findById(req.params.id, function(err, d) {
    res.render('documents/edit', {
      d: d
    });
  });
});

router.get('/documents/new', function(req, res) {
  res.render('documents/new', {
    d: new Document()
  });
});

router.get('/documents/:id.:format?', function(req, res) {
});

router.put('/documents/:id.:format?', function(req, res) {
  Document.findById(req.body.document.id, function(err, d) {
    d.title = req.body.document.title;
    d.data = req.body.document.data;
    d.save(function() {
      switch (req.params.format) {
        case 'json':
          res.send(d.__doc);
	  break;
	default:
	  res.redirect('/documents');
      }
    });
  });
});

router.delete('/documents/:id.:format?', function(req, res) {
  Document.findById(req.params.id, function(err, d) {
    d.remove(function() {
      switch (req.params.format) {
        case 'json':
          res.send(d.__doc);
	  break;
	default:
	  res.redirect('/documents');
      }
    });
  });
});

module.exports = router;
