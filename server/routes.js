//load in functions
var study = require('./study_server');
var cardsort = require('./cardsort_server');
var treetest = require('./treetest_server');
var productreaction = require('./productreaction_server');
var user = require('./user_server');

module.exports = function(app, passport, flash) {

	app.get('/', function (req, res) {
		res.render('index.ejs', { loginMessage: req.flash('loginMessage') });
	});

	app.post('/createcardsort_ajax', isLoggedIn, cardsort.create_ajax);
	app.get('/editcardsort/:id', isLoggedIn, cardsort.edit);
	app.get('/cardsort/:id', cardsort.view);
	app.get('/cardsortresults/:id', isLoggedIn, cardsort.results);
	app.post('/updatecardsort', isLoggedIn, cardsort.update);

	app.post('/createtreetest_ajax', isLoggedIn, treetest.create_ajax);
	app.get('/edittreetest/:id', isLoggedIn, treetest.edit);
	app.get('/treetest/:id', treetest.view);
	app.get('/treetestresults/:id', isLoggedIn, treetest.results);
	app.post('/updatetreetest', isLoggedIn, treetest.update);
	
	app.post('/createproductreaction_ajax', isLoggedIn, productreaction.create_ajax);
	app.get('/editproductreaction/:id', isLoggedIn, productreaction.edit);
	app.get('/productreaction/:id', productreaction.view);
	app.get('/productreactionresults/:id', isLoggedIn, productreaction.results);
	app.post('/updateproductreaction', isLoggedIn, productreaction.update);
	

	app.post('/submitResult', isLoggedIn, study.submitResult);
	app.get('/deletestudy/:id', isLoggedIn, study.delete);

	app.get('/admin', isLoggedIn, function (req, res) {
		res.render('admin.ejs', {email: req.user.email});
	});

	app.get('/studies', isLoggedIn, study.view);

	app.get('/usermanagement', isLoggedIn, user.UserManagement);
	  
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/admin',
		failureRedirect: '/',
		failureFlash : true
	}));
	  
	app.get('/logout', function(req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});
	
	app.post('/createuser', isLoggedIn, passport.authenticate('local-signup', {
		successRedirect : '/usermanagement',
		failureRedirect : '/usermanagement',
		failureFlash : true
	}));

	app.get('/deleteuser/:id', isLoggedIn, user.deleteUser);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
