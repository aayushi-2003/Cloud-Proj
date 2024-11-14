import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const CoursesTable = ({ courses, showActionButton, onActionClick, actionText, onUnenrollClick, onEditClick, showDeleteButton, onDeleteClick }) => {
  return (
    <table className="table-auto w-full ">
      <thead>
        <tr>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Details</th>
          <th className="border px-4 py-2">Semester</th>
          {showActionButton && <th className="border px-4 py-2">Status</th>}
          {onUnenrollClick && <th className="border px-4 py-2">Unenroll</th>}
          {onEditClick && <th className="border px-4 py-2">Action</th>}
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td className="border px-4 py-2">{course.title}</td>
            <td className="border px-4 py-2">{course.details}</td>
            <td className="border px-4 py-2">{course.semester}</td>
            {showActionButton && (
              <td className="border py-2 px-2 lg:px-0">
                <div className='flex w-full items-center justify-center'>
                <button
                  className={`${course.enrollStatus ? 'bg-secondary-blue' : 'bg-accent hover:bg-blue-700'} text-white px-4 py-2 rounded`}
                  onClick={() => onActionClick(course)}
                  disabled={course.enrollStatus}
                  >
                  {course.enrollStatus ? 'Enrolled' : actionText}
                </button>
                </div>
              </td>
            )}

            {onUnenrollClick && (
              <td className="border py-2 px-2 lg:px-0">
                <div className='flex w-full items-center justify-center'>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => onUnenrollClick(course)}>
                  Unenroll
                </button>
                </div>
              </td>
            )}

            {onEditClick && (
              <td className="border py-2 px-2 ">
                <div className='flex items-center justify-center space-x-6 '>
                <button className=" text-blue-600 hover:text-blue-700 rounded" onClick={() => onEditClick(course)}>
                    <FaRegEdit className='h-6 w-6' />
                </button>
                {showDeleteButton && (
                <button className="text-red-600/80 hover:text-red-600/100 rounded" onClick={() => onDeleteClick(course.id)}>
                  <MdDeleteOutline className='h-7 w-7'/>
                </button>)}
                </div>
              </td>
            )}
          </tr>
        ))}

        {courses.length === 0 && (
          <tr>
            <td className="border px-4 py-2" colSpan={5}>No courses available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CoursesTable;
