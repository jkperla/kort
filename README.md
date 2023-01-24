Rebuilding this. 

Major changes: 
Moved user defined settings to .env file.



Bootbox and Bootstrap have some dependancy issues. 

```
npm ERR! Found: bootstrap@5.3.0-alpha1
npm ERR! node_modules/bootstrap
npm ERR!   bootstrap@"^5.3.0-alpha1" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer bootstrap@"^4.4.0 || ^5.0.0" from bootbox@6.0.0
npm ERR! node_modules/bootbox
npm ERR!   bootbox@"*" from the root project
```


Install Bootbox via npm
npm install bootstrap@5.3.0-alpha1

Force Bootstrap install
npm i bootbox --force

Popperjs install
npm i @popperjs/core

Client side popper JS loaded from CDN per Popperjs recommendation.


To-do: 
-- Set CSP property in helmetjs (add unpkg.com for popper)
-- fix CORS for popper https://stackoverflow.com/questions/69832906/how-to-prevent-err-blocked-by-response-notsameoriginafterdefaultedtosameoriginby

- Apostrophe in card title breaks it

npm WARN deprecated@npmcli/move-file@2.0.1: This functionality has been moved to @npmcli/fs
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated phantomjs-prebuilt@2.1.16: this package is now deprecated
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated popper.js@1.16.1: You can find the new Popper v2 at @popperjs/core, this package is dedicated to the legacy v1   