'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        imageableId: 1,
        imageableType: "User",
        url:"https://htmlstream.com/preview/unify-v2.6.1/assets/img-temp/400x450/img5.jpg"
      },
      {
        userId: 1,
        imageableId: 1,
        imageableType: "Spot",
        url:"https://cdn.vox-cdn.com/thumbor/teCEQIxlj9RbCj6P_vlwMopAptQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11545893/House_Calls_Brooklyn_Zames_Williams_living_room_2_Matthew_Williams.jpg"
      },
      {
        userId: 2,
        imageableId: 2,
        imageableType: "Spot",
        url:"https://www.nicheinteriors.com/wp-content/uploads/2018/09/luxury-interior-design-san-francisco.jpg"
      },
      {
        userId: 3,
        imageableId: 3,
        imageableType: "Spot",
        url:"https://cdn.shopify.com/s/files/1/1094/9426/files/designstyle-03_grande.jpg?v=1478905472"
      },
      {
        userId: 1,
        imageableId: 1,
        imageableType: "Review",
        url:"https://assets.site-static.com/userFiles/1718/image/uploads/agent-1/make-your-backyard-an-oasis.jpg"
      },
      {
        userId: 2,
        imageableId: 2,
        imageableType: "Review",
        url:"https://st2.depositphotos.com/1041088/5400/i/950/depositphotos_54005815-stock-photo-backyard-decoration-idea.jpg"
      },
      {
        userId: 2,
        imageableId: 3,
        imageableType: "Review",
        url:"https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2017/08/main/outdoor-makeovers-oakland-yard-before-sun-0818.jpg"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
