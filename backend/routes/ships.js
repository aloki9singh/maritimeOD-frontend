const express = require('express');
const ErrorResponse = require('../middleware/error').ErrorResponse;

const router = express.Router();

// Mock Ship Data
const shipData = [
  { name: 'Icon of the Seas', type: 'Cruise', imo: '1234567', flag: 'Bahamas' },
  { name: 'Queen Mary 2', type: 'Cruise', imo: '2345678', flag: 'UK' },
  { name: 'Ever Given', type: 'Container', imo: '3456789', flag: 'Panama' },
];

// Get Ship Data
router.get('/', (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const ship = shipData.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
      if (!ship) {
        throw new ErrorResponse('Ship not found', 404);
      }
      return res.json(ship);
    }
    res.json(shipData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;