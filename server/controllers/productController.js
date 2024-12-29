// controllers/productController.js

const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const {
    name,
    description,
    pricePerHour,
    oldPrice,
    category,
    availableTimes,
    occupiedTimes,
    extraHelperPrice,
    imageUrl,
  } = req.body;

  try {
    // Check for required fields
    if (
      !name ||
      !description ||
      !pricePerHour ||
      !oldPrice ||
      !category ||
      !availableTimes ||
      !occupiedTimes ||
      !extraHelperPrice
    ) {
      return res
        .status(400)
        .json({ error: "Name, description, and price are required." });
    }

    // Create new product instance
    const product = new Product({
      name,
      description,
      pricePerHour,
      oldPrice,
      category,
      availableTimes,
      occupiedTimes,
      extraHelperPrice,
      imageUrl,
    });

    // Validate the product against the schema
    await product.validate();

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    console.error("Error creating product:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Product validation failed !",
      });
    }

    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const getAllProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category,
    minPrice,
    maxPrice,
  } = req.query;

  try {
    // Parse page and limit to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Handle invalid page or limit
    if (pageNumber < 1 || limitNumber < 1) {
      return res
        .status(400)
        .json({ error: "Page and limit must be greater than 0." });
    }

    // Apply search and filter
    const filterQuery = applySearchAndFilters(
      search,
      category,
      minPrice,
      maxPrice
    );

    // Get products with pagination and filters
    const products = await Product.find(filterQuery)
      .sort({ createdAt: -1 }) // Sort by creation date, most recent first
      .skip((pageNumber - 1) * limitNumber) // Skip based on page
      .limit(limitNumber) // Limit based on the requested limit
      .exec();

    // Add the `disabled` field to availableTimes
    const updatedProducts = products.map((product) => {
      const { availableTimes, occupiedTimes } = product;

      const updatedAvailableTimes = (availableTimes || []).map((time) => {
        const isDisabled = (occupiedTimes || []).some((occupied) => {
          // Ensure all comparisons are string-based for consistent matching
          return occupied.start === time.start && occupied.end === time.end;
        });

        return {
          _id: time._id,
          start: time.start,
          end: time.end,
          disabled: isDisabled,
        };
      });

      return {
        ...product.toObject(),
        availableTimes: updatedAvailableTimes,
      };
    });

    // Get the total count of products matching the filters
    const totalProducts = await Product.countDocuments(filterQuery);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limitNumber);

    // Return paginated products
    res.status(200).json({
      products: updatedProducts,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    description,
    pricePerHour,
    availableTimes,
    occupiedTimes,
    imageUrl,
  } = req.body;

  try {
    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        pricePerHour,
        availableTimes,
        occupiedTimes,
        imageUrl,
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully!", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const applySearchAndFilters = (search, category, minPrice, maxPrice) => {
  // Start with an empty query
  let filterQuery = {};

  // Apply search query if provided
  if (search) {
    filterQuery.$or = [
      { name: { $regex: search, $options: "i" } }, // Case-insensitive search on name
      { description: { $regex: search, $options: "i" } }, // Case-insensitive search on description
    ];
  }

  if (category) {
    filterQuery.$or = [{ category: { $regex: category, $options: "i" } }];
  }

  // Apply price filters if provided
  if (minPrice || maxPrice) {
    filterQuery.pricePerHour = {};
    if (minPrice) filterQuery.pricePerHour.$gte = parseFloat(minPrice);
    if (maxPrice) filterQuery.pricePerHour.$lte = parseFloat(maxPrice);
  }

  return filterQuery;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

// const filterProducts = async (req, res) => {
//   const { minPrice, maxPrice, availability } = req.query;

//   try {
//     const filter = {};

//     // Filter by price range
//     if (minPrice || maxPrice) {
//       filter.pricePerHour = {};
//       if (minPrice) filter.pricePerHour.$gte = parseFloat(minPrice);
//       if (maxPrice) filter.pricePerHour.$lte = parseFloat(maxPrice);
//     }

//     // Filter by availability
//     if (availability !== undefined) {
//       filter.availability = availability === "true";
//     }

//     const products = await Product.find(filter);

//     if (!products.length) {
//       return res
//         .status(404)
//         .json({ message: "No products found based on the filter." });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error filtering products:", error);
//     res
//       .status(500)
//       .json({ error: "Internal server error. Please try again later." });
//   }
// };

// const searchProducts = async (req, res) => {
//   const { keyword } = req.query;

//   if (!keyword) {
//     return res.status(400).json({ error: "Keyword is required" });
//   }

//   try {
//     const db = getDB();
//     const products = db.collection("products");

//     const results = await products
//       .find({
//         $or: [
//           { name: { $regex: keyword, $options: "i" } },
//           { description: { $regex: keyword, $options: "i" } },
//         ],
//       })
//       .toArray();

//     res.status(200).json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to search products" });
//   }
// };
