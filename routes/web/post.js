var express = require('express');
var ensureAuthenticated = require('../../auth/auth').ensureAuthenticated;
var Post = require("../../models/post");
var User = require("../../models/user");
var router = express.Router();
router.use(ensureAuthenticated);

router.get("/" ,function (req, res) {
    Post.find({}).exec(function(err, posts){
        if(err){
            console.log(err);
            req.flash("error", err);
        }
        res.render("post/posts", {posts: posts}
    )});
});


router.get("/add", function (req, res){
    res.render("post/addpost");
});
router.post("/add", function(req, res){
    var newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        userID: req.user._id
    });

    newPost.save(function(err, post){
        if(err){
            req.flash("error", err);
            console.group(err);
        }
        res.redirect("/posts");

    });
});

router.get("/:postId", function(req, res){
    Post.findById(req.params.postId).exec(function(err, post){
        res.render("post/detailpost",{post: post});
    });
});

router.get("/edit/:postId", function(req, res){
    Post.findById(req.params.postId).exec(function(err, post){
        res.render("post/editpost",{post: post});
    });
});


router.post("/update", async function(req, res){
    const post = await Post.findById(req.body.postid);
    post.tilte = req.body.title;
    post.content = req.body.content;
    try {
        let savepost = await post.save();
        console.log("savepost", savepost);
        res.redirect("/posts/" + req.body.postid);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }


});




module.exports = router;