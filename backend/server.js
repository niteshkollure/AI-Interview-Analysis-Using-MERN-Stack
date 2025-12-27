const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const analysisRoutes = require('./routes/analysis');
const resumeRoutes = require('./routes/resume');

app.use('/api/analysis', analysisRoutes);
app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));