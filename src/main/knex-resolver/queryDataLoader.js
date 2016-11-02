import DataLoader from 'dataloader';

// TODO: loader to be at request level instead of global...need to pass this in req.
// if loader is three...then use it else use knex directly.
// https://github.com/applification/graphql-loader/blob/master/src/index.js
// https://github.com/facebook/dataloader/commit/175cb3f0414514f9784d0538df79fb9436084519
// TODO: Move this at request level instead of global.
module.exports = {
  queryDataLoader(knex) {
    return new DataLoader(keys => Promise.all(keys.map(key => knex.raw(key))), {
      // Make sure we use a `WeakMap` for the cache so old `Client`s are not held in memory.
      // Can also make use of Redis here.
      cache: new WeakMap()
    });
  }
};
