export class SidebarData {

    studentDashboard = [
        { title: 'Home', img: 'assets/images/common/dashboard-icon.png', router: '/student-dashboard/home' },
        { title: 'My Application', img: 'assets/images/common/myprofile-icon.png', router: '/student-dashboard/student-profile' },
        {
            title: 'My Assessment', img: 'assets/images/common/career-icon.png',
            sub: [
                { title: 'Career Assessment', router: '/student-dashboard/career-discovery-test' },
                { title: 'My Report', router: '/student-dashboard/career-discovery-result' },
            ]
        },
        {
            title: 'Explore Career', img: 'assets/images/common/library-icon.png',
            sub: [
                { title: 'Must Watch', router: '/student-dashboard/must-watch' },
                { title: 'My Favourites', router: '/student-dashboard/my-favourite-video' },
                //{ title: 'Browse All Videos', router: '/careerlibrary' },
                {title: 'EDIEO', img: 'assets/images/common/edio.png', router: '/student-dashboard/edieo'},
            ]
        },
       
        
        //{title: 'Discover Colleges', img: 'assets/images/common/discover-colege.png', router: '/discover-colleges'},
           
      
        // {
        //     title: 'University Progression', img: 'assets/images/common/university.png',
        //     sub: [
        //         { title: 'Search College', router: '' },
        //         { title: 'Application Status', router: '' },
        //         { title: 'G Chat', router: '' }
        //     ]
        // },
        // {
        //     title: 'Opportunities', img: 'assets/images/common/opportunity-icon.png',
        //     sub: [
        //         { title: 'Scholarships', router: '/student-dashboard/scholarship' },
        //         { title: 'Scholarship Status', router: '/student-dashboard/scholarship-status' },
        //         // { title: 'Financial Aid', router: '/student-dashboard/scholarship' }
        //     ]
        // },
    ]

    collegeDashboard = [
        { title: 'Dashboard', img: 'assets/images/common/dashboard-icon.png', router: '/college-dashboard/home' },
        { title: 'Profile', img: 'assets/images/common/myprofile-icon.png', router: '/college-dashboard/college-profile' },
        {
            title: 'Edstead', img: 'assets/images/common/oneapp-icon.png',
            sub: [
                { title: 'Search Student', router: '/college-dashboard/search-student' },
                { title: 'Shortlisted', router: '/college-dashboard/shortlisted' },
                { title: 'Inbound Applications', router: '/college-dashboard/inbound-process' },
                { title: 'Selection Process', router: '/college-dashboard/selection-process' },
                { title: 'Chat', router: '' }
            ]
        },
        // {
        //     title: 'Knowledge Bank', img: 'assets/images/common/oneapp-icon.png',
        //     sub: [
        //         { title: 'Blogs', router: '' },
        //         { title: 'Videos', router: '' },
        //         { title: 'Nano Classes', router: '' }
        //     ]
        // },
        // {
        //     title: 'Opportunities', img: 'assets/images/common/oneapp-icon.png',
        //     sub: [
        //         { title: 'Create Summer Program', router: '/college-dashboard/opp-schedule-new' },
        //         { title: 'Open-Day Session', router: '' },
        //         { title: 'Scholarship', router: '' }
        //     ]
        // },
        {
            title: 'Rating', img: 'assets/images/common/oneapp-icon.png',
            sub: [
                { title: 'Apply', router: '/college-dashboard/ratings-apply' },
                // { title: 'Learn', router: '' },
                // { title: 'Downlaod Report', router: '' }
            ]
        },
    ]
}