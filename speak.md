# What is Node.js?

# Associations?
spaghetti?
pyramid
waterfall

# about spaghetti
Closures are power.
"With great power comes great responsibility" -- Stan Lee via Peter Parkers Uncle
Closures are key to many useful patterns and programming techniques. But also encourages to be misused for
highly functions-nesting code aka callback-spaghetti

# The solution:
*don't do that*, you don't have to

# symptoms cure:
- Function#bind, async
- promises, fibers, magic (remember: responsibility)

# Node way:
- SRP, IoC, Encapsulation, unified + generic interfaces -
sounds enterprisey?
well designed architecture (b)eats pasta

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

