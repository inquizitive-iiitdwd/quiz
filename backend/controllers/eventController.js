// Import necessary functions from the eventService module
import { createEvent, listEvents, getEventDetails,list_of_all_events } from '../services/eventService.js';

// Controller function to handle the creation of an event
export const create = async (req, res) => {
  try {
    const organizerId = req.user.id; // Get the organizer ID from the authenticated user
    console.log(req.user)
    const eventData = req.body; // Get event data from the request body
    const event = await createEvent(organizerId, eventData); // Create the event
    res.status(201).json({ message: 'Event created successfully.', event }); // Respond with success message and event data
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error message if creation fails
  }
};

export const listofallevents = async (req, res) => {
  try {
    const events = await list_of_all_events(); // Retrieve events based on filters, pagination
    res.status(200).json({ events }); // Respond with the list of events
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error message if listing fails
  }
};


// Controller function to list all events with optional filters and pagination
export const list = async (req, res) => {
  try {
    const filters = req.query; // Get filters from query parameters
    //const page = parseInt(req.query.page) || 1; // Get page number, default to 1
    //const limit = parseInt(req.query.limit) || 1; // Get limit of items per page, default to 10
    const events = await listEvents(filters); // Retrieve events based on filters, pagination
    res.status(200).json({ events }); // Respond with the list of events
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error message if listing fails
  }
};

// Controller function to get the details of a specific event by its ID
export const getDetails = async (req, res) => {
  try {
    const id = req.params.id; // Get event ID from route parameters
    const event = await getEventDetails(id); // Retrieve event details
    res.status(200).json({ event }); // Respond with event details
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error message if retrieval fails
  }
};
console.log("mahesh")
//ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAII8HpMHyEjOI/mVbZ2/yV8RXVniBrYTVcqQ8TRAjnz7I inquizitive@iiitdwd.ac.in

