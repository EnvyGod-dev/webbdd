const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("../../server/team 2/models/Course");

dotenv.config();

const data = [
  { id: 101, name: "Веб систем ба технологи 101", seats: 120, time: "10:00 AM", status: "Идэвхтэй", level: "bachelor" },
  { id: 220, name: "Програм хангамжийн инженерчлэл 220", seats: 80, time: "11:00 AM", status: "Идэвхтэй", level: "bachelor" },
  { id: 201, name: "Өгөгдлийн сан 201", seats: 60, time: "01:00 PM", status: "Идэвхтэй", level: "bachelor" },
  { id: 301, name: "Үүлэн технологи 301", seats: 40, time: "02:00 PM", status: "Идэвхтэй", level: "bachelor" },
  { id: 101, name: "Дата анализ 101", seats: 20, time: "03:00 PM", status: "Идэвхтэй", level: "master" },
  { id: 220, name: "Үйлдлийн систем 220", seats: 15, time: "04:00 PM", status: "Идэвхтэй", level: "master" },
  { id: 201, name: "Төслийн менежмент 201", seats: 10, time: "05:00 PM", status: "Идэвхтэй", level: "master" },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Course.deleteMany();
  await Course.insertMany(data);
  console.log("Courses seeded!");
  mongoose.disconnect();
});