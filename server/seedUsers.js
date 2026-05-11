import mongoose from "mongoose";
import connectDB from "./db/connectToDB.js";
import userModel from "./models/userModel.js";

import "dotenv/config";

const users = [
  {
    name: "Joshua Kipamet",
    email: "joekipamet@example.com",
    password: "123456",
    creditBalance: 5,
  },
  {
    name: "Brian Smith",
    email: "brian2@example.com",
    password: "pass1234",
    creditBalance: 8,
  },
  {
    name: "Catherine Lee",
    email: "catherine3@example.com",
    password: "pass1234",
    creditBalance: 12,
  },
  {
    name: "David Brown",
    email: "david4@example.com",
    password: "pass1234",
    creditBalance: 3,
  },
  {
    name: "Emma Wilson",
    email: "emma5@example.com",
    password: "pass1234",
    creditBalance: 10,
  },
  {
    name: "Frank Miller",
    email: "frank6@example.com",
    password: "pass1234",
    creditBalance: 7,
  },
  {
    name: "Grace Taylor",
    email: "grace7@example.com",
    password: "pass1234",
    creditBalance: 15,
  },
  {
    name: "Henry Anderson",
    email: "henry8@example.com",
    password: "pass1234",
    creditBalance: 1,
  },
  {
    name: "Isabella Thomas",
    email: "isabella9@example.com",
    password: "pass1234",
    creditBalance: 20,
  },
  {
    name: "Jack White",
    email: "jack10@example.com",
    password: "pass1234",
    creditBalance: 6,
  },
  {
    name: "Karen Harris",
    email: "karen11@example.com",
    password: "pass1234",
    creditBalance: 11,
  },
  {
    name: "Liam Martin",
    email: "liam12@example.com",
    password: "pass1234",
    creditBalance: 9,
  },
  {
    name: "Mia Thompson",
    email: "mia13@example.com",
    password: "pass1234",
    creditBalance: 4,
  },
  {
    name: "Nathan Garcia",
    email: "nathan14@example.com",
    password: "pass1234",
    creditBalance: 18,
  },
  {
    name: "Olivia Martinez",
    email: "olivia15@example.com",
    password: "pass1234",
    creditBalance: 13,
  },
  {
    name: "Peter Robinson",
    email: "peter16@example.com",
    password: "pass1234",
    creditBalance: 2,
  },
  {
    name: "Queenie Clark",
    email: "queenie17@example.com",
    password: "pass1234",
    creditBalance: 14,
  },
  {
    name: "Ryan Rodriguez",
    email: "ryan18@example.com",
    password: "pass1234",
    creditBalance: 16,
  },
  {
    name: "Sophia Lewis",
    email: "sophia19@example.com",
    password: "pass1234",
    creditBalance: 19,
  },
  {
    name: "Thomas Walker",
    email: "thomas20@example.com",
    password: "pass1234",
    creditBalance: 5,
  },
  {
    name: "Uma Hall",
    email: "uma21@example.com",
    password: "pass1234",
    creditBalance: 17,
  },
  {
    name: "Victor Allen",
    email: "victor22@example.com",
    password: "pass1234",
    creditBalance: 8,
  },
  {
    name: "Wendy Young",
    email: "wendy23@example.com",
    password: "pass1234",
    creditBalance: 6,
  },
  {
    name: "Xavier King",
    email: "xavier24@example.com",
    password: "pass1234",
    creditBalance: 10,
  },
  {
    name: "Yara Scott",
    email: "yara25@example.com",
    password: "pass1234",
    creditBalance: 7,
  },
  {
    name: "Zane Green",
    email: "zane26@example.com",
    password: "pass1234",
    creditBalance: 5,
  },
  {
    name: "Amelia Baker",
    email: "amelia27@example.com",
    password: "pass1234",
    creditBalance: 9,
  },
  {
    name: "Benjamin Adams",
    email: "benjamin28@example.com",
    password: "pass1234",
    creditBalance: 11,
  },
  {
    name: "Chloe Nelson",
    email: "chloe29@example.com",
    password: "pass1234",
    creditBalance: 13,
  },
  {
    name: "Daniel Carter",
    email: "daniel30@example.com",
    password: "pass1234",
    creditBalance: 4,
  },
  {
    name: "Ella Mitchell",
    email: "ella31@example.com",
    password: "pass1234",
    creditBalance: 15,
  },
  {
    name: "Finn Perez",
    email: "finn32@example.com",
    password: "pass1234",
    creditBalance: 2,
  },
  {
    name: "Gabriella Roberts",
    email: "gabriella33@example.com",
    password: "pass1234",
    creditBalance: 8,
  },
  {
    name: "Hudson Turner",
    email: "hudson34@example.com",
    password: "pass1234",
    creditBalance: 12,
  },
  {
    name: "Ivy Phillips",
    email: "ivy35@example.com",
    password: "pass1234",
    creditBalance: 20,
  },
  {
    name: "James Campbell",
    email: "james36@example.com",
    password: "pass1234",
    creditBalance: 6,
  },
  {
    name: "Kylie Parker",
    email: "kylie37@example.com",
    password: "pass1234",
    creditBalance: 3,
  },
  {
    name: "Logan Evans",
    email: "logan38@example.com",
    password: "pass1234",
    creditBalance: 14,
  },
  {
    name: "Madison Edwards",
    email: "madison39@example.com",
    password: "pass1234",
    creditBalance: 18,
  },
  {
    name: "Noah Collins",
    email: "noah40@example.com",
    password: "pass1234",
    creditBalance: 1,
  },
  {
    name: "Ava Stewart",
    email: "ava41@example.com",
    password: "pass1234",
    creditBalance: 5,
  },
  {
    name: "Owen Sanchez",
    email: "owen42@example.com",
    password: "pass1234",
    creditBalance: 9,
  },
  {
    name: "Paisley Morris",
    email: "paisley43@example.com",
    password: "pass1234",
    creditBalance: 16,
  },
  {
    name: "Quinn Rogers",
    email: "quinn44@example.com",
    password: "pass1234",
    creditBalance: 7,
  },
  {
    name: "Ruby Reed",
    email: "ruby45@example.com",
    password: "pass1234",
    creditBalance: 10,
  },
  {
    name: "Samuel Cook",
    email: "samuel46@example.com",
    password: "pass1234",
    creditBalance: 12,
  },
  {
    name: "Taylor Morgan",
    email: "taylor47@example.com",
    password: "pass1234",
    creditBalance: 4,
  },
  {
    name: "Uriel Bell",
    email: "uriel48@example.com",
    password: "pass1234",
    creditBalance: 19,
  },
  {
    name: "Valerie Murphy",
    email: "valerie49@example.com",
    password: "pass1234",
    creditBalance: 6,
  },
  {
    name: "William Bailey",
    email: "william50@example.com",
    password: "pass1234",
    creditBalance: 8,
  },
];

const seedUsers = async () => {
  try {
    await connectDB();

    await userModel.insertMany(users);

    console.log("50 users inserted successfully");

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

seedUsers();
