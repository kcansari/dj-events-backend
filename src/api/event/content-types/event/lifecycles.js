const slugify = require("slugify");

module.exports = {
  //   beforeCreate(createdEvent) {
  //     // const { data } = createdEvent.params;
  //     console.log(data);
  //     // if (data.name) {
  //     //   data.slug = slugify(data.name, { lower: true });
  //     // }
  //   },
  //   beforeUpdate(event) {
  //     const { data } = event.params;
  //     if (data.name) {
  //       data.slug = slugify(data.name, { lower: true });
  //     }
  //   },
  //   afterCreate(event) {
  //     const { result, params } = event;
  //     // console.log(params.data.slug);
  //     // console.log(result.Slug);
  //     result.Slug = params.data.slug;
  //     // console.log(result);
  //     // do something to the result;
  //   },
};

// module.exports = {

//     afterCreate(event) {

//       const { result, params } = event;

//          data: {

//             contentType: 'Article',

//             action:'New Content Entry',

//             content:result.Content,

//             author:result.createdBy,

//             params:params,

//             request:event,

//         },

//     },
//   }
