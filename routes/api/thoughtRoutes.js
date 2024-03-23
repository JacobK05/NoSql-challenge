const router = require('express').Router()

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController')
// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// router.route("/:thoughtId/reactions");
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(createReaction);
module.exports = router;