
import {
  useBatch,
  useCreate,
  useDelete,
  useGetList,
  useGetOne,
  useGetQuery,
  useUpdate,
  axiosFileUpload,
} from './request';

export const uploadFile = (file: any) => {
  return axiosFileUpload<any, any>('/upload-file', file);
};
// export const useLogin = () => {
//   return useCreate<LoginParams, LoginResult>('/auth/admin/login');
// };

// export const useGetCurrentUser = () => {
//   return useGetOne<CurrentUserResult>('CurrentUser', '/auth/me');
// };

// export const useGetCurrentMenus = () => {
//   return useGetList<MenuList>('CurrentMenuList', '/current/menu');
// };
// /**대시보드**/
// export const useGetDashboard = () => {
//   return useGetList<any>('Dashboards', '/dashboard/admin');
// };
// /**유저**/
// export const useGetUsers = (pagination: any, filters: any) => {
//   return useGetList<any>('Users', '/users/admin', pagination, filters);
// };
// export const useUpdateProject = () => {
//   return useUpdate<any>('/users/admin');
// };
// /**컴퍼니**/
// export const useGetCompany = (pagination: any, filters: any) => {
//   return useGetList<any>('compnies', '/companies/admin', pagination, filters);
// };
// export const useUpdateCompany = () => {
//   return useUpdate<any>('/companies/admin');
// };
// /**공지사항**/
// export const useGetannouncements = (pagination: any, filters: any) => {
//   return useGetList<any>('getAnnouncement', '/articles/admin', pagination, filters);
// };
// export const useUpdateAnnouncements = () => {
//   return useUpdate<any>('/articles/admin');
// };
// export const useDeleteAnnouncements = () => {
//   return useDelete<any>('/articles/admin');
// };
// /**채용공고**/
// export const useGetJobPosting = (pagination: any, filters: any) => {
//   return useGetList<any>('job-posting', '/job-posting/admin', pagination, filters);
// };
// export const useUpdateJobPosting = () => {
//   return useUpdate<any>('/job-posting/admin');
// };
// /**구직자프로필**/
// export const useGetJobSeekerProfile = (pagination: any, filters: any) => {
//   return useGetList<any>('job-seeker', '/job-seeker/admin', pagination, filters);
// };
// export const useUpdateJobSeekerProfile = () => {
//   return useUpdate<any>('/job-seeker/admin');
// };
// /**메인코드관리 **/
// export const useGetCode = (pagination: any, filters: any) => {
//   return useGetList<any>('codes', '/codes/admin', pagination, filters);
// };
// export const useUpdateCode = () => {
//   return useUpdate<any>('/codes/admin');
// };
// export const useDeleteCode = () => {
//   return useDelete<any>('/codes/admin');
// };
// /**직종코드관리 **/
// export const useGetJobTypeCode = (pagination: any, filters: any) => {
//   return useGetList<any>('job-type', '/job-type-code/parent/admin', pagination, filters);
// };
// export const useUpdateJobTypeCode = () => {
//   return useUpdate<any>('/job-type-code/admin');
// };
// export const useDeleteJobTypeCode = () => {
//   return useDelete<any>('/job-type-code/admin');
// };
// /**타입장르코드관리 **/
// export const useGetTypeGenreCode = (pagination: any, filters: any) => {
//   return useGetList<any>('job-type', '/type-genre-code/parent/admin', pagination, filters);
// };
// export const useUpdateTypeGenreCode = () => {
//   return useUpdate<any>('/type-genre-code/admin');
// };
// export const useDeleteTypeGenreCode = () => {
//   return useDelete<any>('/type-genre-code/admin');
// };
// /**프로그램코드관리 **/
// export const useGetDeviceProgram = (pagination: any, filters: any) => {
//   return useGetList<any>('devices-programs', '/devices-programs/admin', pagination, filters);
// };
// export const useUpdateDeviceProgram = () => {
//   return useUpdate<any>('/devices-programs/admin');
// };
// export const useDeleteDeviceProgram = () => {
//   return useDelete<any>('/devices-programs/admin');
// };
// export const useAddProject = () => {
//   return useCreate<any, any>('/users/admin');
// };
// /**대시보드 헤더 **/
// export const useDashBoardHeader = (pagination: any, filters: any) => {
//   return useGetList<any>('dashboard/header/admin', '/dashboard/header/admin', pagination, filters);
// };
// export const useUpdateDashboadHeader = () => {
//   return useUpdate<any>('/dashboard/header/admin');
// };
// export const useDeleteDashboadHeader = () => {
//   return useDelete<any>('/dashboard/header/admin');
// };
// export const useBatchDeleteProject = () => {
//   return useBatch('/users/admin' + ':batchDelete');
// };
// /**보드 관리**/
// export const useBoard = (pagination: any, filters: any) => {
//   return useGetList<any>('boards/admin', '/boards/admin', pagination, filters);
// };
// export const useUpdateBoard = () => {
//   return useUpdate<any>('/boards/admin');
// };
// export const useDeleteBoard = () => {
//   return useDelete<any>('/boards/admin');
// };
// /**강의실 관리**/
// export const useClass = (pagination: any, filters: any) => {
//   return useGetList<any>('classes/admin', '/classes/admin', pagination, filters);
// };
// export const useUpdateClass = () => {
//   return useUpdate<any>('/classes/admin');
// };
// export const useDeleteClass = () => {
//   return useDelete<any>('/classes/admin');
// };
// /**강의실 내용 관리**/
// export const useLectures = (pagination: any, filters: any) => {
//   return useGetList<any>('getLecture', '/lectures/admin', pagination, filters);
// };
// export const useUpdateLectures = () => {
//   return useUpdate<any>('/lectures/admin');
// };
// export const useDeleteLectures = () => {
//   return useDelete<any>('/lectures/admin');
// };

// /**미디어센터 관리 **/
// export const useGetMediaCenter = (pagination: any, filters: any) => {
//   return useGetList<any>('media-center', '/media-center/admin', pagination, filters);
// };
// export const useUpdateMediaCenter = () => {
//   return useUpdate<any>('/media-center/admin');
// };
// export const useDeleteMediaCenter = () => {
//   return useDelete<any>('/media-center/admin');
// };

// /**미디어센터 코드 관리 **/
// export const useGetMediaCode = (query: any) => {
//   return useGetQuery<any>('media-code', `/media-center-code/admin`, query);
// };
// export const useUpdateMediaCenterCode = () => {
//   return useUpdate<any>('/media-center-code/admin');
// };
// export const useDeleteMediaCenterCode = () => {
//   return useDelete<any>('/media-center-code/admin');
// };

// /**미디어센터 게시글 관리 **/
// export const useGetMediaPostByCenter = (query: any) => {
//   return useGetQuery<any>('media-post', `/media-post/admin`, query);
// };
// export const useGetMediaPostByCode = (query: any) => {
//   return useGetQuery<any>('media-post', `/media-post/admin`, query);
// };
// export const useGetMediaPost = (pagination: any, filters: any) => {
//   return useGetList<any>('media-post', `/media-post/admin`, pagination, filters);
// };

// export const useUpdateMediaCenterPost = () => {
//   return useUpdate<any>('/media-post/admin');
// };
// export const useDeleteMediaCenterPost = () => {
//   return useDelete<any>('/media-post/admin');
// };