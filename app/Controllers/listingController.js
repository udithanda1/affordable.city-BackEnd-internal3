const responseHelper = require('../helpers/responseHelper');
const ListingService = require('../services/listingService');

const ListingController = {};

ListingController.index = async (req, res, next) => {
  try {
    const result = await ListingService.createListing(req, res);
    responseHelper.setSuccessResponse(result, res);
  } catch (error) {
    // console.log('Error: ', error);
    next(error);
  }
};

ListingController.getIndex = async (req, res, next) => {
  try {
    const result = await ListingService.getAllListing(req, res);
    responseHelper.setSuccessResponse(result, res);
  } catch (error) {
    // console.log('Error: ', error);
    next(error);
  }
};

module.exports = ListingController;
