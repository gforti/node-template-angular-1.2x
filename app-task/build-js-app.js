/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var options = require('./build-options'),
    fs = require('fs'),
    gulp = require('gulp'),
    prompt = require("gulp-prompt"),
    replace = require('gulp-replace'),    
    rename = require('gulp-rename'),
    gutil = require('gulp-util');


module.exports.createJS = create;

function create() {
    
    gulp.src('')
    .pipe(prompt.prompt({
        'type' : 'rawlist',
        'name' : 'task',
        'message' : 'Which CREATE task would you like to run?',
        'choices' : ['feature', 'provider', 'service', 'factory', 'widget', 'modal', 'Cancel'],
        'default' : 6
    }, function(res){
        
        if ( res.task && res.task !== 'Cancel' ) {
            gutil.log('Task Selected:', res.task); 
            createTask(res.task);
        } else {
            gutil.log("Task has been canceled.");
        }
               
    }));
    
    
}

function createTask(type){
    if ( ! options.templates.angular.hasOwnProperty(type) ) {
        gutil.log("Task has been canceled. Could not find options.");
        return;
    }
    var opts = options.templates.angular[type],
        promptInfo = [{
            type: 'input',
            name: 'name',
            message: opts.messages.prompt
        }];
    
     gulp.src('')
        .pipe(prompt.prompt(promptInfo, function (res) {
        if (!res.name) {
            gutil.log('Task has been canceled. Empty Input');
        } else {            
            try {
                fs.statSync(opts.target + res.name);
                gulp.src('')
                .pipe(prompt.prompt({
                    'type' : 'rawlist',
                    'name' : 'finish',
                    'message' : res.name + ' already exist, are you sure you want to continue?',
                    'choices' : ['Continue', 'Cancel'],
                    'default' : 1
                }, function(confirm){
                   
                    gutil.log('Confirm Selection', confirm.finish);
                    if ( confirm.finish === 'Continue' ) {
                        createTemplate(res.name, opts);
                    }
                }));
                
                               
            } catch(e) {
                createTemplate(res.name, opts);
                 /* continue, no issues */
            }
    
            
            //addFeatureToStyles(res.name).on('error', gutil.log);
        }
    }));
    
}


/* Expects name in 'name-template' format */
function createTemplate(baseName, opts) {
    var nameTitleCase = titleCase(baseName),
        nameCamelCase = lowerCaseFirstLetter(nameTitleCase),
        SassName = '_' + baseName;

    gutil.log('Creating template', baseName);
    gulp.src(opts.source + "*")
        .pipe(replace(opts.nameCase.title, nameTitleCase))
        .pipe(replace(opts.nameCase.title, nameTitleCase))
        .pipe(replace(opts.nameCase.camel, nameCamelCase))
        .pipe(replace(opts.nameCase.base, baseName))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = (path.extname === '.scss' ? SassName : baseName);

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(opts.target + baseName))
        .on('error', gutil.log)
        .on('end', function() {
            gutil.log('Creating template', baseName, 'Completed' );
        });
}


function addSaasTemplateToStyles(name) {
    return gulp.src(options.css.mainFile)
        .pipe(insert.append('@import "' + options.templates.feature.folder + name + '/' + name + '";\n'))
        .pipe(gulp.dest(options.css.sass)).on('error', gutil.log);
}




/* Expects name in 'widget-template' format
   Outputs 'WidgetTemplate' format */
function titleCase(string) {
    if (!string) {
        return;
    }
    var words = string.split('-');
    var output = "";
    for (var i = 0, l = words.length; i < l; ++i) {
        output += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return output;
}

function lowerCaseFirstLetter(string) {
    if (!string) {
        return;
    }
    return string.charAt(0).toLowerCase() + string.slice(1);
}