/* this file is just scaffolding right just for testing */
/* eslint-disable eqeqeq */
const classrooms = [
  {
    title: 'some hard-coded classroom',
    description: 'lorem ipsum dolat place',
    active: true,
    classroomId: 1,
  },
];

const enrollment = [
  {
    studentId: 1,
    active: true,
  },
  {
    studentId: 2,
    active: true,
  },
  {
    studentId: 3,
    active: true,
  },
  {
    studentId: 4,
    active: true,
  },
  {
    studentId: 5,
    active: true,
  },
  {
    studentId: 6,
    active: true,
  },

];

const courses = [
  {
    courseId: 1,
    active: true,
  },
  {
    courseId: 2,
    active: true,
  },
  {
    courseId: 3,
    active: true,
  },
];

class ClassroomApiService {
  static async fetchClassroomByUuid(Uuid) {
    // await sleep(500)
    console.log(Uuid, 'fetching');
    const classroom = classrooms.find(e => e.classroomId == Uuid);
    return {
      data: classroom,
    };
  }

  static async createNewClassroom({ title }) {
    console.log(title, 'creating');
    const newclassroomId = Math.max(...classrooms.map((e) => e.classroomId)) + 1;
    const newClassroom = {
      title,
      description: 'lorem ipsum dolat place',
      active: true,
      classroomId: newclassroomId,
    };
    classrooms.push(newClassroom);
    return {
      data: newClassroom,
    };
  }

  static async updateClassroomByUuid(Uuid, data) {
    // await sleep(1000)
    return {
      data: {
        title: data.title,
        description: data.description,
        active: data.active,
      },
    };
  }

  /* gets just the userIds in the classroom, rest of information comes from the lms */
  static async fetchClassroomEnrollment(/* Uuid */) {
    // await sleep(500)
    return {
      data: {
        enrollmentCount: enrollment.length,
        enrollment,
      },
    };
  }

  /* TODO:  just gets the course UUIDs, rest of it comes from LMS, UUID is enterprise UUID which needed */
  static async fetchClassroomCourses(/* Uuid */) {
    // await sleep(500)
    return {
      data: {
        courseCount: courses.length,
        courses,

      },
    };
  }

  static async addCourseToClassroom(_, courseId) {
    courses.push({ courseId, active: true });
    return {
      data: {
        success: true,
        course: {
          courseId,
          active: true,
        },
      },
    };
  }
}

export default ClassroomApiService;
