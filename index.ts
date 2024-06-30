import express from 'express';
import bodyParser from 'body-parser';

type Flight = [string, string];

// Function to find the flight path
function findFlightPath([origin, destination]: [string, string], flights: Flight[]): string[] | null {
  function backtrack(current: string, path: string[]): string[] | null {
    if (current === destination) {
      return path;
    }

    for (let i = 0; i < flights.length; i++) {
      const [src, dest] = flights[i];
      if (src === current) {
        const remainingFlights = flights.slice(0, i).concat(flights.slice(i + 1));
        const result = backtrack(dest, path.concat(dest));
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  return backtrack(origin, [origin]);
}

// Create an Express application
const app = express();
const port = 8080;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the /calculate endpoint
app.post('/calculate', (req, res) => {
    console.log("Hello World");
  const { origin, destination, flights }: { origin: string, destination: string, flights: Flight[] } = req.body;
  if (!origin || !destination || !Array.isArray(flights)) {
    return res.status(400).json({ error: 'Invalid input format' });
  }

  const flightPath = findFlightPath([origin, destination], flights);
  if (flightPath) {
    res.json({ flightPath });
  } else {
    res.status(404).json({ error: 'No valid flight path found' });
  }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});