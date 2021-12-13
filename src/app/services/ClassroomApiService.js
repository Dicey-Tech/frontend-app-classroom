// import qs from 'query-string';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

/* this file is just scaffolding right just for testing */
/* eslint-disable eqeqeq */

class ClassroomApiService {
  static apiClient = getAuthenticatedHttpClient;

  static baseUrl() { return getConfig().CLASSROOM_BASE_URL; }

  static async fetchClassroomByUuid(uuid) {
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/${uuid}`;

    return ClassroomApiService.apiClient().get(requestUrl);
  }

  static async createNewClassroom({ title, enterpriseUuid }) {
    const formData = {
      name: title,
      active: true,
      school: enterpriseUuid,
    };

    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/`;
    return ClassroomApiService.apiClient().post(requestUrl, formData);
  }

  /* gets just the userIds in the classroom, rest of information comes from the lms */
  static async fetchClassroomEnrollment(uuid) {
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/${uuid}/enrollments/`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  static async fetchClassroomCourses(uuid) {
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/${uuid}/assignments`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  /* This take a text string which is expected be email address separated by \r\n */
  static async addBulkEnrollmentToClassroom(uuid, enrollmentText) {
    const formData = {
      identifiers: enrollmentText,
    };
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/${uuid}/enroll/`;
    return ClassroomApiService.apiClient().post(requestUrl, formData);
  }

  static async getAvailableCoursesForClassroom(uuid) {
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/${uuid}/courses/`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }

  static async addCourseToClassroom(uuid, courseId) {
    const formData = {
      course_id: courseId,
      classroom_instance: uuid,
    };
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/${uuid}/assignments/`;
    return ClassroomApiService.apiClient().post(requestUrl, formData);
  }

  static async getAllClassrooms() {
    const requestUrl = `${ClassroomApiService.baseUrl()}/api/v1/classrooms/`;
    return ClassroomApiService.apiClient().get(requestUrl);
  }
}

export default ClassroomApiService;
