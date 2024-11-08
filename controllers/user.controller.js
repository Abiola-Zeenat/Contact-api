import User from "../models/user.model.js";

/**
 * @desc Get all users
 * @Route GET /api/users
 * @Access Public
 */

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "All Users Retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Get a user
 * @Route GET /api/users/:id
 * @Access Public
 */

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    res.status(200).json({
      success: true,
      message: "User Retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Create a user
 * @Route POST /api/users/register
 * @Access Public
 */

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, email and password are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "user already exist",
      });
    }
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Login a user
 * @Route POST /api/users/login
 * @Access Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Update a user
 * @Route PUT /api/users/:id
 * @Access Public
 */

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, req.body, { new: true });

    const updatedUser = await User.findById(id).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Delete a user
 * @Route DELETE /api/users/:id
 * @Access Public
 */

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }
    res.status(201).json({
      success: true,
      message: "User Deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { getUsers, getUser, registerUser, loginUser, updateUser, deleteUser };