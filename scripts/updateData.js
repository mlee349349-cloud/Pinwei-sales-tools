/**
 * Update Data Script
 * 
 * This script merges imported Excel data with existing data.js
 * and updates the main data.js file used by the website.
 */

const fs = require('fs');
const path = require('path');

const IMPORTED_DATA_FILE = path.join(__dirname, '..', 'data-imported.js');
const MAIN_DATA_FILE = path.join(__dirname, '..', 'data.js');
const BACKUP_DATA_FILE = path.join(__dirname, '..', 'data-backup.js');

function updateData() {
    console.log('Updating data from Excel import...');

    // Check if imported data exists
    if (!fs.existsSync(IMPORTED_DATA_FILE)) {
        console.error(`Error: Imported data file not found: ${IMPORTED_DATA_FILE}`);
        console.log('Please run "npm run import-excel" first.');
        process.exit(1);
    }

    // Backup existing data
    if (fs.existsSync(MAIN_DATA_FILE)) {
        const existingData = fs.readFileSync(MAIN_DATA_FILE, 'utf8');
        fs.writeFileSync(BACKUP_DATA_FILE, existingData, 'utf8');
        console.log(`Backed up existing data to: ${BACKUP_DATA_FILE}`);
    }

    // Read imported data
    let importedDataContent = fs.readFileSync(IMPORTED_DATA_FILE, 'utf8');
    
    // Update the timestamp in the imported data
    const timestamp = new Date().toISOString();
    importedDataContent = importedDataContent.replace(
        /\/\/ Last updated: [^\n]*/,
        `// Last updated: ${timestamp}`
    );

    // Write to main data file (replace existing)
    fs.writeFileSync(MAIN_DATA_FILE, importedDataContent, 'utf8');
    console.log(`Updated ${MAIN_DATA_FILE} with imported data`);
    console.log('Data update completed successfully!');
}

// Run if called directly
if (require.main === module) {
    try {
        updateData();
    } catch (error) {
        console.error('Error during data update:', error);
        process.exit(1);
    }
}

module.exports = { updateData };

