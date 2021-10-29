/* eslint-disable eqeqeq */
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import queryString from 'query-string-for-all';
import { getConfig } from '@edx/frontend-platform';

class LmsApiService {
  static apiClient = getAuthenticatedHttpClient;

  static baseUrl() { return getConfig().LMS_BASE_URL; }

  static async fetchStudentInfoByEmail(email) {
    const requestUrl = `${LmsApiService.baseUrl()}/api/user/v1/accounts?email=${email}`;
    return LmsApiService.apiClient().get(requestUrl);
  }

  static async fetchCourseInfo(courseId) {
    const requestUrl = `${LmsApiService.baseUrl()}/api/courses/v1/courses/${courseId}`;
    return LmsApiService.apiClient().get(requestUrl);
  }

  static async fetchEnterpriseQuery(queryParams) {
    const requestUrl = `${LmsApiService.baseUrl()}/enterprise/api/v1/enterprise-customer/?${queryString.stringify(queryParams)}`;
    return LmsApiService.apiClient().get(requestUrl);
  }

  static async fetchEnterpriseByUuid(uuid) {
    const queryParams = {
      uuid,
    };
    return this.fetchEnterpriseQuery(queryParams);
  }

  static async fetchEnterpriseBySlug(slug) {
    const queryParams = {
      slug,
    };
    return this.fetchEnterpriseQuery(queryParams);
  }
}

export default LmsApiService;
