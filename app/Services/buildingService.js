let config = require('../config');
const db = require('../models/database');
const geoLocation = require('../helpers/geoLocationHelper');

const BuildingService = function () {};

BuildingService.prototype.createBuilding = async (req, res) => {
  try {
    const data = await geoLocation.geocoder.geocode(`${req.body.Address}, ${req.body.City}, ${req.body.ZipCode}`);
    const buildingNew = {
      address: req.body.Address,
      city: req.body.City,
      state: req.body.State,
      zip_code: req.body.ZipCode,
      units: req.body.Units,
      latitude: data[0].latitude,
      longitude: data[0].longitude,
      user_id: req.user.id
    };
    const building = await db.building.create(buildingNew);
    const result = await db.user.findAll({
      include: [{ model: db.building }]
    });
    return result;
  } catch (error) {
    throw (error);
  }
};

BuildingService.prototype.getAllBuilding = async (req, res) => {
  try {
    const result = await db.user.findAll({
      where: { id: req.user.id },
      include: [{ model: db.building }]
    });
    return result;
  } catch (error) {
    throw (error);
  }
};

module.exports = new BuildingService();
