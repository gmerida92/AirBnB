'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "439 Johnson St",
        city: "Sausilito",
        state: "California",
        country: "United States of America",
        lat: 37.856947,
        lng: -122.485298,
        name: "Bay Area Getaway",
        description: "Comfortable to place to vacation",
        price: 210,
        previewImage: "https://cdn.vox-cdn.com/thumbor/bg0-nPYpciaNPJtyHOZymDD8VL8=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19499175/los_angeles_after_2011.jpg",
      },
      {
        ownerId: 2,
        address: "35 Cornell St",
        city: "East Northport",
        state: "New York",
        country: "United States of America",
        lat: 40.89419,
        lng: -73.339216,
        name: "Comfortable Hidden Home",
        description: "Fun place to visit",
        price: 305,
        previewImage: "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
      },
      {
        ownerId: 3,
        address: "240 Codell Dr",
        city: "Lexington",
        state: "Kentucky",
        country: "United States of America",
        lat: 38.014979,
        lng: -84.454125,
        name: "Burbon Trail Getaway",
        description: "Have drink when you visit",
        price: 115,
        previewImage: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Tiny_house%2C_Portland.jpg",
      },
      {
        ownerId: 4,
        address: "2688 Clay Mathis Rd",
        city: "Mesquite",
        state: "Texas",
        country: "United States of America",
        lat: 32.734851,
        lng: -96.545785,
        name: "Cowboy Getaway",
        description: "Feel like a cowboy from the past",
        price: 99,
        previewImage: "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/NPXSLRHA7II6ZPSHZPIBAINHXM.jpg",
      },
      {
        ownerId: 5,
        address: "725 N Taylor St",
        city: "Marengo",
        state: "Illinois",
        country: "United States of America",
        lat: 42.256613,
        lng: -88.605826,
        name: "Midwest Hidden Vacation Home",
        description: "Get away from the city in the midwest",
        price: 108,
        previewImage: "https://cdn.vox-cdn.com/thumbor/FrnLQTpuAoAmp0GZRZctSSdkC04=/0x0:3000x2000/1200x0/filters:focal(0x0:3000x2000):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/21905363/iStock_185930591.jpg",
      },
      {
        ownerId: 6,
        address: "538 Blossom Way",
        city: "Hayward",
        state: "California",
        country: "United States of America",
        lat: 37.679380,
        lng: -122.103300,
        name: "East Bay Getaway",
        description: "So close but yet so far from the city",
        price: 330,
        previewImage: "https://www.austinmonitor.com/wp-content/uploads/2022/07/download-40.png",
      },
      {
        ownerId: 1,
        address: "1226 8th Ave NW",
        city: "Puyallup",
        state: "Washington",
        country: "United States of America",
        lat: 47.197339,
        lng: -122.310175,
        name: "Woodland Getaway",
        description: "Come visit to look for big foot",
        price: 290,
        previewImage: "https://www.thespruce.com/thmb/AwKGWGCGvZBJNTWDUw_v2l2474k=/1000x1000/smart/filters:no_upscale()/a-frame-houses-4772019-hero-7cacd243cfe74fb8b06f44760ea59f35.jpg",
      },
      {
        ownerId: 2,
        address: "4144 Willis Way",
        city: "Milton",
        state: "Florida",
        country: "United States of America",
        lat: 30.585463,
        lng: -87.042304,
        name: "Humid Getaway",
        description: "Come experience Florida and all its glory",
        price: 175,
        previewImage: "https://www.nps.gov/articles/images/Piper-House.jpg?maxwidth=1200&autorotate=false",
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkDelete(options, null, {})
  }
};
