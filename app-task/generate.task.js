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
    gutil = require('gulp-util'),
    gulpDocs = require('gulp-ngdocs');

var choices = Object.keys(config.templates.angular),
    commandChoices = config.commands,
    commandChoicesDefault = config.commands.length,
    choiceDefault = choices.length,
    redactChoices = choices.filter(isRedact),
    redactDefault = redactChoices.length;
const _CANCEL_ = 'Cancel',
      _BACK_ = 'Back';
var commonChoices = [_CANCEL_, _BACK_];
    choices.push(_CANCEL_, _BACK_);
    redactChoices.push(_CANCEL_, _BACK_);
    commandChoices.push(_CANCEL_);
    

    
module.exports.generate = commandsPrompt;
module.exports.generateDocs = docs;
module.exports.seeDocs = seeDocs;


function docs() {
    
    return gulp.src(['app-client/**/*.js', '!app-client/**/*.spec.js'])
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./docs'));
    
}

function seeDocs() {
    var connect = require('gulp-connect');
  connect.server({
    root: 'docs',
    livereload: false,
    fallback: 'docs/index.html',
    port: 8083
  });
}


function isRedact(key){
    return config.templates.angular[key].redact;
}

function commandsPrompt() {
    
    var promptTask = getPromptCommands();
    
    gulp.src('')
        .pipe(prompt.prompt(promptTask, promptHandle));
    
    function promptHandle(res) {
        if ( res.command && commonChoices.indexOf(res.command) === -1 ) {
            gutil.log('Command Selected:', res.command); 
            taskPrompt(res.command);
        } else {
            gutil.log('Command has been canceled.');
        }
    } 
}


function taskPrompt(command) {
    
    var promptTask = getPromptTask(command);
    
    gulp.src('')
        .pipe(prompt.prompt(promptTask, promptHandle));
    
    function promptHandle(res) {
        if ( res.task && commonChoices.indexOf(res.task) === -1 ) {
            gutil.log('Task Selected:', res.task);
            commandTask(res.task, command);            
        } else if ( res.task && res.task === _BACK_ ) {
            commandsPrompt();
        } else {
            gutil.log('Task has been canceled.');
        }
    } 
}

function commandTask(task, command) {
    
    if ( !config.templates.angular.hasOwnProperty(task) ) {
        gutil.log("Task has been canceled. Could not find option.");
        return;
    }
    
    var opts = config.templates.angular[task],
        promptInfo = [{
            type: 'input',
            name: 'baseName',
            message: opts.messages.prompt
        }];
    
    if ( opts.messages.hasOwnProperty('feature') ) {
        promptInfo.push({
            type: 'input',
            name: 'featureName',
            message: opts.messages.feature
        });
    }
    // fix callback hell
    gulp.src('')
        .pipe(prompt.prompt(promptInfo, promptHandle));
    
    
    function promptHandle(res) {
        if (!res.baseName) {
            gutil.log('Task has been canceled. Empty Input');
        } else if( res.baseName === config.js.module ) {
            gutil.log('Input ' + res.baseName + ' cannot match module name ' + config.js.module);
        } else if( res.featureName && res.featureName === config.js.module ) {
            gutil.log('Input ' + res.location + ' cannot match module name ' + config.js.module);
        } else {            
            var targetLocation =  opts.target + ( res.featureName ? res.featureName : res.baseName );
            res.featureName = res.featureName || null;
            
            var msg = command + ' ' + task + ' ' + res.baseName;
                msg += ( res.featureName ? ' into ' + res.featureName : '' );
                msg += ' - Are you sure you want to continue?'
            
            var finishTask = true;
            
            if ( 'Create' === command ) {
                if ( !res.featureName && directoryExist(targetLocation) ) {                
                    gutil.log('Location ' + targetLocation + ' already exist. Please delete frist.');  
                    finishTask = false;
                } else if ( res.featureName && !directoryExist(targetLocation) ) {
                    gutil.log('Location ' + targetLocation + ' does not exist. Please create the feature frist.');
                    finishTask = false;
                }                 
            }
            
             if ( 'Delete' === command ) {
                 if ( !directoryExist(targetLocation) ) {
                    gutil.log('Location ' + targetLocation + ' does not exist. Cannot Delete.');
                    finishTask = false;
                }    
             }
            
            if ( finishTask ) {
                ConfirmChoice(msg).then(function(results) {
                        delegateCommandTask(command, res.baseName, opts, res.featureName);
                }, function(err){
                    gutil.log('Aborted');
                });
            }
          
                
        }
        
    }
        
}


function directoryExist(loc) {
    try {
        return fs.statSync(loc);
    } catch(e) {
        return false;
    }
}


function ConfirmChoice(msg) {
            
    return new Promise(function (resolve, reject) { 
        var promptInfoConfirm = {
            'type' : 'rawlist',
            'name' : 'finish',
            'message' : msg,
            'choices' : ['Continue', 'Cancel'],
            'default' : 1
        };
        gulp.src('')
        .pipe(prompt.prompt(promptInfoConfirm, promptConfirm));

        function promptConfirm(confirm) {
            gutil.log('Confirm Selection', confirm.finish);
            if ( confirm.finish === 'Continue' ) {
                 resolve(true);
            } else {
                reject(false)
            }
        }  
    });


}

function delegateCommandTask(command, baseName, opts, featureName) {
     switch (command) {
        case "Create":
           createTemplate(baseName, opts, featureName);
            break;
        case "Replace":
            break;
        case "Delete":
            deleteTemplate(baseName, opts);
            break;                
        default:
            gutil.log('Task has been canceled.');
    }
}


/* Expects name in 'name-template' format */
function createTemplate(baseName, opts, featureName) {
    var nameTitleCase = titleCase(baseName),
        nameCamelCase = lowerCaseFirstLetter(nameTitleCase),
        SassName = '_' + baseName;
    var featureNameCamelCase = (featureName ? lowerCaseFirstLetter(titleCase(featureName)) : 'featureTemplate' );
    
    var targetLocation = opts.target + baseName;
    if (featureName) {
        targetLocation = opts.target + featureName;   
    }

    gutil.log('Creating template', baseName);
    gulp.src(opts.source + "*")
        .pipe(replace('app', config.js.module))
        .pipe(replace(opts.nameCase.title, nameTitleCase))
        .pipe(replace(opts.nameCase.camel, nameCamelCase))
        .pipe(replace(opts.nameCase.base, baseName))
        .pipe(replace("featureTemplate", featureNameCamelCase))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = (path.extname === '.scss' ? SassName : baseName);

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            }
        }))
        .pipe(gulp.dest(targetLocation))
        .on('error', gutil.log)
        .on('end', function() {
            if ( !featureName ){
                addSaasTemplateToStyles(baseName, opts);
            }
            gutil.log('Creating template', baseName, 'Completed' );
        });
}


function addSaasTemplateToStyles(baseName, opts) {
    return gulp.src(config.css.mainFile)
        .pipe(insert.append('\n@import "' + opts.target + baseName + '/' + baseName + '";'))
        .pipe(gulp.dest(config.css.sass)).on('error', gutil.log);
}



function deleteTemplate(baseName, opts) {
    gutil.log('Deleting template', baseName);
    deleteSaasTemplateFromStyles(baseName, opts);
    return gulp.src(opts.target + baseName)
        .pipe(clean({
            force: true
        }))
        .on('error', gutil.log)
        .on('end', function() {
            
            
        });

}

function deleteSaasTemplateFromStyles(baseName, opts) {
    gutil.log('Deleting template', baseName, 'Completed' );
    return gulp.src(config.css.mainFile)
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
    var choiceList = redactChoices, choiceListDefault = redactDefault;
    if ( 'Create' === command ) {
        choiceList = choices;
        choiceListDefault = choiceDefault;
    }
       
     return {
        'type' : 'rawlist',
        'name' : 'task',
        'message' : 'Which ' + command + ' task would you like to run?',
        'choices' : choiceList,
        'default' : choiceListDefault
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