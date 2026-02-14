/**
 * API configuration - reads base URL from environment variable.
 * Change the URL in .env file (REACT_APP_API_BASE_URL) to point to a different server.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default API_BASE_URL;
