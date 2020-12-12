const { default: axios } = require('axios');

const { coreApi } = require('../../config');
const { featuresResources } = require('../../shared/config');

const coreApiAxios = axios.create({ baseURL: coreApi.url });

module.exports = (feature_id) => {
  /**
   * @type { Map<string, Promise<Record<string, string>>> | Record<string, string> }
   */
  const cache = new Map();

  return async (req, _res, next) => {
    try {
      const { service_id, space_id } = req.query;

      delete req.query.service_id;
      delete req.query.space_id;

      let spaceCache;
      while (cache.has(space_id) && !spaceCache) {
      // eslint-disable-next-line no-await-in-loop
        spaceCache = await cache.get(space_id);
      }

      const retrieveSecrets = !spaceCache;
      let resolveSpaceCachePromise;

      if (retrieveSecrets) {
        spaceCache = {};
        cache.set(space_id, new Promise((resolve) => {
          resolveSpaceCachePromise = resolve;
        }));
      }

      const { data: { data: info } } = await coreApiAxios
        .post(
          '/info/get_all',
          {
            service_id,
            space_id,
            user_auth_id: req.user.sub,
            retrieve_secrets: retrieveSecrets,
          },
          {
            headers: {
              Authorization: `Bearer ${featuresResources[feature_id].coreApiToken.value}`,
            },
          },
        )
        .catch((err) => {
          if (retrieveSecrets) {
            resolveSpaceCachePromise(null);
          }
          cache.delete(space_id);
          throw err;
        });

      info.secrets.forEach(({ name, value }) => {
        spaceCache[name] = value;
      });

      if (retrieveSecrets) {
        resolveSpaceCachePromise(spaceCache);
        cache.set(space_id, spaceCache);
      }

      req.locals = {};
      req.locals.space = info.space;
      req.locals.service = info.service;
      req.locals.feature = info.feature;
      req.locals.secrets = { ...spaceCache };
      next();
    } catch (error) {
      next(error);
    }
  };
};
