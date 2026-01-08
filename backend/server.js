const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const seedAdmin = require('./utils/seeder');
const seedData = require('./utils/dataSeeder');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
// app.use(helmet());
// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/diagnosis', require('./routes/diagnosisRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect to database and seed admin/data
// Connect to database and seed admin/data
connectDB().then(async () => {
    // Only seed if not already seeded (optional optimization, but keep simple for now)
    await seedAdmin();
    await seedData();

    // Vercel requires exporting the app, not just listening
    // Only listen if run directly (local dev)
    if (require.main === module) {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
}).catch(err => {
    console.error('Failed to connect to Database.', err);
});

module.exports = app;
