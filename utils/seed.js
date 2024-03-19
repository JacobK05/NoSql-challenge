const connection = require('../config/connection')
const { User, Thoughts} = require('../models')

const { getRandomUser, getRandomAssignments, getRandomArrItem } = require('./data')

console.time('seeding')


connection.once('open', async() => {
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray()
    if (userCheck.length){
        await connection.dropCollection('users')
    }
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }
  
    // Empty arrays for randomly generated posts and tags
    const thoughts = [];
    const users = [];
  
    // Function to make a post object and push it into the posts array
    const makeUser = (text) => {
      users.push({
        published: Math.random() < 0.5,
        text,
        thoughts: [thoughts[getRandomArrItem(thoughts)]._id],
      });
    };
  
    // Create 20 random tags and push them into the tags array
    for (let i = 0; i < 20; i++) {
      const thoughtText = getRandomAssignments();
  
      thoughts.push({
        thoughtText,
        text: thoughtText
      });
    }
  
    // Wait for the tags to be inserted into the database
    await Thoughts.collection.insertMany(thoughts);
  
    // For each of the tags that exist, make a random post of length 50
    thoughts.forEach(() => makePost(getRandomUser(50)));
  
    // Wait for the posts array to be inserted into the database
    await User.collection.insertMany(users);
  
    // Log out a pretty table for tags and posts, excluding the excessively long text property
    console.table(thoughts);
    console.table(users, ['published', 'thoughts', '_id']);
    console.timeEnd('seeding');
    process.exit(0);
  });