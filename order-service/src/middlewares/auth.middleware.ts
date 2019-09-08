import * as faker from 'faker';

export const authMiddleware = (req, _, next) => {
  if (req.path === '/api/orders' && req.method === 'POST' && !req.body.user) {
    req.body.user = faker.internet.userName();
  }
  next();
};
