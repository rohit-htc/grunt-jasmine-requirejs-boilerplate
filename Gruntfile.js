var LIVERELOAD_PORT=35729;
var lrSnippet=require('connect-livereload')({port:LIVERELOAD_PORT});
var livereloadMiddleware=function(connect,options) {
	return [
		lrSnippet,
		connect.static(options.base[0].path),
		connect.directory(options.base[0].path)
	];
};
module.exports=function(grunt) {
	grunt.initConfig({
		distFolder:'dist',
		pkg:grunt.file.readJSON('package.json'),
		connect:{
			client:{
				options:{
					port:9000,
					base:{
						path:'.',
						options:{
							index:'_SpecRunner.html',
						}
					},
					middleware:livereloadMiddleware
				}
			}
		},
		watch:{
			client:{
				files:['_SpecRunner.html'],
				tasks:[],
				options:{
					livereload:LIVERELOAD_PORT
				}
			},
			myfiles:{
				files:['src/**/*.js','spec/**/*.js'],
				tasks:['jasmine']
			}
		},
        jasmine : {
            src : 'src/**/*.js',
            options : {
                specs : 'spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                            baseUrl: ''
                    }
                },
				keepRunner:true,
            }
        },
		open:{
			dev:{
				path:'http://127.0.0.1:<%= connect.client.options.port %>/_SpecRunner.html',
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-open');
	grunt.registerTask('preview',['jasmine','connect:client','open:dev','watch']);
}
