// admin-script.js - Manages Admin Panel functionality and data storage

// Storage key to keep data even after page refresh
const STORAGE_KEY = "diabloshd_traders_list";

// Get existing data or create new structure if none exists
let tradersData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    sellers: [
        // Default entry (will be updated when new sellers are added)
