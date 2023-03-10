const User = require('../models/user');
const { Order } = require('../models/order');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found In DB"
            });
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    //To Do : get here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)
}

exports.getallUser = async (req, res) => {
    let alluser = await User.find({});
    res.json(alluser);
}

exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorize to update this user"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            return res.json(user)

        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order in this account"
                })
            }
            return res.json(order);

        })

}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    // store this is in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save PurchaseList"
                });
            }
            next();
        }
    )
}