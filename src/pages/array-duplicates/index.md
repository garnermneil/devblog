---
title: Array duplicates
date: "2020-01-06"
tags: ["javascript", "typescript"]
---

The Set object provides a handy way to remove duplicates from an array.

```javascript
const arrayWithDuplicates = [1, 1, 2, 3, 4, 4, 5]
```
<!-- end -->

```javascript
const setFromArray = new Set(arrayWithDuplicates)
const arrayWithoutDuplicates = Array.from(setFromArray)
```

or even shorter form

```javascript
const arrayWithoutDuplicates = Array.from(new Set(arrayWithDuplicates))
```

Find out more about Sets [at Mozilla Dev Org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)


