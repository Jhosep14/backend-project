import { getAllCourses, getCourseBySlug } from '../../models/catalog/courses.js';
import { getSectionsByCourseSlug } from '../../models/catalog/catalog.js';

const catalogPage = async (req, res) => {
    const courses = await getAllCourses();
    res.render('catalog', { title: 'Course Catalog', courses });
};

const courseDetailPage = async (req, res, next) => {
    const courseSlug = req.params.slugId;
    const course = await getCourseBySlug(courseSlug);
    if (Object.keys(course).length === 0) {
        const error = new Error(`Course ${courseSlug} not found`);
        error.status = 404;
        return next(error);
    }

    const sortBy = ['time', 'professor', 'room'].includes(req.query.sort)
        ? req.query.sort : 'time';
    const sections = await getSectionsByCourseSlug(courseSlug, sortBy);
    res.render('course-detail', {
        title: `${course.courseCode} - ${course.name}`,
        course,
        sections,
        currentSort: sortBy,
    });
};

export { catalogPage, courseDetailPage };
