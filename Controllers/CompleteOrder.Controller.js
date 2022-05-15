const CompleteOrderModel = require('../models/completeOrdersModel')
const OrderModel = require("../models/OrderModel.js");
const _ = require('underscore-contrib');
const {indexBy} = require("underscore");

const completeOrder = async (req, res) => {
    const completionData = new CompleteOrderModel(req.body)
    console.log(completionData)
    await completionData.save()
        .then(data => {
            res.send("inserted successfully")
        })
        .catch(error => {
            res.send(error)
        })
}

const getMyCompletes = async (req, res) => {
    try {
        const id = req.params.id
        const orders = await CompleteOrderModel.find({riders: id}).populate('riders', 'riderName')
        const sortedData = orders.sort(
            (a, b) => b.createdAt - a.createdAt
        )
        res.send(sortedData)
    } catch (error) {
        res.status(500).send({error: error.message})
    }

}

const getAllCompletes = async (req, res) => {
    try {
        const id = req.params.id
        const orders = await CompleteOrderModel.find({}).populate('riders', 'riderName')
        const sortedData = orders.sort(
            (a, b) => b.createdAt - a.createdAt
        )
        res.send(sortedData)
    } catch (error) {
        res.status(500).send({error: error.message})
    }

}

const getById = async (req, res) => {
    try {
        const date = req.params.id
       // console.log(date)

        if(date=='p'){
            const orders = await CompleteOrderModel.find({}).populate('riders', 'riderName')
            const sortedData = orders.sort(
                (a, b) => b.createdAt - a.createdAt
            )

            res.send(sortedData)
        }else{
            const orders = await CompleteOrderModel.find({DeliveryDate: date}).populate('riders', 'riderName')
            const sortedData = orders.sort(
                (a, b) => b.createdAt - a.createdAt
            )

            res.send(sortedData)

        }


    } catch (error) {
        res.status(500).send({error: error.message})
    }
}


//count order by month

const getCountByMonth = async (req, res) => {
    try {
        let dataMonth = []
        let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        let index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        let monthWord = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const all = _.zip(month, monthWord, index)
      const year=  new Date().getFullYear()

        _.each(all, async function (element, index, list) {

            const count = await CompleteOrderModel.countDocuments({DeliveryDate: {$regex: ".*" + year+'-' + element[0] + ".*"}})
           // console.log(count)
            let monthData = {
                label: element[1],
                value: count,
                index: element[2]
            }

            dataMonth.push(monthData)
           // console.log(element[2])

        })


        dataMonth.sort(function (x, y) {
            return x.index - y.index;
        });


        console.log(dataMonth)

        // dataMonth.map((label)=>{
        //     console.log(label)
        // })
        //
        //
        // _.each(dataMonth,  function (element, index, list) {
        //
        //     console.log(dataMonth.label)
        // })


        //console.table(dataMonth);

        // function compare( a, b ) {
        //     if ( a.index < b.index ){
        //         return -1;
        //     }
        //     if ( a.index > b.index ){
        //         return 1;
        //     }
        //     return 0;
        // }
        //
        // dataMonth.sort( compare );


        setTimeout(() => {
            res.send(dataMonth)

        }, 2000)



    } catch (error) {
        res.status(500).send({error: error.message})
    }
}


module.exports = {
    completeOrder,
    getMyCompletes,
    getAllCompletes,
    getById,
    getCountByMonth
}
