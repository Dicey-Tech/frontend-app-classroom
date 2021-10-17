// import qs from 'query-string';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import configuration from '../../config';

/* this file is just scaffolding right just for testing */
/* eslint-disable eqeqeq */

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
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/enrollments/`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  /* TODO:  just gets the course UUIDs, rest of it comes from LMS, UUID is enterprise UUID which needed */
  static async fetchClassroomCourses(uuid) {
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/assignments`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  /* This take a text string which is expected be email address separated by \r\n */
  static async addBulkEnrollmentToClassroom(uuid, enrollmentText) {
    const formData = {
      identifiers: enrollmentText,
    };
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/enroll/`;
    return ClassroomApiService.apiClient().post(requestUrl, formData);
  }

  static async getAvailableCoursesForClassroom(uuid) {
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/courses/`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  static async addCourseToClassroom(uuid, courseId) {
    const formData = {
      course_id: courseId,
      classroom_instance: uuid,
    };
    const requestUrl = `${ClassroomApiService.baseUrl}/api/v1/classrooms/${uuid}/assignments/`;
    return ClassroomApiService.apiClient().post(requestUrl, formData);
  }
}

export default ClassroomApiService;
