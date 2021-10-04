/* eslint-disable eqeqeq */
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import configuration from '../../config';

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
  static apiClient = getAuthenticatedHttpClient;

  static baseUrl = configuration.LMS_BASE_URL;

  static async fetchStudentInfoByEmail(email) {
    const requestUrl = `${LmsApiService.baseUrl}/api/user/v1/accounts?email=${email}`;
    return LmsApiService.apiClient().get(requestUrl);
  }

  static async fetchCourseInfo(courseId) {
    const requestUrl = `${LmsApiService.baseUrl}/api/courses/v1/courses/${courseId}`;
    return LmsApiService.apiClient().get(requestUrl);
  }

  /* says "all" but there could be thousands of courses so I force a page */
  /* eslint-disable */
  static async fetchAllCourses(page, pageSize) {
    const queryParams = {
      page,
      page_size: pageSize,
    };
    // const requestUrl = `${LmsApiService.baseUrl}/api/courses/v1/courses/?${qs.stringify(queryParams)}`;

    return {
      data: {
        page: 1,
        pageCount: 1,
        pageSize: 20,
        courseCount: courseList.length,
        courses: courseList,
      },
    };
  }
  /* eslint-enable */

  static async fetchEnterpriseQuery(queryParams) {
    const requestUrl = `${LmsApiService.baseUrl}/enterprise/api/v1/enterprise-customer/?page=${queryParams.page}&uuid=${queryParams.uuid}`;
    return LmsApiService.apiClient().get(requestUrl);
  }

  static async fetchEnterpriseByUuid(uuid) {
    const queryParams = {
      page: 1,
      uuid,
    };
    return this.fetchEnterpriseQuery(queryParams);
  }

  static async fetchEnterpriseBySlug(slug) {
    const requestUrl = `${LmsApiService.baseUrl}/enterprise/api/v1/enterprise-customer/?page=1&slug=${slug}`;
    return LmsApiService.apiClient().get(requestUrl);
  }
}

export default LmsApiService;
