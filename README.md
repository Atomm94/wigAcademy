# Admin
 
1. > ***(POST)*** - `/api/admin/log/refundPayment` <small>(*refund user money*)</small>  
2. > ***(POST)*** - `/api/admin/login` <small>(*Super admin login*)</small> 
3. > ***(POST)*** - `/api/admin/log/responseFromSupport` <small>(*response from support*)</small>   

# User

1. > ***(GET)*** - `/api/user/google` <small>(*Login with google*)</small> 
2. > ***(GET)*** - `/api/user/log/downloadPDF` <small>(*download PDF file*)</small>
3. > ***(POST)*** - `/api/user/register` <small>(*Register user*)</small>  
4. > ***(POST)*** - `/api/user/login` <small>(*Login user*)</small>  
5. > ***(POST)*** - `/api/user/log/invitePeople` <small>(*invite other people*)</small>
6. > ***(POST)*** - `/api/user/log/addNewCard` <small>(*add Credit Card to user*)</small>
7. > ***(POST)*** - `/api/user/log/resetPassword` <small>(*Forgot password*)</small>
8. > ***(POST)*** - `/api/user/log/feedbackToLesson` <small>(*user feedback to lesson*)</small>
9. > ***(POST)*** - `/api/user/log/writeToSupport` <small>(*user write to support*)</small>
10. > ***(POST)*** - `/api/user/log/changeProfileInfo` <small>(*change user profile info.*)</small>

# Course

1. > ***(GET)*** - `/api/course/getCourse` <small>(*get One Course*)</small>
2. > ***(GET)*** - `/api/course/log/getAllCourses` <small>(*get All Courses*)</small>
3. > ***(POST)*** - `/api/course/log/createCourse` <small>(*Create course*)</small>
4. > ***(POST)*** - `/api/course/log/addLesson` <small>(*add lesson in your course*)</small>
5. > ***(POST)*** - `/api/course/log/newOrder` <small>(*new payment, buy course or package*)</small>
6. > ***(POST)*** - `/api/course/log/createUpdatePackage` <small>(*create package or add courses into package*)</small>


# Config

**Start** - `npm start` <br>
**Database** - `MongoDb` <br>
**Port** - `process.env.PORT || 5000`