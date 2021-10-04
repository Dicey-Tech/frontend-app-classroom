// import qs from 'query-string';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import configuration from '../../config';

/* this file is just scaffolding right just for testing */
/* eslint-disable eqeqeq */

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
  static apiClient = getAuthenticatedHttpClient;

  static baseUrl = configuration.CLASSROOM_BASE_URL;

  static async fetchClassroomByUuid(uuid) {
    console.log(uuid, 'fetching');
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}`;

    return ClassroomApiService.apiClient().get(requestUrl);
  }

  static async createNewClassroom({ title, enterpriseUuid }) {
    console.log(title, 'creating');
    const formData = {
      name: title,
      active: true,
      school: enterpriseUuid,
    };

    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/`;
    return ClassroomApiService.apiClient().post(requestUrl, formData);
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
  static async fetchClassroomEnrollment(uuid) {
    const page = 1; /* TODO need to store and return the paging information */
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/enrollments/?page=${page}`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  /* TODO:  just gets the course UUIDs, rest of it comes from LMS, UUID is enterprise UUID which needed */
  static async fetchClassroomCourses(uuid) {
    const page = 1; /* TODO add param */
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/assignments?page=${page}`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  /* This take a text string which is expected be email address separated by \r\n */
  static async addBulkEnrollmentToClassroom(courseId, enrollmentText) {
    return { courseId, enrollmentText };
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
