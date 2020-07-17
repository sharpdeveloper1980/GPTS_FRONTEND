import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
declare var require: any;
let RecordRTC = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, AfterViewInit {
  currentJustify = 'between';
  profileBasicForm: FormGroup;
  sopForm: FormGroup;
  FamilyForm: FormGroup;
  educationForm: FormGroup;
  activitiesForm: FormGroup;
  suffixLsit: any;
  sopTopicList: any;
  selectedLevel;
  video: any;
  stream: MediaStream;
  recordRTC: any;
  activeTab: any;
  videoProcessed: boolean = false;
  videoStarted: boolean = false;
  recordedBlob: any;
  countries: any;
  userDetails: any;
  model: NgbDateStruct;
  currentStates: any;
  permanenetStates: any;
  infoCompleteStatus: boolean;
  familyInfoCompleteStatus: boolean;
  eduInfoCompleteStatus: boolean;
  fullForm: any;
  honorArray: Array<any> = [];
  sopQuestion: string;
  sopAnswer: any;
  defaultSopQuestion: ElementRef;
  defaultSopAnswer: boolean = false;
  editEnable: boolean = false;
  C_date: any;
  sopansid: any;
  defaultVideoSopQ: string;
  recordText: string = 'Record';
  videoSubmitted: boolean = false;
  activityStatus: boolean = false;
  schoolNotChanged: boolean = true;
  highestQualificationList: Array<any>;
  gradeList: Array<any>;
  activityList: Array<any> = [];
  activityNumber: number = 0;
  activityGrade: Array<any> = [];
  studentVidSopStatus: boolean = false;
  sopStatus: boolean = false;
  alertText: String;
  alertTimeOut: any;
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobilePattern: RegExp = /^[0-9]{10}$/;
  sameAddr: String;
  religiousPrefArray: Array<string> = ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism', 'Others'];
  leveOfRecogList: any;
  boardType: any;
  schoolType: any;
  levelOfRecogList: any;
  activitiesVar: boolean = false;
  userInformation: Array<any> = [];
  personalInformation: Array<any> = [];

  @ViewChild('defaultSopQuestionList') set defaultSopQuestionList(element: ElementRef) {
    this.defaultSopQuestion = element;
  }

  @ViewChild('alertBox') alertBox: ElementRef;
  errMessage: string = '';
  @ViewChild('errorContainer') errorContainer: ElementRef;
  ferrMessage: string = '';
  @ViewChild('ferrorContainer') ferrorContainer: ElementRef;
  serrMessage: string = '';
  @ViewChild('serrorContainer') serrorContainer: ElementRef;
  constructor(private calendar: NgbCalendar, public apiService: ApiService, public headerService: HeaderService) { }

  ngOnInit() {
    setTimeout(() => {
      this.headerService.loaderFunction(true);
    }, 0);
    this.createForm();
    this.getCountries();
    this.suffixLsit = [
      { id: '1', name: 'Mr' },
      { id: '2', name: 'Miss' },
      // { id: '3', name: 'Mrs' },
    ];

    this.leveOfRecogList = [
      { id: '1', name: 'School' },
      { id: '2', name: 'State/ Regional' },
      { id: '3', name: 'National' },
      { id: '4', name: 'International' },
    ];

    this.highestQualificationList = [
      { id: '1', name: 'Postgraduate degree' },
      { id: '2', name: 'Graduate diploma or graduate certificate level' },
      { id: '3', name: 'Bachelor degree (honours)' },
      { id: '4', name: 'Bachelor degree pass (4 years or equivalent)' },
      { id: '5', name: 'Bachelor degree pass (3 years or equivalent)' },
      { id: '6', name: 'Advanced Diploma' },
      { id: '7', name: 'Diploma' },
      { id: '8', name: 'Certificate level 3 or 4' },
      { id: '9', name: ' Certificate level 1 or 2' },
      { id: '10', name: 'Unknown (qualification unknown)' },
    ]

    this.gradeList = [
      { id: '1', name: '8th' },
      { id: '2', name: '9th' },
      { id: '3', name: '10th appearing' },
      { id: '4', name: '10th completed' },
      { id: '5', name: '11th' },
      { id: '6', name: '12th appearing' },
      { id: '7', name: '12th completed' },
    ];

    this.activityGrade = [
      { id: '1', name: '8th' },
      { id: '2', name: '9th' },
      { id: '3', name: '10th' },
      { id: '4', name: '11th' },
      { id: '5', name: '12th' },
    ]
    this.boardType = [
      { name: 'Central Board of Secondary Education' },
      { name: 'Council for the Indian School Certificate Examinations' },
      { name: 'International Baccalaureate' },
      { name: 'Cambridge International, State Board' }
    ];

    this.schoolType = [
      { name: 'Public' },
      { name: 'Private' },
      { name: 'Government' },
      { name: 'Residential' },
      { name: 'International' },
      { name: 'Boarding' }
    ];

    this.sopTopicList = [
      { id: 1, name: 'What is your career choice and what preparations have you done towards it?' },
      { id: 2, name: 'As you envision your future in a particular career, who is your inspiration and why?' },
      { id: 3, name: 'How do you envision yourself effecting significant change in the sector you have chosen for yourself?' },
    ]

    this.userDetails = JSON.parse(localStorage.getItem('userGpts'));
    this.selectedLevel = this.sopTopicList[1].id;
    this.getSOP();
  }

  ngAfterViewInit() {
    this.getUserProfileData(this.userDetails);
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 800);
  }

  getCountries() {
    this.apiService.getCountries().subscribe(val => {
      this.countries = val.data;
    })
  }

  createForm() {
    this.profileBasicForm = new FormGroup({
      student_fname: new FormControl('', Validators.required),
      student_lname: new FormControl('', Validators.required),
      student_suffix: new FormControl(null, Validators.required),
      student_gender: new FormControl('', Validators.required),
      student_dob: new FormControl('', Validators.required),
      student_age: new FormControl('', Validators.required),
      student_current_address: new FormControl('', Validators.required),
      same_adresss: new FormControl(''),
      student_current_country: new FormControl(null, Validators.required),
      student_current_state: new FormControl(null, Validators.required),
      student_current_pincode: new FormControl(null, Validators.required),
      student_permanent_address: new FormControl('', Validators.required),
      student_permanent_country: new FormControl(null, Validators.required),
      student_permanent_state: new FormControl(null, Validators.required),
      student_permanent_pincode: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])),
      student_phone_code: new FormControl(null),
      student_home_contact: new FormControl(''),
      student_contact: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.mobilePattern)
      ])),
      student_email: new FormControl('', Validators.required),
      // student_religious: new FormControl(null, Validators.required),
      // student_ethinicity: new FormControl(null, Validators.required),
      student_skype_id: new FormControl(''),
      user_id: new FormControl('')
    });
    this.FamilyForm = new FormGroup({
      father_name: new FormControl('', Validators.required),
      father_occupation: new FormControl('', Validators.required),
      father_highest_education: new FormControl('', Validators.required),
      family_income: new FormControl('', Validators.required),
      mother_name: new FormControl('', Validators.required),
      mother_occupation: new FormControl('', Validators.required),
      mother_highest_education: new FormControl('', Validators.required),
      no_of_siblings: new FormControl(''),
      any_sibling: new FormControl('', Validators.required),
      father_email_id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ])),
      // mother_email_id: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.email
      // ])),
      father_contact_no: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.mobilePattern),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])),
      // mother_contact_no: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.pattern(this.mobilePattern),
      //   Validators.minLength(10),
      //   Validators.maxLength(10),
      // ])),
      user_id: new FormControl('')
    });

    this.educationForm = new FormGroup({
      current_school: new FormControl('', Validators.required),
      type_of_school: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      board: new FormControl('', Validators.required),
      schooling_with_same_day: new FormControl('', Validators.required),
      previous_school: new FormControl('', Validators.required),
      reason_for_shifting_school: new FormControl('', Validators.required),
      grade_in_transfer: new FormControl('', Validators.required),
      grade_in_cgpa: new FormControl(''),
      grade_in_cgpa_10: new FormControl(''),
      grade_in_cgpa_12: new FormControl(''),
      per_in_class: new FormControl(''),
      // per_in_class_10: new FormControl(''),
      // per_in_class_12: new FormControl(''),
      no_of_honors: new FormControl(''),
      honors_group: new FormGroup({
      }),
      // year_of_graduation: new FormControl('', Validators.required),
      // year_of_completion: new FormControl('', Validators.required),
      user_id: new FormControl('')
    });

    this.activitiesForm = new FormGroup({
      activity: new FormGroup({}),
      accept_activity: new FormControl('')
    });

    this.sopForm = new FormGroup({
      sop_topic_name: new FormControl(null, Validators.required),
    });
  }

  isDisabled = (date: NgbDate, current: { month: number }) => date.month !== current.month;
  isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  // Video recording and downloading ends
  startRecording() {
    this.videoProcessed = false;
    let mediaConstraints = {
      video: true, audio: true
    };
    console.log(mediaConstraints);
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    this.videoStarted = true;
  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 1280000,
      videoBitsPerSecond: 1280000,
      bitsPerSecond: 1280000, // if this line is provided, skip above two
    };

    if (this.recordRTC != undefined) {
      this.stream = null;
      this.recordRTC.reset();
    }
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    let threeMinutes = 3 * 60 * 1000;
    this.recordRTC.setRecordingDuration(threeMinutes, () => {
      this.stopRecording();
    });
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video;
    video.srcObject = stream;
    this.toggleControls();
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  stopRecording() {
    this.recordText = 'Record Again';
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    this.videoProcessed = true;
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLMediaElement = this.video;
    let recordRTC = this.recordRTC;
    this.toggleControls();
    this.recordedBlob = recordRTC.getBlob();
    video.src = video.srcObject = null;
    video.src = audioVideoWebMURL;
    video.load();
  }

  uploadRecording() {
    let videoFormData: FormData = new FormData();
    let fileType = 'video'; // or "audio"
    let fileName = this.userDetails.user_id + 'studentRecord.webm';  // or "wav"
    videoFormData.append("fileName", fileName);
    videoFormData.append(fileType, this.recordedBlob);
    videoFormData.append("user_id", this.userDetails.user_id);
    videoFormData.append("sop_id", "2");
    this.apiService.sendVideoRecord(videoFormData).subscribe(val => {
      this.videoProcessed = false;
      this.videoStarted = false;
      this.studentVidSopStatus = true;
    },
      error => {
        console.log(error);
      });
  }

  download() {
    this.recordRTC.save('VOP.webm', this.recordedBlob);
  }

  errorCallback() {
    //handle error here
  }
  // Check which tab is open so that it selects video tag
  checkActiveTab(event) {
    this.headerService.loaderFunction(true);
    this.activeTab = event.nextId;
    if (this.activeTab === "videoSP") {
      setTimeout(() => {
        this.video = document.querySelector("#video");
        this.defaultVideoSop(this.video);
      }, 1);

    } else if (this.activeTab === 'sop') {
      this.getSOP();
    }
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 800);
  }

  //  copy current adress to permanent adress and reverts if not true
  copyAddress() {

    setTimeout(() => {
      let adresssFields = this.profileBasicForm.controls
      if (adresssFields.same_adresss.value) {
        this.sameAddr = '1';
        adresssFields.student_permanent_address.setValue(adresssFields.student_current_address.value);
        adresssFields.student_permanent_country.setValue(adresssFields.student_current_country.value);
        this.permanentCountryChanged(adresssFields.student_current_country.value);
        adresssFields.student_permanent_state.setValue(adresssFields.student_current_state.value);
        adresssFields.student_permanent_pincode.setValue(adresssFields.student_current_pincode.value);
      } else {
        this.sameAddr = '2';
        adresssFields.student_permanent_address.setValue("");
        adresssFields.student_permanent_country.setValue(null);
        adresssFields.student_permanent_state.setValue(null);
        adresssFields.student_permanent_pincode.setValue(null);
      }
    }, 100);

  }

  getUserProfileData(userDetails) {
    let userDetailsReq = { 'user_id': userDetails.user_id, 'usertype': userDetails.usertype };
    this.apiService.getStudentProfileInfo(userDetailsReq).subscribe(val => {
      this.setFormFields(val);
    },
      error => {
        console.log(error)
      });

    // Activity form
    let activityData = new FormData;
    activityData.append('user_id', userDetails.user_id);
    this.apiService.displayActivity(activityData).subscribe(val => {
      this.activitySetValue(val.data);
      if (val.data.activity != null) {
        this.activityStatus = true;
      }
    },
      error => {
        console.log(error);
      }
    )
  }

  // Setting form fields on load
  setFormFields(fieldObject) {
    let userInfo = fieldObject.user_info;
    let personalInfo = fieldObject.profile_info;
    this.infoCompleteStatus = personalInfo.student_profile_info_status;
    this.familyInfoCompleteStatus = personalInfo.student_family_info_status;
    this.eduInfoCompleteStatus = personalInfo.student_education_info_status;
    this.studentVidSopStatus = personalInfo.student_sop_video_status;
    this.sopStatus = personalInfo.student_sop_status;

    this.userInformation = fieldObject.user_info;
    this.personalInformation = fieldObject.profile_info;

    // personal form fields
    let personalformFields = this.profileBasicForm.controls;
    let familFormFields = this.FamilyForm.controls;
    let educationInfo = this.educationForm.controls;
    personalformFields.student_fname.setValue(userInfo.student_fname);
    personalformFields.student_lname.setValue(userInfo.lastname);
    personalformFields.student_email.setValue(userInfo.email);
    personalformFields.student_suffix.setValue(personalInfo.suffix);
    personalformFields.student_gender.setValue(personalInfo.gender);
    personalformFields.student_dob.setValue(personalInfo.dob);
    personalformFields.student_age.setValue(personalInfo.age);
    personalformFields.student_current_address.setValue(personalInfo.address);
    personalformFields.student_current_country.setValue(personalInfo.country);
    personalformFields.student_current_state.setValue(personalInfo.state);
    personalformFields.student_current_pincode.setValue(personalInfo.pincode);
    personalformFields.same_adresss.setValue(personalInfo.same_as_addr);
    this.sameAddr = personalInfo.same_as_addr;
    personalformFields.student_permanent_address.setValue(personalInfo.permanent_address);
    personalformFields.student_permanent_country.setValue(personalInfo.permanent_country);
    personalformFields.student_permanent_state.setValue(personalInfo.permanent_state);
    personalformFields.student_permanent_pincode.setValue(personalInfo.permanent_pincode);
    personalformFields.student_phone_code.setValue(personalInfo.student_phone_code);
    personalformFields.student_home_contact.setValue(personalInfo.home_contact);
    personalformFields.student_contact.setValue(userInfo.contact);

    // personalformFields.student_religious.setValue(personalInfo.religious);
    // personalformFields.student_ethinicity.setValue(personalInfo.ethinicity);

    if (personalInfo.country != "" && personalInfo.country != null) {
      this.currentCountryChanged(personalInfo.country);
    } else {
      personalformFields.student_current_state.setValue(null);
    }

    if (personalInfo.permanent_country != "" && personalInfo.permanent_country != null) {
      this.permanentCountryChanged(personalInfo.permanent_country);
    } else {
      personalformFields.student_permanent_state.setValue(null);
    }

    // Family Form Starts
    familFormFields.father_name.setValue(personalInfo.father_name);
    familFormFields.father_occupation.setValue(personalInfo.father_occupation);
    familFormFields.father_highest_education.setValue(personalInfo.father_highest_education);
    familFormFields.family_income.setValue(personalInfo.family_income);
    familFormFields.mother_occupation.setValue(personalInfo.mother_occupation);
    familFormFields.mother_name.setValue(personalInfo.mother_name);
    familFormFields.mother_highest_education.setValue(personalInfo.mother_highest_education);
    familFormFields.any_sibling.setValue(personalInfo.any_sibling);
    familFormFields.father_email_id.setValue(personalInfo.father_email_id);
    familFormFields.father_contact_no.setValue(personalInfo.father_contact_no);
    // familFormFields.mother_email_id.setValue(personalInfo.mother_email_id);
    // familFormFields.mother_contact_no.setValue(personalInfo.mother_contact_no);

    // Education fields starts
    educationInfo.current_school.setValue(personalInfo.current_school);
    educationInfo.type_of_school.setValue(personalInfo.type_of_school);
    educationInfo.previous_school.setValue(personalInfo.previous_school);
    educationInfo.grade.setValue(personalInfo.grade);
    educationInfo.board.setValue(personalInfo.board);
    educationInfo.schooling_with_same_day.setValue(personalInfo.schooling_with_same_day);
    // To set the value incoming
    this.schoolChanged(personalInfo.schooling_with_same_day);
    educationInfo.reason_for_shifting_school.setValue(personalInfo.reason_for_shifting_school);
    educationInfo.grade_in_transfer.setValue(personalInfo.grade_in_transfer);
    // educationInfo.year_of_completion.setValue(personalInfo.year_of_completion);
    // educationInfo.year_of_graduation.setValue(personalInfo.year_of_graduation);
    let cgpa = personalInfo.grade_in_cgpa;
    let per = personalInfo.per_in_class;
    educationInfo.grade_in_cgpa.setValue(personalInfo.grade_in_cgpa);
    if (cgpa === null) {
      educationInfo.grade_in_cgpa_10.setValue(cgpa);
      educationInfo.grade_in_cgpa_12.setValue(cgpa);
    } else {
      educationInfo.grade_in_cgpa_10.setValue(cgpa.tenth);
      educationInfo.grade_in_cgpa_12.setValue(cgpa.twelth);
    }
    if (per === null) {
      // educationInfo.per_in_class_10.setValue(per);
      // educationInfo.per_in_class_12.setValue(per);
    } else {
      // educationInfo.per_in_class_10.setValue(per.tenth);
      // educationInfo.per_in_class_12.setValue(per.twelth);
    }

    educationInfo.per_in_class.setValue(personalInfo.per_in_class);
    educationInfo.no_of_honors.setValue(personalInfo.no_of_honors);
    // set number of honors on start
    this.numberOfHonor();
    this.setHonorValue(personalInfo.honors_group);
  }

  personalInfoSubmit() {
    this.errMessage = '';
    //if (this.profileBasicForm.valid) {
      let personalInfo = this.profileBasicForm.value;
      personalInfo.user_id = this.userDetails.user_id;

      this.apiService.studentPersonalInfo(personalInfo).subscribe(val => {
        if (val.code == 200) {
          this.alertUpdate("Information Updated", 1);
          this.infoCompleteStatus = true;
        } else {
          this.errMessage = val.message;
          this.errorContainer.nativeElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      },
        error => {
          console.log(error);
        });
    //}
  }

  familyInfoSubmit() {
    this.ferrMessage = '';
    //if (this.FamilyForm.valid) {
      let familyInfo = this.FamilyForm.value;
      familyInfo.user_id = this.userDetails.user_id;
      this.apiService.studentFamilyInfo(familyInfo).subscribe(val => {
        if (val.code == 200) {
          this.alertUpdate("Information Updated", 1);
          this.familyInfoCompleteStatus = true;
          // this.getUserProfileData(this.userDetails);
        }else{
          this.ferrMessage = val.message;
          this.ferrorContainer.nativeElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      },
        error => {
          console.log(error);
        });
    //}
  }

  eduSubmit() {
    //if (this.educationForm.valid) {
      this.serrMessage = '';
      let eduInfo = this.educationForm.value;
      eduInfo.user_id = this.userDetails.user_id;
      // eduInfo.per_in_class = { 'tenth': eduInfo.per_in_class_10, 'twelth': eduInfo.per_in_class_12 };
      eduInfo.grade_in_cgpa = { 'tenth': eduInfo.grade_in_cgpa_10, 'twelth': eduInfo.grade_in_cgpa_12 };
      this.apiService.studentEduInfo(eduInfo).subscribe(val => {
        if (val.code == 200) {
          this.alertUpdate("Information Updated", 1);
          this.eduInfoCompleteStatus = true;
          // this.getUserProfileData(this.userDetails);
        } else {
          this.serrMessage = val.message;
          this.serrorContainer.nativeElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      },
        error => {
          console.log(error);
        });
    //}
  }


  currentCountryChanged(value) {
    let country = { 'country': value.toString() }
    this.apiService.getStates(country).subscribe(val => {
      this.currentStates = val.data;
    });
  }

  permanentCountryChanged(value) {
    let country = { 'country': value.toString() }
    this.apiService.getStates(country).subscribe(val => {
      this.permanenetStates = val.data;
    });
  }

  // editInfo(form) {
  //   this.apiService.studentPersonalInfo(form).subscribe(val => {
  //     this.getUserProfileData(this.userDetails);
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }

  // create from controls of honors
  numberOfHonor() {
    setTimeout(() => {
      let numberOfHonor = this.educationForm.controls.no_of_honors.value;
      let honorGroup = this.educationForm.get('honors_group') as FormGroup;
      if (numberOfHonor == 0) {
        honorGroup.reset();
        this.honorArray = new Array;
        this.honorArray = [];
        for (const key in honorGroup.controls) {
          honorGroup.get(key).clearValidators();
          honorGroup.get(key).updateValueAndValidity();
          honorGroup.removeControl(key);
        }

      } else {
        this.honorArray = new Array;
        for (let i = 0; i < numberOfHonor; i++) {
          honorGroup.addControl('honor_title' + i, new FormControl('', Validators.required));
          honorGroup.addControl("grade_level" + i, new FormControl('', Validators.required));
          honorGroup.addControl("level_of_recognition" + i, new FormControl('', Validators.required));
          this.honorArray.push(['honor_title' + i, "grade_level" + i, "level_of_recognition" + i]);
        }
      }
    });
  }

  setHonorValue(honorGroupValue) {
    setTimeout(() => {
      honorGroupValue = JSON.parse(honorGroupValue);
      let honorGroup = this.educationForm.get('honors_group') as FormGroup;
      this.honorArray.forEach(element => {
        honorGroup.controls[element[0]].setValue(honorGroupValue[element[0]]);
        honorGroup.controls[element[1]].setValue(honorGroupValue[element[1]]);
        honorGroup.controls[element[2]].setValue(honorGroupValue[element[2]]);
      });
    }, 100);
  }


  // SOP related functions
  getSOP() {
    let data = new FormData;
    data.append('user_id', this.userDetails.user_id);
    console.log("Append data : "+ this.userDetails.user_id);
    this.apiService.getSopAnswer(data).subscribe(val => {
      let questionData = val.data;
      //let check = JSON.stringify(questionData);
      console.log(JSON.stringify(val));
      if(questionData.answer != undefined) {
        //alert(questionData.difference);
          this.defaultSopAnswer = true;
          this.selectedLevel = questionData.sopid; 

          if(questionData.difference < 4){
            this.editEnable = true;
            this.C_date = questionData.created_at;
            this.sopansid = questionData.id; 
          }
          this.sopAnswer = questionData.answer;
          this.sopStatus = true;
        console.log("SOP : "+JSON.stringify(questionData));
        console.log("status:"+questionData.answer);
      }else if(questionData.answer == undefined){
        //alert(2);
        this.defaultSopAnswer = false;
      }else{
        //alert(3);
        this.defaultSopAnswer = false;
      }

    });
  }

  sopWriten() {
    console.log("Here Length : "+this.defaultSopQuestion.nativeElement.value.length);
    if (this.defaultSopQuestion.nativeElement.value.length < 1000) {
      this.defaultQuestionSubmit();
    } else {
      //this.defaultSopAnswer = false;
      //alert('Words limit 1000');
      this.alertUpdate("You have to write maximum 1000 words !!", 2);
    }
  }

  defaultQuestionSubmit() {
  if(this.selectedLevel == undefined){
    //alert('You have to select sop from dropdown !!');
    this.alertUpdate("You have to select sop from dropdown !!", 2);
    return false;
  }
  if (this.defaultSopQuestion.nativeElement.value.length < 601) {
    //alert('You have to write atleast 10 words !!');
    this.alertUpdate("You have to write atleast 600 words , you wrote "+ this.defaultSopQuestion.nativeElement.value.length +" words !!", 2);
    return false;
  }
  if (this.defaultSopQuestion.nativeElement.value.length > 1001) {
    this.alertUpdate("You have to write maximum 1000 words , you wrote "+ this.defaultSopQuestion.nativeElement.value.length +" words !!", 2);
    return false;
  }
    let data = {
      'id': '',
      'user_id': this.userDetails.user_id,
      'sop_id': this.selectedLevel,
      'answer': this.defaultSopQuestion.nativeElement.value,
      'created_at': ''
    }
    
    this.apiService.sendSopAnswer(data).subscribe(val => {
      //this.defaultSopAnswer = true;
      console.log("saved : "+ val);
      if (val.code == 200) {
          this.alertUpdate("Sop Information Added Succesfully", 1);
          setTimeout(() => {
            this.getSOP();
          }, 500);
         
        } else {
          this.alertUpdate("Something went wrong", 2);
        }
    },
      error => {
        console.log(error);
      })
  }

  questionSubmit() {
  if (this.defaultSopQuestion.nativeElement.value.length < 601) {
    //alert('You have to write atleast 10 words !!');
    this.alertUpdate("You have to write atleast 600 words , you wrote "+ this.defaultSopQuestion.nativeElement.value.length +" !!", 2);
    return false;
  }
  if (this.defaultSopQuestion.nativeElement.value.length > 1001) {
    this.alertUpdate("You have to write maximum 1000 words , you wrote "+ this.defaultSopQuestion.nativeElement.value.length +" words !!", 2);
    return false;
  }
  //alert(this.defaultSopQuestion.nativeElement.value.length);
    let data = {
      'id': this.sopansid,
      'user_id': this.userDetails.user_id,
      'sop_id': this.selectedLevel,
      'answer': this.defaultSopQuestion.nativeElement.value,
      'created_at': this.C_date
    }
    //alert('Update');
    this.apiService.sendSopAnswer(data).subscribe(val => {
      //this.defaultSopAnswer = true;
      console.log("saved : "+ val);
      if (val.code == 200) {
          this.alertUpdate("Sop Information Updated", 1);
          setTimeout(() => {
            this.getSOP();
          }, 500);
         
        } else {
          this.alertUpdate("Something went wrong", 2);
        }
    },
      error => {
        console.log(error);
      })
  }

  //  Default video SOP
  defaultVideoSop(video) {
    let data = new FormData;
    data.append('user_id', this.userDetails.user_id);
    this.apiService.getVideoSopQusetion(data).subscribe(val => {
      let data = val.data;
      this.defaultVideoSopQ = data.question;
      if (data.video_sop != '') {
        this.videoSubmitted = true;
        video.src = data.video_sop;
      }
    });
  }


  play() {
    this.video.play();
  }
  pause() {
    this.video.pause();
  }

  // Activity Submit
  activitySubmit() {
    if (this.activitiesForm.valid) {
      let activityFormValue = this.activitiesForm.value;
      activityFormValue.activity_count = this.activityNumber;
      activityFormValue.user_id = this.userDetails.user_id;
      this.apiService.setActivity(activityFormValue).subscribe(val => {
        if (val.code == 200) {
          this.activityStatus = true;
          this.alertUpdate("Information Updated", 1);
         
        } else {

        }
      },
        error => {
          console.log(error);
        });
        $('.takeAssesment').css('display','inline-block'); 
    }
  }

  schoolChanged(val) {
    if (typeof val === 'string') {
      if (val == 'yes') {
        val = true;
      } else {
        val = false;
      }
    }
    let eduControls = this.educationForm.controls;
    this.schoolNotChanged = val;
    if (!val) {
      eduControls.previous_school.clearValidators();
      eduControls.previous_school.setValue('');
      eduControls.previous_school.updateValueAndValidity();

      eduControls.reason_for_shifting_school.clearValidators();
      eduControls.reason_for_shifting_school.setValue('');
      eduControls.reason_for_shifting_school.updateValueAndValidity();

      eduControls.grade_in_transfer.clearValidators();
      eduControls.grade_in_transfer.setValue('');
      eduControls.grade_in_transfer.updateValueAndValidity();
    } else {
      eduControls.previous_school.setValidators([Validators.required]);
      eduControls.previous_school.updateValueAndValidity();
      eduControls.reason_for_shifting_school.setValidators([Validators.required]);
      eduControls.reason_for_shifting_school.updateValueAndValidity();
      eduControls.grade_in_transfer.setValidators([Validators.required]);
      eduControls.grade_in_transfer.updateValueAndValidity();
    }

  }

  get gradeValue() {
    let gradeValue = this.educationForm.value.grade;
    let controls = this.educationForm.controls;
    if (gradeValue > 3) {
      controls.grade_in_cgpa_10.setValidators([Validators.required]);
      // controls.per_in_class_10.setValidators([Validators.required]);
    } else if (gradeValue > 6) {
      controls.grade_in_cgpa_10.setValidators([Validators.required]);
      // controls.per_in_class_10.setValidators([Validators.required]);
      controls.grade_in_cgpa_12.setValidators([Validators.required]);
      // controls.per_in_class_12.setValidators([Validators.required]);
    }
    return gradeValue;
  }

  addActivites() {
    let activityGroup = this.activitiesForm.get('activity') as FormGroup;
    activityGroup.addControl('activityType' + this.activityNumber, new FormControl('', Validators.required));
    activityGroup.addControl('activityGrade' + this.activityNumber, new FormControl('', Validators.required));
    activityGroup.addControl('activityRole' + this.activityNumber, new FormControl('', Validators.required));
    activityGroup.addControl('activityRecog' + this.activityNumber, new FormControl('', Validators.required));
    this.activityList.push([['activityType' + this.activityNumber], 'activityGrade' + this.activityNumber, 'activityRole' + this.activityNumber, 'activityRecog' + this.activityNumber]);
    this.activityNumber++;
    this.activitiesVar = true;
  }

  activitySetValue(data) {
    let activityArray = JSON.parse(data.activity);
    let activityCount = data.activity_count;
    this.activityNumber = activityCount;
   // activityGroup.controls.accept_activity.setValue(data.accept_activity);
    let activityGroup = this.activitiesForm.get('activity') as FormGroup;
    let activityformFields = this.activitiesForm.controls;

    activityformFields.accept_activity.setValue(data.accept_activity);

    for (let i = 0; i < activityCount; i++) {
      activityGroup.addControl('activityType' + i, new FormControl('', Validators.required));
      activityGroup.addControl('activityGrade' + i, new FormControl('', Validators.required));
      activityGroup.addControl('activityRole' + i, new FormControl('', Validators.required));
      activityGroup.addControl('activityRecog' + i, new FormControl('', Validators.required));
      this.activityList.push(['activityType' + i, 'activityGrade' + i, 'activityRole' + i, 'activityRecog' + i]);
    }
    this.activityList.forEach((element, index) => {
      activityGroup.controls[element[0]].setValue(activityArray[element[0]]);
      activityGroup.controls[element[1]].setValue(activityArray[element[1]]);
      activityGroup.controls[element[2]].setValue(activityArray[element[2]]);
      activityGroup.controls[element[3]].setValue(activityArray[element[3]]);
    });
  }

  alertUpdate(message: string, type: number) {
    this.alertText = message;
    if (type === 1) {
      this.alertBox.nativeElement.classList.add("alert", "alert-success");
    } else {
      this.alertBox.nativeElement.classList.add("alert", "alert-danger");
    }
    this.alertBox.nativeElement.classList.remove("d-none");
    this.alertBox.nativeElement.scrollIntoView({ block: "end", behavior: "smooth" });
    this.alertTimeOut = setTimeout(() => {
      this.alertBox.nativeElement.classList.add("d-none");
      this.alertBox.nativeElement.classList.remove("alert-success", "alert-danger");
    }, 3000)
  }

  hideAlert() {
    clearTimeout(this.alertTimeOut);
    this.alertBox.nativeElement.classList.add("d-none");
    this.alertBox.nativeElement.classList.remove("alert-success", "alert-danger");
  }

  selectedChange(){
    console.log(this.selectedLevel);
  }
}
