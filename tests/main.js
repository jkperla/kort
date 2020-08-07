//Casperjs
//http://casperjs.org

//API docs:
//http://docs.casperjs.org/en/latest/modules/index.html



//http://docs.casperjs.org/en/latest/modules/tester.html#begin
casper.test.begin('Main Test Suite', function suite(test) {

	//spoof the user-agent, some pages during URL checking give a 403 if you don't specify this
	casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

	casper.start('http://127.0.0.1:3000', function() {

		//http://docs.casperjs.org/en/latest/modules/tester.html#assertexists
        test.assertExists('[name="email"]', 'email input exists');
		test.assertExists('[name="password"]', 'password input exists');

		//https://stackoverflow.com/questions/18676549/how-to-login-by-filling-the-form-in-casperjs
		//wait for the main login page to load
		casper.waitForSelector("form input[name='email']", function() {
			this.fillSelectors('form#login', {
				'input[name = email ]' : 'admin',
				'input[name = password ]' : 'admin'
			}, true);
		});

		//wait for the overview page to load
		casper.waitForSelector("#gostudies", function() {
			test.assertTitle('Kort: Overview', 'Admin user logged in, can see the overview HTML title.');
		});

		//http://docs.casperjs.org/en/latest/modules/casper.html#thenbypass
		//uncomment this to skip the 404 link checks
		//casper.thenBypass(1);

		//https://stackoverflow.com/questions/29325617/scrape-link-from-element-that-has-no-class-or-id-casperjs
		//https://stackoverflow.com/questions/31786354/how-to-check-broken-links-in-a-webpage-using-casperjs
		//check all the outbound links for 404's
		casper.then(function() {
			casper.options.stepTimeout = 15000; // 15 seconds

			var urls = this.evaluate(function(){
				//grab all the outbound external links
				return [].map.call(document.querySelectorAll('.row a[href]'), function(a){
					return a.href;
				});
			});
			//urls.push("http://google.com/404"); //sanity check a known 404 page

			urls.forEach(function(link) {
				casper.thenOpen(link, function(response) {
					if (response == undefined || response.status >= 400) {
						//http://docs.casperjs.org/en/latest/modules/tester.html#info
						//casper.test.info could be switched to fail/error but sometimes the links go up and down...
						casper.test.info("400 error, failed: " + link);
					} else {
						//http://docs.casperjs.org/en/latest/modules/tester.html#pass
						casper.test.pass("Good link: " + link);
					}
				});
			});
		});

		//reload information specific to the overview page
		casper.thenOpen('http://127.0.0.1:3000/overview');

		casper.waitForSelector("#gostudies", function() {
			//dump lots of details to the console about this element
		    //require('utils').dump(this.getElementInfo('#gostudies'));
		    //click on go to studies button
			this.click('#gostudies');
		});

		//wait for the studies page to load
		casper.waitForSelector("#newstudy", function() {
			test.assertTitle('Kort: Studies', 'Studies page rendered.');
		});

		casper.thenOpen('http://127.0.0.1:3000/users');
		//wait for the users page to load
		casper.waitForSelector("#newUserBtn", function() {
			test.assertTitle('Kort: Users', 'Users page rendered.');
		});

		casper.thenOpen('http://127.0.0.1:3000/logout');
		//wait for the main login page to load
		casper.waitForSelector("form input[name='email']", function() {
			test.assertTitle('Kort', 'Login page rendered.');
		});

		//try to get back inside the application, this should dump us back to login
		casper.thenOpen('http://127.0.0.1:3000/studies');
		//wait for the main login page to load
		casper.waitForSelector("form input[name='email']", function() {
			test.assertTitle('Kort', 'Logout worked properly, login page redirect rendered.');
		});

	}).run(function() {
		test.done();
	});
});
