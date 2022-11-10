// path: ./src/api/restaurant/controllers/restaurant.js

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::event.event", ({ strapi }) => ({
//   // Method 1: Creating an entirely custom action
//   // Get logged in users
//   async me(ctx) {
//     try {
//       ctx.body = "ok";
//       const user = ctx.state.user;
//       if (!user) {
//         return ctx.badRequest(null, [
//           { message: "No authorization header was found" },
//         ]);
//       }
//     } catch (err) {
//       ctx.body = err;
//     }
//   },

//   // Method 2: Wrapping a core action (leaves core logic in place)
//   async find(ctx) {
//     // some custom logic here
//     ctx.query = { ...ctx.query, local: "en" };

//     // Calling the default core action
//     const { data, meta } = await super.find(ctx);

//     // some more custom logic
//     meta.date = Date.now();

//     return { data, meta };
//   },

//   // Method 3: Replacing a core action
//   async findOne(ctx) {
//     const { id } = ctx.params;
//     const { query } = ctx;

//     const entity = await strapi.service("api::event.event").findOne(id, query);
//     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//     return this.transformResponse(sanitizedEntity);
//   },
// }));

"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }

    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });
    if (!data) {
      return ctx.notFound();
    }

    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));
