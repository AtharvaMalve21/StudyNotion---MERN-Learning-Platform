import User from "../models/user.model.js";
import Category from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {

    // fetch and validate category details
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Both name and description are required.",
      });
    }

    // check for existing category
    const existing = await Category.findOne({
      name: name.trim().toLowerCase(),
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    // create new category
    const category = await Category.create({
      name: name.trim(),
      description: description.trim(),
    });

    return res.status(201).json({
      success: true,
      data: category,
      message: "New category added successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};

export const showAllCategory = async (req, res) => {
  try {
    const categoryDetails = await Category.find({}).populate("courses");
    return res.status(200).json({
      success: true,
      data: categoryDetails,
      message: "Category list fetched successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch categories. Please try again.",
    });
  }
};
