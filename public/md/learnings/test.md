---
title: "The loadings of ES Modules are Async"
description: "This is a test learning page."
keywords: ["javascript", "esm"]
draft: true
createdAt: "April 7, 2025"
---

The execution of ESM is in three steps:

1. Load
   1. Asynchronously load all dependencies, then return a promise.
2. Link
   1. Resolve module dependencies by link the exports
3. Execute
   1. Return a promise of execution.

Even the steps depend to prior, the tasks are async.

Unlike CJS, the load and link is async, therefore when two modules import the two, the load doesn’t block the export.

In CJS:

```jsx
// a.js
const { b } = require("./b");
console.log(b);
exports.a = "a";

// b.js
const { a } = require("./a");
console.log(a);
exports.b = "b";

// b undefined

// Why? Because in CJS, when a.js is loaded, it exports
// an empty object {} at that moment because the module
// hasn't finished execution yet. Once the module execution
// completes, its exports are updated.
```

In ESM:

```jsx
// a.js
import { b } from "./b.js";
console.log(b);
export const a = "a";

// b.js
import { a } from "./a.js";
console.log(a);
export const b = "b";

// b a

// Why? Because in ESM, the load and link are done separately.
// Therefore before the execution, the load and link of modules
// a and b are resolved.
```
