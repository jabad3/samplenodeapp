var Users = require("../models/UserModel");
var Repos = require("../models/SavedRepoModel");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var crypto = require("crypto");
var express = require("express");

//mongoose.Promise = global.Promise;

module.exports = function(app) {
    var router = express.Router();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', router);
    
    router.route('/auth')
    .post(function(req, res){
        if(!req.body.email || !req.body.password) { return res.status(400).json({error:"malformed body"}); }
        
        var email = req.body.email;
        var password = req.body.password;
        Users.findOne({email:email}, function(err, result){
            if(err) { res.status(500); res.json({error:"internal error"}); return; }
            if(result==null) { res.status(400); res.json({error:"could not authenticate"}); return; }

            var salt = result.salt;
            var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');            
            if( hash === result.hash ) {
                res.status(200); res.json({id:result._id, email:result.email});
            }
            else {
                res.status(401); res.json({error:"error"}); return;
            }
        });
    });
    
    router.route('/users')
    .post(function(req, res){
        if(!req.body.email || !req.body.password) { return res.status(400).json({error:"malformed body"}); }

        var email = req.body.email;
        var password = req.body.password;
        Users.findOne({email:email}, function(err, result){
            if(err) { res.status(500); res.json({message:'internal error'}); return; }
            if(result==null) {
                var salt = crypto.randomBytes(16).toString('hex');
                var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
                var newuser = new Users({email:email, salt:salt, hash:hash});
                newuser.save().then(function (userdata) {
                    var newuserrepos = new Repos({user:userdata._id,saved:[]});
                    newuserrepos.save().then(function(repodata){
                        res.status(200); res.json({id:userdata._id, email:userdata.email});
                    })
                });                
            }
            else {
                res.status(400); res.json({message:"duplicate user"}); return;
            }
        });
    });

    
    router.route('/repos/:uid')
    .get(function(req, res){
        Repos.findOne({user:req.params.uid}, function(err, result){
            if(err) { res.status(500); res.json({message:'internal error'}); return; }
            res.status(200); res.json(result.saved);
        });
    })
    .post(function(req, res){
        if(!req.body.repo_id || !req.body.full_name || !req.body.description || !req.body.more) { 
            return res.status(400).json({error:"malformed body"}); 
        }
        
        Repos.findOneAndUpdate(
                {user:req.params.uid},
                {$push: {saved: {   repo_id: req.body.repo_id,
                                    description: req.body.description,
                                    full_name: req.body.full_name,
                                    more: req.body.more, 
                                }
                        }},
                {safe: true, upsert: true, new : true},
                function(err, model) {
                    if(err) { res.status(500); res.json({message:"internal error"}); }
                    else { res.status(200); res.send(); }   
                }
            );
    });
    
    router.route('/repos/:uid/:rid')
    .delete(function(req, res){
        Repos.findOneAndUpdate(
                {user:  req.params.uid },
                {$pull: {saved: {repo_id: req.params.rid }
                        }},
                {safe: true, upsert: true, new : true},
                function(err, model) {
                    if(err) { res.status(500); res.send("internal error"); }
                    else { res.status(200); res.send(); }
                }
            );
    });
}