const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const referralRoutes = require('./routes/referralRoutes');
const prisma = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Use Helmet to set security-related HTTP headers, including CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'"],
        // Add other directives as needed
      },
    },
  })
);

// Routes
app.use('/api', referralRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const express = require('express');
// const cors = require('cors');
// const referralRoutes = require('./routes/referralRoutes');
// const prisma = require('./database');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self'");
//   next();
// });

// // Routes
// app.use('/api', referralRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
