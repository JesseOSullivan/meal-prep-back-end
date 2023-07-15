const express = require('express');
const router = express.Router();
const { fetchPersonData, fetchRolesData } = require('../models/personModel');

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const personData = await fetchPersonData(id);
    if (!personData) {
      return res.status(404).json({
        error: true,
        message: "No record exists of a person with this ID"
      });
    }

    const rolesData = await fetchRolesData(id);

    const person = {
      ...personData,
      roles: rolesData
    };

    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: 'Failed to fetch person data',
    });
  }
});

module.exports = router;
