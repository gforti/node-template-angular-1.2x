/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var config = require('./task.config'),
    fs = require('fs'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    prompt = require("gulp-prompt"),
    replace = require('gulp-replace'),    
    rename = require('gulp-rename'),
    insert = require('gulp-insert'),
    gutil = require('gulp-util');

var choices = Object.keys(config.templates.angular),
    commandChoices = config.commands,
    commandChoicesDefault = config.commands.length,
    choiceDefault = choices.length;
const _CANCEL_ = 'Cancel';
    choices.push(_CANCEL_);
    commandChoices.push(_CANCEL_);
    

    
module.exports.generate = taskPrompt;


function taskPrompt() {
    
    var promptTask = getPromptCommands();
    
    gulp.src('')
        .pipe(prompt.prompt(promptTask, promptHandle));
    
    function promptHandle(res) {
        if ( res.command && res.command !== _CANCEL_ ) {
            gutil.log('Command Selected:', res.command); 
            createPrompt(res.command);
        } else {
            gutil.log('Command has been canceled.');
        }
    } 
}


function createPrompt(command) {
    
    var promptTask = getPromptTask(command);
    
    gulp.src('')
        .pipe(prompt.prompt(promptTask, promptHandle));
    
    function promptHandle(res) {
        if ( res.task && res.task !== _CANCEL_ ) {
            gutil.log('Task Selected:', res.task); 
            switch (command) {
                case "Create":
                    createTask(res.task);
                    break;
                case "Replace":
                    break;
                case "Delete":
                    break;                
                default:
                    gutil.log('Task has been canceled.');
            }
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
                 /* continue, directory does not exist */
                createTemplate(res.name, opts);                
            }
                
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
        .pipe(replace('app', config.js.module))
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



function deleteTemplate(baseName, opts) {
    return gulp.src(opts.target + baseName)
        .pipe(clean({
            force: true
        })).on('error', gutil.log)
        .on('end', function() {
            deleteSaasTemplateFromStyles(baseName, opts);
            gutil.log('Deleting template', baseName, 'Completed' );
        });;
}

function deleteSaasTemplateFromStyles(baseName, opts) {
    return gulp.src(options.css.mainFile)
        .pipe(replace('@import "' + opts.target + baseName + '/' + baseName + '";', ''))
        .pipe(removeEmptyLines())
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

function getPromptCommands() {
     return {
        'type' : 'rawlist',
        'name' : 'command',
        'message' : 'Which task would you like to run?',
        'choices' : commandChoices,
        'default' : commandChoicesDefault
    }; 
}