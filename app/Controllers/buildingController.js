const BuildingService = require('../services/buildingService');
const responseHelper = require('../helpers/responseHelper');

const BuildingController = {};

BuildingController.index = async (req, res, next) => {
  try {
    const result = await BuildingService.createBuilding(req, res);
    responseHelper.setSuccessResponse(result, res);
  } catch (error) {
    // console.log('Error: ', error);
    next(error);
  }
};

BuildingController.getIndex = async (req, res, next) => {
  try {
    const result = await BuildingService.getAllBuilding(req, res);
    responseHelper.setSuccessResponse(result, res);
  } catch (error) {
    //  console.log('Error: ', error);
    next(error);
  }
};

module.exports = BuildingController;
