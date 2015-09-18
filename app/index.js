var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var path   = require('path');
var yosay  = require('yosay');

module.exports = yeoman.Base.extend({

	constructor: function(){
		yeoman.Base.apply(this, arguments);
		this.sourceRoot(path.join(__dirname, '../templates'));
	},

	initializing: function () {
		this.pkg = require('../package.json');

		this.log(yosay(
	      'Welcome to the carbon generator!'
	    ));
	},

	prompting: function(){
		var done = this.async();

		var prompts = [
			{
				type   : 'input',
				name   : 'name',
				message: 'Your project name: ',
				default: this.appname,
				validate: function(input) {
			        var done = this.async();
			        
			        if (!new RegExp(/^[a-z\-\_]+$/).test(input)) {
			        	done("The app name should only contain letters, '-' or '_'.");
			        } else {
			        	done(true);
			    	}
			    }
			},
			{
				type : 'input',
				name : 'desc',
				message: 'Your project description: '
			},
			{
				type : 'input',
				name : 'surg',
				message : 'Your surge domain ( without surge.sh ): ',
			},
			{
				type : 'confirm',
				name : 'deps',
				message : 'Would you like to install the npm dependecies and bower components?',
				default: false
			}
		]

		this.prompt(prompts , function(answers){

			this.name = answers.name;
			this.desc = answers.desc;
			this.deps = answers.deps;
			this.surg = answers.surg;

			done();
		}.bind(this));
	},

	writing: function(){
		this.mkdir('app');

		this.fs.copyTpl(
			this.templatePath('_static/_index.html'),
			this.destinationPath('index.html'),
			{
				name: this.name,
				desc: this.desc
			}
		);

		this.fs.copyTpl(
			this.templatePath('_static/_app.js'),
			this.destinationPath('app.js'),
			{
				name: this.name,
				desc: this.desc
			}
		);

		this.fs.copyTpl(
			this.templatePath('_static/_app'),
			this.destinationPath('app'),
			{
				name: this.name,
				desc: this.desc
			}
		);

		this.mkdir('app/assets/js');
		this.mkdir('app/assets/js/libs');
		this.mkdir('app/assets/img');


		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'),
			{
				name: this.name,
				desc: this.desc
			}
		);

		this.fs.copyTpl(
			this.templatePath('.gitignore'),
			this.destinationPath('.gitignore')
		);


		this.fs.copyTpl(
			this.templatePath('_gruntfile.js'),
			this.destinationPath('Gruntfile.js'),
			{
				surge : this.surg
			}
		);

		this.fs.copyTpl(
			this.templatePath('_bower.json'),
			this.destinationPath('bower.json'),
			{
				name: this.name,
				desc: this.desc
			}
		);
	},

	install: function(){
		this.installDependencies({ skipInstall: !this.deps });
	},

	end: function(){
		this.log.writeln('');
  		this.log.writeln('Looks like we\'re done!');
  		this.log.writeln('Just run "grunt and be happy');
  		this.log.writeln('');
	},
});