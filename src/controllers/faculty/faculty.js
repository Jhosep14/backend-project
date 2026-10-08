import { getFacultyById, getSortedFaculty} from '../../models/faculty/faculty.js';

const facultyPage = (req, res) => {
    const sortBy = req.query.sort || 'name'; // Default sort by name
    const facultyMembers = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyMembers,
        currentSort: sortBy
    });
};

const facultyDetailPage = (req, res) => {
    const facultyId = req.params.id;
    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        return res.status(404).send('404 Error: Faculty member not found.');
    }

    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Detail`,
        faculty: facultyMember
    });
}

export { facultyPage, facultyDetailPage };