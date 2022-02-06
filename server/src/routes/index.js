const express = require('express');

const router = express.Router();

// Controller
const { register, login, checkAuth } = require('../controllers/auth');
const { getUsers,getUser, updateUser, deleteUser, follower, following, getUsersbyId, getFollowingCount, getFollowerCount, getUserFeedbyId, addFollow } = require('../controllers/user');
const { getFeed, addFeed, getFeedByFollow, addLike, addComment, getComment, getFeedbyId, getFeedCommentbyId, getCommentByUserFeed, getCommentFeed, getLikeFeedId, getCommentId, getLikeAll } = require('../controllers/feed');
const { addMessage, getMessage, getMessagebyIdUser, getMessagebyIdUserDua  } = require('../controllers/message');

// Middleware
const { auth } = require('../middlewares/auth');
// import middleware here
const { uploadFile } = require('../middlewares/uploadFile');
const message = require('../../models/message');

// Route
router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, checkAuth);


router.get('/users', getUsers);
router.patch('/user/:id', uploadFile('image'), updateUser);
router.delete('/user/:id', auth, deleteUser);
router.get('/user/:id', getUser);
router.get('/users/:id', getUsersbyId);

router.post('/follow/:id', auth, addFollow);
router.get('/follower/:id', auth, follower);
router.get('/follower-count/:id', auth, getFollowerCount);
router.get('/following/:id', auth, following);
router.get('/following-count/:id', auth, getFollowingCount);

router.get('/feeds', auth, getFeed);
router.post('/feed', auth, uploadFile('image'), addFeed);
router.get('/feed/:id', auth, getFeedByFollow);
router.get('/feeds/:id', getFeedbyId);
router.get('/feeds-user/:id', getUserFeedbyId);
router.get('/feeds-comment/:id', getFeedCommentbyId);

router.get('/feeds-user-comment/:id', getCommentByUserFeed);
router.get('/comment-user', getCommentFeed);
router.get('/comment/:id', getCommentId);

router.post('/like/:id', auth, addLike);
router.get('/like', auth, getLikeAll);
router.get('/like/:id', auth, getLikeFeedId);
router.post('/comment', auth, addComment);

router.get('/comment/:id', auth, getComment);

router.post('/message/:id', auth, addMessage);
router.get('/message-user/:id', auth, getMessage);
router.get('/message/:id', getMessagebyIdUser);
router.get('/message-dua/:id', getMessagebyIdUserDua);

module.exports = router;