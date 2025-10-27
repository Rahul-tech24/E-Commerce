import redisClient from "../lib/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

const getAllProducts =  async (req, res) => {
    try {
         const products = await Product.find();
         res.status(200).json({ products });
    } catch (error) {
         res.status(500).json({ message: "Error retrieving products" });
    }

}
  const getFeaturedProducts = async (req, res) => {
      try {
          let featuredProducts = await redisClient.get('featuredProducts');
          if (featuredProducts) {
              return res.status(200).json(JSON.parse(featuredProducts));
          }
          featuredProducts = await Product.find({ isFeatured: true }).lean();
          if (!featuredProducts || featuredProducts.length === 0) {
              return res.status(200).json([]);
          }
          await redisClient.set('featuredProducts', JSON.stringify(featuredProducts), 'EX', 7 * 24 * 60 * 60);
          res.status(200).json(featuredProducts);
      } catch (error) {
          res.status(500).json({ message: "Error retrieving featured products" });
      }
  };

const getProductById = (req, res) => {
    const { id } = req.params;
    // Logic to get a product by ID
    res.status(200).json({ message: `Product with ID ${id} retrieved successfully` });
};
const createProduct = async (req, res) => {
   try {
       const { name, price, description, image, category } = req.body;

       let cloudinaryResponse = null;
       if (image) {
           cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'products' });
       }

       const product = await Product.create({
           name,
           price,
           description,
           image: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
           category,
       });
       res.status(201).json({ message: "Product created successfully", product });
   } catch (error) {
       res.status(500).json({ message: "Error creating product" });
   }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    let cloudinaryResponse = null;
    if (image) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'products' });
    }

    const product = await Product.findByIdAndUpdate(id, {
        name,
        price,
        description,
        image: cloudinaryResponse ? cloudinaryResponse.secure_url : null
    }, { new: true });

    res.status(200).json({ message: `Product with ID ${id} updated successfully`, product });
};
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    if (product.image) {
        const publicId = product.image.split('/').pop().split('.').shift();
        await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    res.status(200).json({ message: `Product with ID ${id} deleted successfully` });
};

const getRecommendedProducts = async (req, res) => {
    try {
        const recommendedProducts = await Product.aggregate([
            { $sample: { size: 5 } },
            { $project: {  _id: 1, name: 1, price: 1, description: 1, image: 1 } }
        ]);
        res.status(200).json(recommendedProducts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving recommended products" });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({ category: id }).lean();
        if (!products || products.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products by category" });
    }
};

const toggleFeaturedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.isFeatured = !product.isFeatured;
        await product.save();
        await updateFeaturedProductsCache();
        res.status(200).json({ message: `Product with ID ${id} updated successfully`, product });
    } catch (error) {
        res.status(500).json({ message: "Error toggling featured status" });
    }
};

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redisClient.set('featuredProducts', JSON.stringify(featuredProducts), 'EX', 7 * 24 * 60 * 60);    
    } catch (error) {
        console.error("Error updating featured products cache:", error);
    }
}

export { getAllProducts, createProduct, deleteProduct, getFeaturedProducts, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct };
