//object
// const obj= {
//     name:"angel",
//     profession:"teacher"
// }

//class
// class Citizens  {
//     constructor(name, profession, age){
//         this.name = name
//         this.profession = profession
//         this.age = age
//     }
// }
// const person = new Citizens('john Doe','Developer','40')
// const person1 = new Citizens('Sam Doe','frontend Developer','40')

// console.log(person)
// console.log(person1)

// //Array
// const animals = ['dog','cat','mouse']
// //let pets = animals.toString();

// const ani = animals.join(',');
// // console.log(pets)
// console.log(ani)

// const newArray = ani.split(',')
// console.log(newArray)

//Function Declaration
// hello('ij')
// function hello(name){
//     console.log(`Hi ${name}`)
// }
// hello('mfon')

//Function Expression

//Anonymous function
// (() =>{
//     console.log('hello world')
// })()//immediately invoked function expression
// !function(){
//     console.log('hi node!')
// }();

//Global Variable within Node
const direct = __dirname
const fileName = __filename
console.log(direct)
console.log(fileName)