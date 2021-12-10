# หน้าที่ของแต่ละไฟล์

Register.js
หน้าที่

  - สร้าง User ลงไปใน Firebase Authication

  - เพิ่ม Doc ใน collection ชื่อ user มีรายละเอียดดังนี้
  
    uid uid จาก Firebase Authication
    
    name ชื่อ user ที่สมัคร
    
    email อีเมล user ที่สมัคร
    
    createAt วันที่ ณ สมัคร
    
    isOnline สถานะออนไลน์

Profile.js
หน้าที่

  - แสดงรายละเอียดข้อมูลจาก Doc ใน user มีรายละเอียดดังนี้
  
    name ชื่อ user สมัคร
    
    email อีเมล user ที่สมัคร
    
    createAt วันที่ ณ สมัคร
   
  - อัพรูปโปรไฟล์ และลมรูปโปรไฟล์เก่าใน Firebase Storage

Login.js
หน้าที่
  - ล็อคอินเข้าสู่ระบบ โดยตรงมี user ใน collection user
  
  - เข้าสู่ระบบ Login ต้องใช้ข้อมูลจากใน collcetion user และ firebase authication มีรายละเอียดดังนี้
  
    email อีเมล user ที่สมัคร
    
    password password ที่สมัคร
    
Home.js
หน้าที่
  - Query ข้อมูลจาก Doc โดยแสดงข้อมูล user ที่ไม่ใช้ ผู้ล็อคอินออกมา
  
  - ดึงข้อมูลแสดงแชทจาก collection messag
  
  - กดปุ่ม ส่งข้อความ Doc ใน collection messag จะถูกเพิ่มโดยมีรายละเอียดดังนี้
  
    text ข้อความ
    
    from จากผู้ส่ง
    
    to ส่งผู้รับ
    
    createAt วันที่กดส่งข้อความ
    
    media รูปหรือวิดีโอ
    
    และ doc ใน collection lastmessag จะมี unread สถานะข้อความ เพื่มเข้าไป
    
  - เมื่อมีการส่ง ภาพหรือวิดีโอ จะถูกจัดเก็บใน firebase Storage

User.js
หน้าที่

  - แสดงข้อความล่าสุด จาก doc ใน collection lastmeassg

Navbar.js
หน้าที่

  - เมื่อมีการเรียกใช้ navbar สถานะของ collection user ผู้ที่ล็อคอินจะถูกปรับเป็น isOnline: True

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
