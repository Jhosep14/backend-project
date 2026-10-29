import { getFacultyBySlug, getSortedFaculty} from '../../models/faculty/faculty.js';

const facultyPage = async (req, res) => {
    const sortBy = ['name', 'department', 'title'].includes(req.query.sort)
        ? req.query.sort : 'name';
    const facultyMembers = await getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyMembers,
        currentSort: sortBy
    });
};

const facultyDetailPage = async (req, res, next) => {
    const facultyMember = await getFacultyBySlug(req.params.facultySlug);

    if (Object.keys(facultyMember).length === 0) {
        const error = new Error('404 Error: Faculty member not found.');
        error.status = 404;
        return next(error);
    }

    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Detail`,
        faculty: facultyMember
    });
}

export { facultyPage, facultyDetailPage };