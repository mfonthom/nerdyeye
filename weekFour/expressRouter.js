const express= require('express')
const people = require('../weekThree/data')
const router = express.Router()

router.get('/router', (req,res)=>{
    res.send(`hello from Express Router`)
})

router.get('/', (req,res)=>{
    res.status(200).send(`Welcome to CRUD api`)
})
 
//GET ALL (READ)
router.get('/all', (req,res) =>{
    res.status(200).json({
        success:true,
        msg:`you have gotten all data`,
        data:people
    })
})
// GET ONE (READ)
router.get('/one/:id', (req,res) =>{
    const id= req.params.id
    const onePerson = people.find((person) => person.id == id)
    res.status(200).json({
        success:true,
        msg:`you have gotten requested data`,
        data:onePerson
    })
})

//CREATE A RECORD (CREATE)
router.post('/add', (req,res) =>{
    const {id,name} = req.body
    const newPerson = people.push({id,name})
    res.status(201).json({
        success:true,
        msg:`you have added new data`,
        data:people
    })
})

//UPDATE AN EXISTING RECORD(UPDATE)
router.put('/edit/:id', (req,res)=>{
    const id = req.params.id
    const {name} = req.body
    let onePerson = people.find((person) => person.id ==id)
    const updatedPerson = onePerson.name = name
    res.status(200).json({
        success:true,
        msg:`you have successfully updated the data`,
        data:people
    })
})

//DELETE RECORD (DELETE)
router.delete('/remove/:id', (req,res) =>{
    const id = req.params.id
    const newPeople = people.filter((person) => person.id !== Number(id))

    console.log(newPeople)

    res.status(200).json({
        success:true,
        msg:`you have successfully deleted the data`,
        data:newPeople
    })
})


module.exports = router