import expressAsyncHandler from "express-async-handler";
import ProductModel from "../models/productModel.js";

// @route : /api/products

export const getProductsController = expressAsyncHandler(async (req, res) => {
  // throw new Error("sdoihj");
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await ProductModel.estimatedDocumentCount({ ...keyword });
  // limit gives the only needed number  of things to be returned
  // skip() method will skip the first n document from the query result, you just need to pass the number of records/documents to be skipped.
  // so here we are skipping the number of items  we get in a single page render by mulltiplying with the page number so .. if we are  in page 3 we will skip[ 3 * 3-1 ite.. first 6 items ]
  // very veryu smart ,function
  const products = await ProductModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //{ will find every thing}
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export const getProductsbyIdController = expressAsyncHandler(
  async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
      // console.log(product);
    } else {
      res.status(404).json({ msg: "product not found" });
    }
  }
);

export const deleteProductbyId = expressAsyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export const createProduct = expressAsyncHandler(async (req, res) => {
  // creates a sample product first and gets it to edit laeter to update
  const product = new ProductModel({
    name: "name",
    price: 0,
    user: req.user._id,
    image: "/images/camera.jpg",
    brand: "brand",
    category: "category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const newProduct = await product.save();
  res.status(200).json(newProduct);
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await ProductModel.findById(req.params.id);

  if (product) {
    // to check if the user has already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    // r is the referenced user object from the  product review schema
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    // pretty good intellect

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export const getTopProducts = expressAsyncHandler(async (req, res) => {
  const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3);
  // -1 m,eans ascending
  res.json(products);
});
