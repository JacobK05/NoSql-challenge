const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
// get all thoughts
async getThoughts(req, res){
  try{
    const thoughts = await Thought.find()
    res.json(thoughts)
  }catch (err){
    console.log(err)
    res.status(500).json(err)
  }
},
//get a single thought
async getSingleThought(req, res){
  try{ 
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')

  if (!thought){
    return res.status(404).json({ message: 'no thought with this id'})
  }

  res.json(thought)
  }catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
},
// create a new thought 
async createThought(req, res){
  try{
    const thought = await Thought.create(req.body)

    const user = await User.findOneAndUpdate(
      {_id: req.body.userId},
      {$push: { thoughts: thought.Id}},
      {new: true}
    )
    res.json(thought)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
},
// update a thought 
async updateThought (req, res) {
  try{ 
    const thought = await Thought.findOneAndUpdate(
      {_id: req.body.thoughtId},
      {$set: req.body},
      { runValidators: true, new: true }
    )
  if (!thought){
    return res.status(404).json({message: 'no thought with this id'})
  }

res.json('thought deleted')
  }catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
},
// delete a thought
async deleteThought(req, res){
  try{
  const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});

  if(!thought){
    return res.status(404).json({ message: 'no thought with this id'})
  }
  res.json(thought)
  }catch (err){
    console.log(err)
    return res.status(500).json(err)
  }
},

async createReaction(req, res) {
  try {
      const thought = await Thought.findOne({_id: req.params.thoughtId})


      res.json();
  } catch (err) {
      res.status(500).json(err);
  }
},

// Method to delete a reaction from a specific thought
async deleteReaction(req, res) {
  try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});

      res.status(200).json();
  } catch (err) {
      res.status(500).json(err);
  }
}

}