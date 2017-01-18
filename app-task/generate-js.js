/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var config = require('./build.config'),
    fs = require('fs'),
    gulp = require('gulp'),
    prompt = require("gulp-prompt"),
    replace = require('gulp-replace'),    
    rename = require('gulp-rename'),
    insert = require('gulp-insert'),
    gutil = require('gulp-util');

var choices = Object.keys(config.templates.angular),
    choiceDefault = choices.length;
const _CANCEL_ = 'Cancel';
    choices.push(_CANCEL_);
    

    
module.exports.create = createPrompt;

function createPrompt() {
    
    var promptTask = getPromptTask('create');
    
    gulp.src('')
        .pipe(prompt.prompt(promptTask, promptHandle));
    
    function promptHandle(res) {
        if ( res.task && res.task !== _CANCEL_ ) {
            gutil.log('Task Selected:', res.task); 
            createTask(res.task);
        } else {
            gutil.log('Task has been canceled.');
        }
    } 
}

function createTask(type){
    
    if ( !config.templates.angular.hasOwnProperty(type) ) {
        gutil.log("Task has been canceled. Could not find option.");
        return;
    }
    
    var opts = config.templates.angular[type],
        promptInfo = [{
            type: 'input',
            name: 'name',
            message: opts.messages.prompt
        }];
    // fix callback hell
    gulp.src('')
        .pipe(prompt.prompt(promptInfo, promptHandle));
    
    
    function promptHandle(res) {
        if (!res.name) {
            gutil.log('Task has been canceled. Empty Input');
        } else {            
            try {
                fs.statSync(opts.target + res.name);
                var promptInfoConfirm = {
                        'type' : 'rawlist',
                        'name' : 'finish',
                        'message' : res.name + ' already exist, are you sure you want to continue?',
                        'choices' : ['Continue', 'Cancel'],
                        'default' : 1
                    };
                gulp.src('')
                .pipe(prompt.prompt(promptInfoConfirm, promptConfirm));
                                
                function promptConfirm(confirm) {
                    gutil.log('Confirm Selection', confirm.finish);
                    if ( confirm.finish === 'Continue' ) {
                        createTemplate(res.name, opts);
                    }
                }
                               
            } catch(e) {
                 /* continue, no directory issues */
                createTemplate(res.name, opts);                
            }
    
            
            //addFeatureToStyles(res.name).on('error', gutil.log);
        }
    }
    
    
    
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
            addSaasTemplateToStyles(baseName, opts);
            gutil.log('Creating template', baseName, 'Completed' );
        });
}


function addSaasTemplateToStyles(baseName, opts) {
    return gulp.src(config.css.mainFile)
        .pipe(insert.append('\n@import "' + opts.target + baseName + '/' + baseName + '";'))
        .pipe(gulp.dest(config.css.sass)).on('error', gutil.log);
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


function getPromptTask(command) {
     return {
        'type' : 'rawlist',
        'name' : 'task',
        'message' : 'Which ' +command+ ' task would you like to run?',
        'choices' : choices,
        'default' : choiceDefault
    }; 
}