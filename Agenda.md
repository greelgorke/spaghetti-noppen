# A story about spaghetti & duplo blocks

## me
* greelgorke @ twitter, github, #node.js irc + google group
* [http://greelgorke.tumblr.com/about](http://greelgorke.tumblr.com/about)
* working @ [wowbiz.de](http://www.wowbiz.de)
* working with Node over a year or so

## Personal disclaimer
* this talk contains brand new examples: bugs included.
* my English sucks, patches welcome, issues too.
* if I'm talking strange or too quite, tell me.

## Talk disclaimer
* I'm not representing Node.js Community.
* Some practices presented here are opinions, some not.
* This talk is about software design, architecture and modularization
* SRP, DRY, generic interfaces, less is elegant, but readable first

## Node.js associations
* callback spaghetti, callback hell?
* 10k concurrent connections, non-blocking I/O
* server-side-js w/o jQuery?
* small core, big community

## about spaghetti and callback hell
* callback !== closure
* "With great closures comes great responsibility"
* Closures are key to many useful patterns and programming techniques.
* Closures misused are poison
* cyclomatic complexity

## Let's evolve
* small and simple webchat
* evolve it applying few principles and practices
* reqs: serve static files, find and present avatars from twitter or github

## Example 1: Pasta
* all in one: 1_gh.js
* chat not even working
* too painful..

## Modules
* Identify responsibilities, separate concerns
* one thing doing one task well
* some don't know: require() caches -> a module is a singleton
* one function modules aka substack modules
* one -higher order- function modules, inject what you want.

## Interfaces 1: Callbacks
* `function aCallback(error, result){}`
* `function anAsyncThing(input, moreInput, callbackAtLast){}`
* pass the callback as deep as possible
* caveat: an ENOENT isn't 404

## Example 2: Modules Hell
* file explosion: many different responsibilities
* Server: get the request, send the response
* rendering, fetch user image, serve static, etc
* callback, done better

## What about duplo blocks?
* first: modules are not enough
* callback pattern is simple and straight forward
* streams, events are evolution of callbacks

## Interfaces 2: EventEmitters
* decouple modules by message passing
* define a contract and document it
* emit, 'error', 'data' etc.
* caveat: need knowledge about format of results
* -> reduce needed knowledge about format

## Interfaces 3: Streams
* decouple modules by uniformed interface and message passing
* format is string (or Buffer), coupling is evented or piped
* sometimes we still need to know what's coming in.
* some core modules are not that stream friendly as they should be: http/s headers

## Structure: Node app/lib is a chain of transformations.
* know Connect/Express?
* what about async?
* plugin pattern
* Let's do same

## Example 3.1: Weaving
* server is feeding the chain of plugable modules (Chain of Responsibility)
* using streams where appropriate

## Example 3: Slightly different
* imgRepo.js

## Common sense
* so far we've seen: callbacks, modules, streams
* what about routers: a router is just a plugin, that maintains a subchain (or a tree of sub-chains)
* Questions so far?

## The next step: data flowing through the app
* Streams as flow control: design your app as a pipeline
* If your app transform string inputs: do core Streams, they're good till awesome
* heard about Flow Design? For node you can find something like that too: event-stream

## Example 4: flow (with event-stream)
* This is NOT common in Node
* a different way of thinking about applications and libs
* feels native to me.
* Still: we have to define a context, here it's http

## Questions?