import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  authHeaderKey: string;


  //apiAddress: string = 'http://localhost/b-gpts.com/b-code/api/';
  //apiAddress: string = 'http://52.17.229.142/backend/api/';
  //apiAddress:string='http://192.168.0.132/b-gpts.com/b-code/api/';
  //apiAddress: string = 'https://www.greatplacetostudy.com/cdap/backend/api/';
  //apiAddress: string = 'http://localhost/CDAP_BACKEND/api/';
  apiAddress: string = 'http://15.206.222.208/CDAP_BACKEND/api/';

  constructor(public httpClient: HttpClient) {

    let userInfo: any = localStorage.getItem('userGpts');
    if (userInfo === null) {
      return;
    } else {
      userInfo = JSON.parse(userInfo);
      this.authHeader(userInfo.access_token);
    }
  }

  loginData(userdata) {
    this.authHeader(userdata.access_token);
  }

  userSignUp(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'signup', userData);
  }

  userRegistration(userData: any): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'student-second-step', userData, { headers: httpOptions });
  }

  login(loginDetails): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'login', loginDetails);
  }

  logOut(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'logout');
  }

  getCountries(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'country');
  }

  getStates(countryId): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'state', countryId);
  }

  authHeader(authKey) {
    this.authHeaderKey = 'Bearer ' + authKey;
  }

  forgotPassword(email): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'forgot-password', email)
  }

  getStudentProfileInfo(userDetails): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'get-student-info', userDetails, { headers: httpOptions })
  }

  studentPersonalInfo(personalInfo): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'edit-student-personal-info', personalInfo, { headers: httpOptions })
  }

  studentFamilyInfo(familyInfo): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'edit-student-family-info', familyInfo, { headers: httpOptions })
  }

  studentEduInfo(eduInfo): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'edit-student-education-info', eduInfo, { headers: httpOptions })
  }

  sendVideoRecord(videoBlob): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'sop-video-answer', videoBlob, { headers: httpOptions });
  }

  getSopQuestion(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'default-text-sop', data, { headers: httpOptions });
  }

  getSopAnswer(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'get-student-sop', data, { headers: httpOptions });
  }

  sendSopAnswer(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post(this.apiAddress + 'sop-text-answer', data, { headers: httpOptions })
  }

  getVideoSopQusetion(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'default-video-sop', data, { headers: httpOptions });
  }

  instituteRegForm(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'college-registration', data, { headers: httpOptions })
  }

  univRegForm(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'university-registration', data, { headers: httpOptions })
  }

  objectiveSubmit(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'update-objective', data, { headers: httpOptions })
  }

  displayObjective(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'show-objective', data, { headers: httpOptions })
  }

  setActivity(data) {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'set-activity', data, { headers: httpOptions })
  }

  displayActivity(data) {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'get-activity', data, { headers: httpOptions })
  }

  getCollegeType(): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.get<any>(this.apiAddress + 'college-type', { headers: httpOptions });
  }

  getDepartment(): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.get<any>(this.apiAddress + 'department', { headers: httpOptions });
  }

  getStudentList(): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.get<any>(this.apiAddress + 'get-student-list', { headers: httpOptions });
  }

  updateProfilePic(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'upload-profile-pic', data, { headers: httpOptions });
  }

  tteNewUser(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'tteCreateUser', data, { headers: httpOptions });
  }

  ssoStatus(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'tteUserStatus', data, { headers: httpOptions });
  }

  tteStatusUpdate(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'updateTteUserStatus', data, { headers: httpOptions });
  }

  tteSSO(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'authSso', data, { headers: httpOptions });
  }

  tteReport(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'getReportPdf', data, { headers: httpOptions });
  }

  getResult(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'tteUserReport', data, { headers: httpOptions });
  }

  getUniversityDetails(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'college-profile', data);
  }

  getMustWatch(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'getSearchCareerVideo', data, { headers: httpOptions });
  }

  getCareerList(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'getCareerList');
  }
  getCounselorList(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress + 'students-list?user_id='+data);
  }

																				 
																							  
 
  getFacilities(): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.get<any>(this.apiAddress + 'getFacilitiesList', { headers: httpOptions });
  }

  addFavVideo(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'addToMyFavorite', data, { headers: httpOptions });
  }

  getFavVideo(data): Observable<any> {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'getAllMyFav', data, { headers: httpOptions })
  }

  getHomeVideo(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'getstaticpageVideo', data);
  }

  getGLIVideo(data): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'getGLIVideo', data);
  }

  getCareerLibrary(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'getCareerLibary', data);
  }

  getInspiringVideos(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'insperationvideo');
  }

  getRecommVideos(data) {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'ttecareervideolist', data, { headers: httpOptions });
  }

  savePrevVideo(data) {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'savepreviousvideo', data, { headers: httpOptions });
  }

  getPrevVideo(data) {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'previousVideolist', data, { headers: httpOptions });
  }

  // get course info
  getCourseInfo(data) {
    return this.httpClient.post<any>(this.apiAddress + 'getSingleCareer', data);
  }

  getSubCourse(data) {
    return this.httpClient.post<any>(this.apiAddress + 'getSingleSubCareer', data);
  }

  sendContactQuery(data) {
    return this.httpClient.post<any>(this.apiAddress + 'saveContactDetail', data);
  }

  getAllBlogs(page=null) {
    return this.httpClient.get<any>(this.apiAddress + 'blog?page='+page);
  }

  getRandomCareerVideo() {
    return this.httpClient.get<any>(this.apiAddress + 'gethomecareerVideo');
  }

  getSingleBlog(data) {
    return this.httpClient.post<any>(this.apiAddress + 'singleBlog', data);
  }

  getGetPopularBlog() {
    return this.httpClient.get<any>(this.apiAddress + 'getPopularBlog');
  }

  getLatestBlogs() {
    return this.httpClient.get<any>(this.apiAddress + 'getLatestBlog');
  }

  getSchoolList() {
    return this.httpClient.get<any>(this.apiAddress + 'school');
  }

  changePassword(data) {
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'changePassword', data, { headers: httpOptions })
  }

  featuredInst() {
    return this.httpClient.get<any>(this.apiAddress + 'getFeaturedVideo')
  }
  getCertifiedSchool(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'collagestarrating');
  }

  getOurTeam(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'getourteam');
  }

  getZohoOpening(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'getZohoOpeningJobs', data);
  }

  getdiscoverCollege(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'discover');
  }

  clusterDetail(data) {
    return this.httpClient.post<any>(this.apiAddress + 'getcluster?tte_career_id='+data, data);
  }
counselorGetPdf(data){
  let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
  return this.httpClient.get<any>(this.apiAddress + 'getpdfreport?tte_user_id='+data,{headers: httpOptions});
}
  getDesign(): Observable<any> {
    return this.httpClient.get<any>(this.apiAddress + 'design-college');
  }
  getEdieoBanner(): Observable<any>{
    return this.httpClient.get<any>(this.apiAddress + 'get-banner-video');
  }
  getEdieo(): Observable<any>{
    return this.httpClient.get<any>(this.apiAddress + 'getedieo');
  }
 
  getSingleEdieo(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'get-single-video', data);
  }
  getRequiredEdieo(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'required-edieo', data);
  }
  myFavEdieo(data): Observable<any> {
    return this.httpClient.post<any>(this.apiAddress + 'my-fav', data);
  }
  cityTourRegistration(data) {
    return this.httpClient.post<any>(this.apiAddress + 'sendtourinfo', data);
  }
  greatChallengeNotify(data){
    return this.httpClient.post<any>(this.apiAddress + 'notify', data);
  }

  summerSchoolRegis(data){
    return this.httpClient.post<any>(this.apiAddress + 'register-summer-sc', data);
  }
  
  royalChandNotify(data){
    return this.httpClient.post<any>(this.apiAddress + 'rcregister', data);
  }
  universityGetData(data,type):Observable<any>{
    let httpOptions = new HttpHeaders().set('Authorization',this.authHeaderKey);
    return this.httpClient.get<any>(this.apiAddress + 'get-university-data?user_id='+data+'&type='+type,{headers:httpOptions});
  }
  universityDataSave(data):Observable<any>{
    let httpOptions = new HttpHeaders().set('Authorization', this.authHeaderKey);
    return this.httpClient.post<any>(this.apiAddress + 'add-university-data',data,{ headers: httpOptions });
  }
  universityList():Observable<any>{
    return this.httpClient.get<any>(this.apiAddress + 'institute-list');
  }
  universityDetails(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress + 'institute/'+ data);
  }
  universityCourseList(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'streams/'+data);
  }
  universityCourseDetail(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'courses/'+data);
  }
  getInterviewList(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'interviews/'+data);
  }
  getInterviewListAll():Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'interviews');
  }
  getAllInstitutesList():Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'institutions');
  }
  homeTopVideoList():Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'homevideos');
  }
  //university list
  getUniversityList(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'university-listing/'+data);
  }
  webinarRegistration(data):Observable<any>{
    return this.httpClient.post<any>(this.apiAddress + 'webinar-register', data);
  }
  getSuggestedInstitution(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'suggested-institution/'+data);
  }

  getEdieoCareer(data):Observable<any>{
    return this.httpClient.get<any>(this.apiAddress+'getedieo?cluster_id='+data);
  }

}
