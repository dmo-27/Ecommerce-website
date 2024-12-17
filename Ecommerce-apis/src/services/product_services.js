const { query } = require("express");
const Category = require("../models/category_model");
const Product = require("../models/product_model");

async function createProduct(reqData) {
  console.log(reqData);
  try {
    // Find or create the top-level category
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevelCategory,
        level: 1,
      });
      await topLevel.save();
    }
    console.log("Top Level Category:", topLevel);

    // Find or create the second-level category
    let secondLevel = await Category.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });
    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
      await secondLevel.save();
    }
    console.log("Second Level Category:", secondLevel);

    // Find or create the third-level category
    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });
    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
      await thirdLevel.save();
    }
    console.log("Third Level Category:", thirdLevel);

    // Create and save the product
    const product = new Product({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountPrice: reqData.discountPrice,
      discountPercent: reqData.discountPercent,
      imageurl: reqData.imageurl,
      price: reqData.price,
      brand: reqData.brand,
      sizes: reqData.sizes,
      quantity: reqData.quantity,
      category: thirdLevel._id,
    });

    const savedProduct = await product.save();
    console.log("Product Created:", savedProduct);

    return savedProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error(`Error creating product: ${error.message}`);
  }
}


async function deleteProduct(productId) {
  const product = await findProductById(productId);
  console.log(product);
  await Product.findByIdAndDelete(product);
  return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updatedProduct.save();
}

async function findProductById(productId) {
  const product = await Product.findById(productId).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id:", productId);
  }

  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

 console.log("Received query:", reqQuery);

  // Set default values
  pageSize = pageSize ? parseInt(pageSize, 10) : 10;
  pageNumber = pageNumber ? parseInt(pageNumber, 10) : 1;
  minPrice = minPrice ? parseFloat(minPrice) : undefined;
  maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
  minDiscount = minDiscount ? parseFloat(minDiscount) : undefined;

    console.log("Parsed Values:");
    console.log("  pageNumber:", pageNumber);
    console.log("  pageSize:", pageSize);
    console.log("  minPrice:", minPrice);
    console.log("  maxPrice:", maxPrice);
    console.log("  minDiscount:", minDiscount);


  // Set default values
  pageSize = pageSize || 10;
  pageNumber = pageNumber || 1;

  // Initialize query
  let query = Product.find();
  const allCategories = await Category.find({}, "name");
  console.log(
    "All categories:",
    allCategories.map((c) => c.name)
  );

  // Filter by category
  if (category) {
    const existCategory = await Category.findOne({ name: category });
    console.log("Category found:", existCategory);
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  // Filter by color
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    if (colorRegex) {
      query = query.where("color").regex(colorRegex);
    }
  }

  // Filter by sizes
  if (sizes) {
    const sizeSet = new Set(sizes.split(",").map((size) => size.trim()));
    query = query.where("sizes.name").in([...sizeSet]);
  }

  // Filter by price range
  if (minPrice && maxPrice) {
    query = query.where("discountPrice").gte(minPrice).lte(maxPrice);
  }

  // Filter by minimum discount
  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  // Filter by stock status
  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "out_of_stock") {
      query = query.where("quantity").lt(1);
    }
  }

  // Sorting
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountPrice: sortDirection });
  }

  // Count total products
  const totalProducts = await Product.countDocuments(query);

  // Pagination
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  // Fetch products
  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
}
async function createMultipleProduct(products){
  for (let product of products){
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct
};
