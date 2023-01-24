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
- fix cardsort results link

-- Set CSP property in helmetjs (add unpkg.com for popper)
-- fix CORS for popper https://stackoverflow.com/questions/69832906/how-to-prevent-err-blocked-by-response-notsameoriginafterdefaultedtosameoriginby

- Apostrophe in card title breaks it

