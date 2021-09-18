/* eslint-disable eqeqeq */

const students = [
  {
    studentId: 1,
    firstName: 'john',
    lastName: 'smith',
    email: 'john1@edx.com',
  },
  {
    studentId: 2,
    firstName: 'johnnny',
    lastName: 'smithson',
    email: 'john2@edx.com',
  },
  {
    studentId: 3,
    firstName: 'johnaton',
    lastName: 'smithaton',
    email: 'john3@edx.com',
  },
  {
    studentId: 4,
    firstName: 'johnakton',
    lastName: 'smithakton',
    email: 'john4@edx.com',
  },
  {
    studentId: 5,
    firstName: 'johnism',
    lastName: 'smithism',
    email: 'john6@edx.com',
  },
  {
    studentId: 6,
    firstName: 'johnlackton',
    lastName: 'smithakton',
    email: 'john7@edx.com',
  },

];

const courseList = [
  {
    courseId: 1,
    title: 'This is a handy course 1 title',
    description: 'This is a sample description',
    imageURL: '/image1.jpg',
  },
  {
    courseId: 2,
    title: 'Another handy course 2 title',
    description: 'This is a sample description',
    imageURL: '/image2.jpg',
  },
  {
    courseId: 3,
    title: 'Another handy course 3 title',
    description: 'This is a sample description',
    imageURL: '/image3.jpg',
  },
  {
    courseId: 4,
    title: 'Another handy course 4 title',
    description: 'This is a sample description',
    imageURL: '/image3.jpg',
  },
  {
    courseId: 5,
    title: 'Another handy course 5 title',
    description: 'This is a sample description',
    imageURL: '/image3.jpg',
  },
  {
    courseId: 6,
    title: 'Another handy course 6 title',
    description: 'This is a sample description',
    imageURL: '/image3.jpg',
  },

];

class LmsApiService {
  static async fetchStudentInfo(studentId) {
    const student = students.find(element => element.studentId == studentId);

    return {
      data: student,
    };
  }

  static async fetchCourseInfo(courseId) {
    const course = courseList.find(element => element.courseId == courseId);
    return {
      data: course,
    };
  }

  static async fetchAllCourses() {
    return {
      data: {
        courseCount: courseList.length,
        courses: courseList,
      },
    };
  }
}

export default LmsApiService;
