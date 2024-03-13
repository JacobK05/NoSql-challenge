const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models')

const userCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  }
  
  const thoughts = async (userId) => {
    return User.aggregate([
      { $match: { _id: new ObjectId(userId) } },
      { $unwind: '$thoughts' },
      { 
        $group: { 
          _id: '$_id',
          thoughts: { $sum: 1 } 
        } 
      }
    ]);
  };


module.exports = {
// Get all users
async getUsers (req, res) {
  try{
    const users = await User.find();
    
    const userObj = {
        users,
        userCount: await userCount()
    };
    res.json(userObj);
  }catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
},
// get single user
async singleUser(req, res) {
  try{
    const user = await User.findOne({_id: req.params.userId})
      .select('-__v')
    if(!user){
        return res.status(404).json({ message: ' No user found'})
    }
    res.json({
      user,
      thoughts: await thoughts(req.params.userId)
    });
  } catch (err) {
    console.log(err)
   return res.status(500).json(err)
  }
},
// create a user
async createUser(req, res) {
  try{
    const user = await User.create(req.body);
    res.json(user)
  }catch (err) {
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
    if(!thought){
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



}
