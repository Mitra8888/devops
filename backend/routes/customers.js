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

router.get('/:id/tasks', async (req, res)=>{
    try {
        const customer = await Customer.findById( req.params.id);
        if (!customer) return res.status(404).json ({ message: 'Customer not found'});
        res.json(customer.tasks);
    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
})

router.post ('/:id/tasks', async (req, res)=>{
    try{
        const { name } = req.body;
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found'});
        const newTask  = {id: customer.tasks.length, name};
        customer.tasks.push(newTask);
        await customer.save();
        res.json(customer.tasks);
    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
})

router.delete('/:id/tasks/:taskId', async (req, res)=>{
    try{
        const {id, taskId} = req.params;
        const customer = await Customer.findById(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found'});

        customer.tasks = customer.tasks.filter(task => task.id != taskId);
        await customer.save();
        res.json(customer.tasls);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
})

module.exports = router;
