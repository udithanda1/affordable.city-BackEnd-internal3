const config = require('../config');
const db = require('../models/database');

const ListingService = function () {};

ListingService.prototype.createListing = async (req, res) => {
  const tranc = await db.sequelize.transaction();
  try {
    const listingNew = {
      rent: req.body.Listing.Rent,
      units: req.body.Listing.Units,
      no_of_bedrooms: req.body.Listing.NoOfBedrooms,
      no_of_bathrooms: req.body.Listing.NoOfBathroom,
      neighbourhood: req.body.Listing.Neighbourhood,
      video: req.body.Listing.Video,
      building_id: req.body.Listing.BuildingId

    };
    console.log('descriptor_title', req.body.Descriptor[0].DescriptorTitle);
    const descriptorNew = {
      descriptor_title: req.body.Descriptor[0].DescriptorTitle
    };
    const AmenitiesNew = {
      amenitie_name: req.body.Amenities.AmenitieName
    };
    const listing = await db.listing.create(listingNew, { transaction: tranc });
    const descriptor = await db.descriptor.create(descriptorNew, { transaction: tranc });
    const Amenitie = await db.amenitie.create(AmenitiesNew, { transaction: tranc });
    const listingdescriptorNew = {
      descriptor_id: descriptor.id,
      listing_id: listing.id
    };
    const ListingAmenitiesNew = {
      Amenitie_id: Amenitie.id,
      listing_id: listing.id
    };
    const ListingDescriptor = await db
      .listingDescriptor.create(listingdescriptorNew, { transaction: tranc });
    const ListingAmenities = await db
      .listingAmenitie.create(ListingAmenitiesNew, { transaction: tranc });
    await tranc.commit();
    // let result = await db.listing.findAll({
    //     include: [{ model: db.listingDescription }]

    // });
    const result = await db.descriptor.findAll({
      include: [{ model: db.listingDescriptor }]

    });
    return result;
  } catch (error) {
    // rollback transaction
    await trans.rollback();
    throw (error);
  }
};

ListingService.prototype.getAllListing = async (req, res) => {
  try {
    const result = await db.listing.findAll({
      include: [{ model: db.listingDescriptor },
        { model: db.listingAmenitie }
      ]
    });
    // console.log("descriptor ", result1[0].listingDescriptors[0].descriptor_id);
    // // let result = await db.description.findAll({
    // //     include: [{ model: db.listingDescription }]

    // // });
    return result;
  } catch (error) {
    throw (error);
  }
};

module.exports = new ListingService();
