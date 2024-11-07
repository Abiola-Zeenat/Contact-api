import Contact from "../models/contacts.model.js";

/**
 * @desc Get all contacts
 * @Route GET /api/contacts
 * @Access Public
 */

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      success: true,
      message: "All contacts Retrieved",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * @desc Get a contact
 * @Route GET /api/contacts/:id
 * @Access Public
 */

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `The contact with id of ${id} was not found` });
    }

    res.status(200).json({
      success: true,
      message: "Contact Retrieved successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Create a contact
 * @Route POST /api/contacts
 * @Access Public
 */

const createContact = async (req, res) => {
  try {
    const { name, email, type } = req.body;

    if (!name || !email || !type) {
      return res.status(400).json({
        success: false,
        message: "name, email and type are required",
      });
    }
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Contact Created Successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Update a contact
 * @Route PUT /api/contacts/:id
 * @Access Public
 */

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `The contact with id of ${id} was not found` });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Contact Updated Successfully",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Delete a contact
 * @Route DELETE /api/contacts/:id
 * @Access Public
 */

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `The contact with id of ${id} was not found` });
    }

    await Contact.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Deleted",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { getContacts, getContact, createContact, updateContact, deleteContact };
