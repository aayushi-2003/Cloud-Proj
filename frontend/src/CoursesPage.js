import React, { useState } from 'react'; 
import Navbar from './Navbar';
import AllCoursesTable from './AllCoursesTable';
import EditCoursePopup from './EditCoursePopup';
import AddCoursePopup from './AddCoursePopup';

const initialCoursesList = [
  { id: 1, title: "Math 101", details: "Basic Mathematics", semester: "Fall", enrollStatus: false },
  { id: 2, title: "Physics 101", details: "Intro to Physics", semester: "Spring", enrollStatus: false },
  { id: 3, title: "Chemistry 101", details: "Intro to Chemistry", semester: "Fall", enrollStatus: false },
];

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('allCourses');
  const [myCourses, setMyCourses] = useState([]);
  const [coursesList, setCoursesList] = useState(initialCoursesList);
  const [editCourse, setEditCourse] = useState(null);
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);

  const handleEnroll = (course) => {
    if (!myCourses.some((c) => c.id === course.id)) {
      course.enrollStatus = true; 
      setMyCourses([...myCourses, course]);
    }
  };

  const handleUnenroll = (course) => {
    course.enrollStatus = false;
    setMyCourses(myCourses.filter((c) => c.id !== course.id));
  };

  const handleEditCourse = (course) => {
    setEditCourse(course); 
  };

  const handleSaveEdit = (updatedCourse) => {
    const updatedCoursesList = coursesList.map((c) =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    setCoursesList(updatedCoursesList);

    const updatedMyCourses = myCourses.map((c) =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    setMyCourses(updatedMyCourses);

    setEditCourse(null);
  };

  const handleAddNewCourse = (newCourse) => {
    setCoursesList([...coursesList, newCourse]);
    setShowAddCoursePopup(false);
  };

  const handleDeleteCourse = (courseId) => {
    setCoursesList(coursesList.filter((course) => course.id !== courseId));
    setMyCourses(myCourses.filter((course) => course.id !== courseId));
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto pt-24 px-10 '>

      {/* Tabs */}
        <div className="tabs flex items-center justify-start gap-x-6 text border-b-2">
          <button
            className={`tab ${activeTab === 'allCourses' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('allCourses')}
          >
            All Courses
          </button>
          <button
            className={`tab ${activeTab === 'myCourses' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('myCourses')}
          >
            My Courses
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'allCourses' ? (
            <>
            <button
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded mb-4"
              onClick={() => setShowAddCoursePopup(true)}
            >
              Add New Course
            </button>
            <AllCoursesTable
              courses={coursesList}
              showActionButton={true}
              onActionClick={handleEnroll}
              onEditClick={handleEditCourse}
              showDeleteButton={true}
              actionText="Enroll"
              onDeleteClick={handleDeleteCourse}
            />
          </>
          ) : (
            <AllCoursesTable
              courses={myCourses}
              showActionButton={false} 
              onUnenrollClick={handleUnenroll}
              onEditClick={handleEditCourse}
              showDeleteButton={false}
            />
          )}
        </div>

        {editCourse && (
          <EditCoursePopup
            course={editCourse}
            onClose={() => setEditCourse(null)}
            onSave={handleSaveEdit}
          />
        )}

        {showAddCoursePopup && (
          <AddCoursePopup
            onClose={() => setShowAddCoursePopup(false)}
            onSave={handleAddNewCourse}
          />
        )}

      </div>
    </div>
  );
};

export default CoursesPage;
