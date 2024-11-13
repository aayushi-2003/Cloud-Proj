const { Course } = require('../models/course');

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching courses", details: error.message });
    }
}

async function getCourse(req, res) {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: "Error fetching course", details: error.message });
    }
}

async function createCourse(req, res) {
    const { title, details, semester, enrollstatus } = req.body;

    try {
        const newCourse = new Course({
            title,
            details,
            semester,
            enrollstatus,
            owner: req.user.id, 
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ error: "Error creating course", details: error.message });
    }
}

async function editCourse(req, res) {
    const { id } = req.params;
    const { title, details, semester, enrollstatus } = req.body;

    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized to edit this course" });
        }

        course.title = title || course.title;
        course.details = details || course.details;
        course.semester = semester || course.semester;
        course.enrollstatus = enrollstatus || course.enrollstatus;

        const updatedCourse = await course.save();
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: "Error editing course", details: error.message });
    }
}

async function deleteCourse(req, res) {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized to delete this course" });
        }

        await course.remove();
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting course", details: error.message });
    }
}

module.exports = { getAllCourses, getCourse, createCourse, editCourse, deleteCourse };
