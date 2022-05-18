const express = require('express')
const path = require('path')
const people = require('./data')
// console.log(people)

const app = express()

app.get('/people', (req,res)=>{
    res.status(200).send(people)
})

//REQ.PARAMS
app.get('/person/:id', (req,res) =>{
    const id = req.params.id
    // const onePerson = people.map((person) =>{
    //     person.id == id
    //     return person
    // })
    // res.status(200).send(onePerson)

    const onePerson = people.find((person) => person.id == id)
    if(!onePerson) return res.status(401).send(`this person with id ${id} does not exist`)
    res.status(200).send(onePerson)
})

//REQ.QUERY
app.get('/people/query', (req,res) => {
    const {name,limit} = req.query

   
    let result = people.filter((person) => person.name.includes(name))
    
    // const result = people.filter((person) => person.name == name) //exact match
    //  const result = people.filter((person) => person.name.startsWith(name))

    result= result.slice(0, Number(limit))
    // if(!result) return res.status(401).send(`no item matched your search`)
    res.status(200).send({success: true, data: result, totalDoc: result.length})
    
})

app.listen(5000, () =>{
    console.log(`server is listening on 5000`)
})