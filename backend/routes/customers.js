const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET: list
router.get ('/', async (req, res) => {
    try{
        const customers = await Customer.find();
        res.status(200).json(customers);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
    
});

// GET: got by id
router.get ('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const customers = await Customer.findOne({_id: id});
        res.status(200).json(customers);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
    
});

// POST: create
router.post('/', async (req, res) => {
    try{
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(200).json(savedCustomer);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
});

// PUT: update
router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const customer = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
);

        res.status(200).json(updatedCustomer);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
});

// DELETE: delete
router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        let deletedCustomer = await Customer.deleteOne({_id: id});
        res.status(200).json(deletedCustomer);
    }
    catch (err){
        res.status(500).json({message:"Server Error"});
    }
});

module.exports = router;
