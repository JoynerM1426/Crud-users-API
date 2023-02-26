const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const users = await User.findAll();
    return res.json(users)
});

const getOne =catchError(async (req, res) => {
  const {id} =req.params;
  const user = await User.findByPk(id);
  if(!user) return res.status(404).json({message:"User not found"})
  return res.json(user)
})

const create = catchError(async (req, res) => {
  const {first_name, last_name, email, password, birthday}= req.body;
  const userCreate = await User.create({ first_name, last_name, email, password, birthday})
    return res.status(201).json(userCreate)
});

const remove = catchError(async(req, res)=>{
  const {id}= req.params
  const userDelete = await User.destroy({where:{id}});
  if (userDelete === 0) return res.status(404).json({message:"Users not found"})
  return res.sendStatus(204)
});

const update = catchError(async(req, res) => {
  const {first_name, last_name, email, password, birthday}= req.body;
  const {id} = req.params
  const userUpdate = await User.update({first_name, last_name, email, password, birthday}, {where : {id}, returning:true})
  return res.json(userUpdate[1][0])
})

module.exports = {
    getAll,
    create,
    remove,
    update,
    getOne
}