const express = require('express');
const router = express.Router();
const controller = require('../Controllers/CompleteOrder.Controller');

module.exports=function (){
    router.post('/create',controller.completeOrder)
    router.get('/all-orders/:id',controller.getMyCompletes)
    router.get('/all-orders/',controller.getAllCompletes)
    router.get('/by-date/:id',controller.getById)
    router.get('/by-month',controller.getCountByMonth)

    return router;
}