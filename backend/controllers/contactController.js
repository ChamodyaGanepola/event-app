import Contact from "../models/contact.model.js";

// Get all contact messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error in Get Contacts:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new contact message
export const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message submitted successfully" });
  } catch (error) {
    console.error("Error in Create Contact:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a single contact message by ID
export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findOne({ contactId });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact message not found" });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Error in Get Contact by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a contact message
export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await Contact.findOneAndDelete({ contactId });

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Contact message not found" });
    }

    res.status(200).json({ success: true, message: "Contact message deleted successfully" });
  } catch (error) {
    console.error("Error in Delete Contact:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
