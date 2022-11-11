// "use strict";

/**
 *  events controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  //Find with populate ----------------------------------------
  async find(ctx) {
    const populateList = ["image", "user"];
    // Push any additional query params to the array
    populateList.push(ctx.query.populate);
    ctx.query.populate = populateList.join(",");
    // console.log(ctx.query)
    const content = await super.find(ctx);
    return content;
  },

  // Create user event----------------------------------------
  async create(ctx) {
    // let entity;
    // ctx.request.body.data.user = ctx.state.user;
    // entity = await super.create(ctx);
    // return entity;
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await strapi.service("api::event.event").create(ctx.request.body);
    return entity;
  },

  /**
   * Update a record.
   *
   */
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    // console.log(events);
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await super.update(ctx);
    return entity;
  },
  // Delete a user event----------------------------------------
  async delete(ctx) {
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }
    const response = await super.delete(ctx);
    return response;
  },

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
