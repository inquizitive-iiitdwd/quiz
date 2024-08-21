// Import database client configuration
import client from '../config.js';

// Service function to create an event in the database
export const createEvent = async (organizerId, eventData) => {
  const { name, description, location, date, available_tickets, price } = eventData;
  // Insert event data into the events table and return the created event
  const existingUser = await client.query('SELECT * FROM events WHERE name = $1', [name]);
  if (existingUser.rows.length > 0) {
    throw new Error('Events already exists');
  }
  //organizer id is not working I will do it later
  const result = await client.query(
    'INSERT INTO events (organizer_id, name, description, location, date, available_tickets, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [organizerId, name, description, location, date, available_tickets, price]
  );
  return result.rows[0]; // Return the created event
};

export const list_of_all_events=async ()=>{
  const result = await client.query('SELECT * FROM events ');
  return result.rows; // Return the list of events
}

// Service function to list events from the database with filters and pagination
export const listEvents = async (filters) => {
 // const offset = (page - 1) * limit; // Calculate the offset for pagination
  const query = 'SELECT * FROM events WHERE location = $1 ';
  // Query events with the specified location and pagination
  const result = await client.query(query, [filters.place]);
  return result.rows; // Return the list of events
};


// Service function to get details of a specific event by its ID
export const getEventDetails = async (id) => {
  // Query event details from the events table
  const result = await client.query('SELECT * FROM events WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new Error('Event not found'); // Throw error if event is not found
  }
  return result.rows[0]; // Return the event details
};
