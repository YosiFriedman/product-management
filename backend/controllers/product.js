const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const product = await new Product(req.body);
    product.save();
    res.json(product);
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.update = async (req, res) => {
 
  try {
    const updated = await Product.findByIdAndUpdate(
     req.params.id,{
       name:req.body.name,
       description:req.body.description,
       price:req.body.price
     },
     
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(deleted);
  } catch (err) {
    res.status(400).send("there is a problem with your request");
  }
};
exports.list = async (req, res) => {
  res.json(await Product.find({}).sort({}).sort({ createdAt: -1 }).exec());
};
exports.read = async(req, res) => {
  try{
    const product = await Product.findOne({_id: req.params.id})
    res.json(product)
  } catch (err){
    res.status(400).send("read failed");
  }

}