# Admin
 
1. > ***(GET)*** - `/api/admin/refundPayment` <small>(*refund user money*)</small> - 
2. > ***(POST)*** - `/api/admin/login` <small>(*Super admin login*)</small> - 

# User

1. > ***(GET)*** - `/api/user/google` <small>(*Login with google*)</small> -
2. > ***(POST)*** - `/api/user/register` <small>(*Register user*)</small> - 
3. > ***(POST)*** - `/api/user/login` <small>(*Login user*)</small> - 
4. > ***(POST)*** - `/api/user/log/resetPassword` <small>(*Forgot password*)</small>
5. > ***(POST)*** - `/api/user/log/invitePeople` <small>(*invite other people*)</small>
6. > ***(POST)*** - `/api/user/log/addNewCard` <small>(*add Credit Card to user*)</small>

# Course

1. > ***(GET)*** - `/api/course/getCourse` <small>(*get One Course*)</small>
2. > ***(GET)*** - `/api/course/log/getAllCourses` <small>(*get All Courses*)</small>
3. > ***(POST)*** - `/api/course/log/createCourse` <small>(*Create course*)</small>
4. > ***(POST)*** - `/api/course/log/addLesson` <small>(*add lesson in your course*)</small>
5. > ***(POST)*** - `/api/course/log/newOrder` <small>(*new payment, buy course or package*)</small>

# Config

**Start** - `npm start` <br>
**Database** - `MongoDb` <br>
**Port** - `process.env.PORT || 5000`