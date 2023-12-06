const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post("/", auth,async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", auth,async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!updatedCustomer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(updatedCustomer);
});

router.delete("/:id",auth, async (req, res) => {
  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

  if (!deletedCustomer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(deletedCustomer);
});

router.get("/:id",auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-__v");

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
