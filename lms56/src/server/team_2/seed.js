const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("./models/Course");
const Lesson = require("./models/Lesson");
const Attendance = require("./models/Attendance");
const Submission = require("./models/Submission");

// Load environment variables from the root .env file
dotenv.config();

// Debug: Log environment variables
console.log('Environment variables:', {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT
});

const courseData = [
  { id: 101, name: "Веб систем ба технологи 101", seats: 120, time: "10:00 AM", status: "Идэвхтэй", level: "bachelor" },
  { id: 220, name: "Програм хангамжийн инженерчлэл 220", seats: 80, time: "11:00 AM", status: "Идэвхтэй", level: "bachelor" },
  { id: 201, name: "Өгөгдлийн сан 201", seats: 60, time: "01:00 PM", status: "Идэвхтэй", level: "bachelor" },
  { id: 301, name: "Үүлэн технологи 301", seats: 40, time: "02:00 PM", status: "Идэвхтэй", level: "bachelor" },
  { id: 101, name: "Дата анализ 101", seats: 20, time: "03:00 PM", status: "Идэвхтэй", level: "master" },
  { id: 220, name: "Үйлдлийн систем 220", seats: 15, time: "04:00 PM", status: "Идэвхтэй", level: "master" },
  { id: 201, name: "Төслийн менежмент 201", seats: 10, time: "05:00 PM", status: "Идэвхтэй", level: "master" },
];

const lessonData = [
  { id: 1, courseId: 101, name: "Лекц 1", time: "10:00 AM" },
  { id: 2, courseId: 101, name: "Лабораторийн ажил 1", time: "11:00 AM" },
  { id: 3, courseId: 101, name: "Нэмэлт дадлага 1", time: "01:00 PM" },
  // Add more lessons for other courses
];

const attendanceData = [
  { courseId: 101, group: "5 - 4", type: "Лабораторийн цаг", present: 24, absent: 6 },
  { courseId: 101, group: "5 - 5", type: "Лабораторийн цаг", present: 20, absent: 4 },
  { courseId: 101, group: "5 - 6", type: "Лабораторийн цаг", present: 31, absent: 8 },
  // Add more attendance records for other courses
];

const submissions = [
  {
    name: "М.Болор-Эрдэнэ",
    group: "Бие даалт",
    email: "bolormunkh12@gmail.com",
    studentId: "B221870017",
    team: "Даалгаврын хэсэг",
    score: 100,
    percent: 100,
    date: "2025-02-10 07:42 PM",
    graded: true,
  },
  {
    name: "Ж.Дорж",
    group: "Лаборатори",
    email: "dorj@example.com",
    studentId: "B221870018",
    team: "Шалгалтын хэсэг",
    score: 85,
    percent: 85,
    date: "2025-02-12 01:30 PM",
    graded: true,
  },
  {
    name: "С.Цэцэгмаа",
    group: "Нэмэлт даалгавар",
    email: "tsetsegmaa@example.com",
    studentId: "B221870019",
    team: "Журналын хэсэг",
    score: null,
    percent: null,
    date: "2025-02-09 09:15 AM",
    graded: false,
  },
  {
    name: "Д.Бат-Эрдэнэ",
    group: "Бие даалт",
    email: "baterdene@example.com",
    studentId: "B221870020",
    team: "Дүгнэлтийн хэсэг",
    score: 92,
    percent: 92,
    date: "2025-02-11 10:00 AM",
    graded: true,
  },
  {
    name: "Т.Ариунжаргал",
    group: "Лекц",
    email: "ariunjargal@example.com",
    studentId: "B221870021",
    team: "Агуулгын хэсэг",
    score: 76,
    percent: 76,
    date: "2025-02-11 03:20 PM",
    graded: true,
  },
  {
    name: "Б.Энхтүвшин",
    group: "Нэмэлт даалгавар",
    email: "enkhtuushin@example.com",
    studentId: "B221870022",
    team: "Хавсралт хэсэг",
    score: null,
    percent: null,
    date: "2025-02-13 08:55 AM",
    graded: false,
  },
  {
    name: "Ц.Одончимэг",
    group: "Бие даалт",
    email: "odonchimeg@example.com",
    studentId: "B221870023",
    team: "Танилцуулгын хэсэг",
    score: 89,
    percent: 89,
    date: "2025-02-12 02:10 PM",
    graded: true,
  },
  {
    name: "Н.Халиун",
    group: "Лаборатори",
    email: "khaliun@example.com",
    studentId: "B221870024",
    team: "Дүгнэлтийн хэсэг",
    score: 95,
    percent: 95,
    date: "2025-02-10 04:00 PM",
    graded: true,
  },
  {
    name: "П.Эрдэнэцогт",
    group: "Лекц",
    email: "erdenetsogt@example.com",
    studentId: "B221870025",
    team: "Жишээний хэсэг",
    score: null,
    percent: null,
    date: "2025-02-14 09:00 AM",
    graded: false,
  },
  {
    name: "О.Анударь",
    group: "Бие даалт",
    email: "anudari@example.com",
    studentId: "B221870026",
    team: "Шалгалтын хэсэг",
    score: 100,
    percent: 100,
    date: "2025-02-13 07:42 PM",
    graded: true,
  },
  {
    name: "С.Гэрэлмаа",
    group: "Нэмэлт даалгавар",
    email: "gerelmaa@example.com",
    studentId: "B221870027",
    team: "Агуулгын хэсэг",
    score: 82,
    percent: 82,
    date: "2025-02-13 11:20 AM",
    graded: true,
  },
  {
    name: "Э.Наранзул",
    group: "Лекц",
    email: "naranzul@example.com",
    studentId: "B221870028",
    team: "Журналын хэсэг",
    score: null,
    percent: null,
    date: "2025-02-12 06:15 PM",
    graded: false,
  },
  {
    name: "Б.Мөнхцэцэг",
    group: "Бие даалт",
    email: "munkhtsetseg@example.com",
    studentId: "B221870029",
    team: "Танилцуулгын хэсэг",
    score: 97,
    percent: 97,
    date: "2025-02-11 01:00 PM",
    graded: true,
  },
  {
    name: "Ж.Нямжав",
    group: "Лаборатори",
    email: "nyamjav@example.com",
    studentId: "B221870030",
    team: "Хавсралт хэсэг",
    score: 88,
    percent: 88,
    date: "2025-02-11 02:30 PM",
    graded: true,
  },
  {
    name: "Г.Энхболд",
    group: "Нэмэлт даалгавар",
    email: "enkhbold@example.com",
    studentId: "B221870031",
    team: "Шалгалтын хэсэг",
    score: null,
    percent: null,
    date: "2025-02-13 03:33 PM",
    graded: false,
  },
  {
    name: "Ч.Бямбажав",
    group: "Лекц",
    email: "byambajav@example.com",
    studentId: "B221870032",
    team: "Дүгнэлтийн хэсэг",
    score: 91,
    percent: 91,
    date: "2025-02-14 10:40 AM",
    graded: true,
  },
  {
    name: "Д.Амаржаргал",
    group: "Бие даалт",
    email: "amarjargal@example.com",
    studentId: "B221870033",
    team: "Агуулгын хэсэг",
    score: 90,
    percent: 90,
    date: "2025-02-15 12:00 PM",
    graded: true,
  },
  {
    name: "О.Солонго",
    group: "Нэмэлт даалгавар",
    email: "solongo@example.com",
    studentId: "B221870034",
    team: "Журналын хэсэг",
    score: null,
    percent: null,
    date: "2025-02-16 09:30 AM",
    graded: false,
  },
  {
    name: "Т.Билгүүн",
    group: "Лекц",
    email: "bilguun@example.com",
    studentId: "B221870035",
    team: "Шалгалтын хэсэг",
    score: 84,
    percent: 84,
    date: "2025-02-16 02:25 PM",
    graded: true,
  },
  {
    name: "З.Номин",
    group: "Бие даалт",
    email: "nominaa@example.com",
    studentId: "B221870036",
    team: "Жишээний хэсэг",
    score: null,
    percent: null,
    date: "2025-02-17 08:45 AM",
    graded: false,
  }
];

// Transform submissions to match MongoDB schema
const submissionData = submissions.map(submission => {
  // Randomly select submission type
  const submissionTypes = ["Бие даалт", "Лаборатори", "Нэмэлт даалгавар"];
  const randomType = submissionTypes[Math.floor(Math.random() * submissionTypes.length)];

  return {
    courseId: 101, // All submissions are for course 101
    student: {
      name: submission.name,
      team: submission.team,
      email: submission.email,
      studentId: submission.studentId,
      teammates: []
    },
    submittedAt: submission.date,
    score: submission.score,
    grade: submission.graded ? "A" : null,
    feedback: submission.graded ? "Сайн ажилласан." : "Тайлбар шаардлагатай.",
    files: ["assignment.pdf"],
    type: randomType // Add the random submission type
  };
});

let groupFilter = "";

// 🔢 Submission count олох
const submissionCountMap = submissions.reduce((acc, cur) => {
  acc[cur.studentId] = (acc[cur.studentId] || 0) + 1;
  return acc;
}, {});


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Attendance.deleteMany({});
    await Submission.deleteMany({});
    console.log("Cleared existing data");

    // Insert new data
    await Course.insertMany(courseData);
    await Lesson.insertMany(lessonData);
    await Attendance.insertMany(attendanceData);
    await Submission.insertMany(submissionData);
    console.log("✅ Data seeded successfully!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seed function
seedDatabase();