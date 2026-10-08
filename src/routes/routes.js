import { Router } from 'express';
import { homePage, aboutPage, demoPage, testErrorPage } from '../controllers/index.js';
import { addDemoHeaders } from '../middleware/demo/headers.js';
import { facultyPage, facultyDetailPage } from '../controllers/faculty/faculty.js';
import { catalogPage, courseDetailPage } from '../controllers/catalog/catalog.js';

const router = Router();

// General Pages
router.get('/', homePage);

router.get('/about', aboutPage);

// Faculty Routes
router.get('/faculty', facultyPage);
router.get('/faculty/:id', facultyDetailPage);

// Catalog Routes
router.get('/catalog', catalogPage);
router.get('/catalog/:courseId', courseDetailPage);

// Demo Routes
router.get('/demo', addDemoHeaders, demoPage);

// Error Routes
router.get('/error', testErrorPage);

export default router;
