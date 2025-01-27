const express = require('express');
router = express.Router();

const User = require('../models/user.js');

//router logic will go here
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      pantry: currentUser.pantry,
    });
  } catch(err) {
    console.log(err);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch(err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);

    res.render('foods/show.ejs', {
      food: food,
    });
  } catch(err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);

    res.render('foods/edit.ejs', {
      food: food,
    });
  } catch(err) {
    console.log(err);
    res.redirect('/');
  }
});

router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.foodId).deleteOne();
    currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.put('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    food.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods/${req.params.foodId}`);
  } catch(err) {
    console.log(err);
    res.redirect('/');
  }
});


module.exports = router;