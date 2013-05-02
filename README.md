# This is a repo with code and slides of my coming soon talk at HH.js

following are agenda and notes. This is work in progress.

# Agenda
* (optional) short introduction into Node.js
* callback-spaghetti / callback-hell
* one-function-module / higher-order-function-module
* using callbacks
* EventEmitter
* Streams

# Node.js

## Positive
non-blocking I/O
server-side javascript
EventLoop in a single thread
vibrant community

## promised lands
scalability granted
performance granted
client-server code sharing granted

## Negative
spaghetti
blocking CPU
early state
wheel reinvention

# Spaghetti
## (img: spaghetti)
## code: a naive app

# about spaghetti
"With great closures comes great responsibility"
Closures are key to many useful patterns and programming techniques.
But also encourages to be misused for highly functions-nesting code aka callback-spaghetti
cyclomatic complexity 7+ anyone?


## The solution:
well designed architecture (b)eats pasta
analyze your code, locate unnecessary closures
in most cases you need none or just one closure

## 1.
*don't misuse closures*, you don't have to

## 2.
Function#bind: separate scope from logic
it's like templates, just with logic

## 3.
flow control: sometimes it get's complicated
async - it's more like cannelloni
magic - promises, fibers. use it gently, but hide it away.

# 4. Nodes philosophy
callbacks are the nature of asynchronous javascript
don't fight it, make it your strength
- SRP, IoC, Encapsulation, unified + generic interfaces -
sounds enterprisey?

# Vision
"I want programming computers to be like coloring with crayons and playing with
duplo blocks." -- Ryan Dahl

# Nodes design tools
- Core is small, clean and out of the way
- simple, but powerful module system
- single-function-module practice
- callbacks, EventEmitters, Streams(2)
- Protocols with streams and events

# Core: don't open doors, break the walls
do server: net, http/s, url, crypto, tls, dns, etc.
do cli: readline, process, os, fs + path, tty, child_process
simply do: Eventloop, module, npm, external bindings

# Module
module: scope and exports
require: static and dynamic imports
npm: package >= module

# Single-function-module
a module with a single function as export
-> SRP is king, Encapsulation for free
configuration (and DI) can be done with an extended pattern

# Interfaces: Callback Driven
1 question - 1 answer
simplest thing you can do
conventions allows to just pass it by
explicit errors

# Interfaces: EventEmitter
1 Question - Different Answers
PubSub
'error' acts like throw: listen to, or it stabs your app.
domains backed handling

# Interfaces: Streams
Conversation channels: read, write, duplex, transform
One interface, unlimited data
at the end data is type agnostic, we give it meaning through interpretation
Sometimes we have to agree on a meaning

Interfaces: common protocols in node (Streams and E)
Token: Whitespace terminated byte sequence (most parsers)
Line: EOL terminated byte sequences (readline)
File: EOF terminated byte sequences (fs streams)
Frame: byte sequences of (pre)defined size (http, udp)
Object: JSON.parse-able strings (JSONStream)

# License and Usage

The code is presentational, may have terrible bugs and insecurities. Anyway, you can use it if you wish under the terms of the MIT License.

The textual contents in the slides are public domain.

The images, if any used, are licensed under the Creative Commons 2.0 License, the copyrights belong to creators.

The Node.js logo and name are trademarks of Joyent Inc

