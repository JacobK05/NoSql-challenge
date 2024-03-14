const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models')



module.exports = {
// Get all users
async getUsers (req, res) {
  try{
    const users = await User.find();
    res.json(users);
  }catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
},
// get single user
async getSingleUser(req, res) {
  try{
    const user = await User.findOne({_id: req.params.userId})
      
    if(!user){
        return res.status(404).json({ message: ' No user found'})
    }
    res.json(user)
  } catch (err) {
    console.log(err)
   return res.status(500).json(err)
  }
},
// create a user

async createUser(req, res) {
  try {
  const user = await User.create(req.body);
  const thought = await Thought.findOneAndUpdate(
    {_id: req.body.userId},
    {$addToSet: {user: user._id}},
    {new: true}
  );
  if (!thought){
    return res.status(404).json({message: 'user created but has no thoughts'})
  }
  res.json('user created')
 } catch (err) {
  console.log(err)
  return res.status(500).json(err)
 }
},

async updateUser(req, res) {
  try{
    const user = await User.findOneAndUpdate(
      {_id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    if (!user){
      return res.status(404).json({ message: 'no user with this id'})
    }
    res.json(user)

  } catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
},

// deleting a user

async deleteUser(req, res){
  try{
    const user = await User.findOneAndRemove({_id: req.params.userId});

    if(!user){
      return res.status(404).json({message: 'no user found'})
    }
    const thoughts = await Thought.findOneAndUpdate(
      { users: req.params.userId },
      { $pull: { users: req.params.userId }},
      { new: true }
    );
    if(!thoughts){
        return res.status(404).json({
            message: ' user deleted but had no thoughts'
        });
    }
    res.json({ message: 'user successfully deleted'})
  } catch (err){
    console.log(err)
    res.status(500).json(err)
  }
},
// add a friend 
async addFriend(req, res) {
  try{
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: {friends: req.body } },
      { runValidators: true, new: true }
    );
    if (!user){
      return res.status(404).json({ message: 'no user with this id'})
    }
    res.json(user)
  } catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
}, 
// delete a friend 
async deleteFriend(req, res) {
  try{
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId},
      { $pull: { friends: {friendId: req.params.friendId}}},
      { runValidators: true, new: true }
    );
  if (!user) {
    return res.status(404).json({ message: 'no user with this id'})
  }

  res.json(user)
  } catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
 },
};
