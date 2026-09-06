import "dotenv/config";

import mongoose from "mongoose";
import connectDb from "../db/db.js";
import { User } from "../models/auth/user.model.js";

const seedUsers = [
  ["seed_arjun_sharma", "Arjun Sharma", "arjun.sharma@example.com", "https://i.pravatar.cc/150?img=1"],
  ["seed_aarav_verma", "Aarav Verma", "aarav.verma@example.com", "https://i.pravatar.cc/150?img=2"],
  ["seed_rohan_mehta", "Rohan Mehta", "rohan.mehta@example.com", "https://i.pravatar.cc/150?img=3"],
  ["seed_ishita_gupta", "Ishita Gupta", "ishita.gupta@example.com", "https://i.pravatar.cc/150?img=4"],
  ["seed_aditya_singh", "Aditya Singh", "aditya.singh@example.com", "https://i.pravatar.cc/150?img=5"],
  ["seed_ananya_patel", "Ananya Patel", "ananya.patel@example.com", "https://i.pravatar.cc/150?img=6"],
  ["seed_rahul_yadav", "Rahul Yadav", "rahul.yadav@example.com", "https://i.pravatar.cc/150?img=7"],
  ["seed_neha_mishra", "Neha Mishra", "neha.mishra@example.com", "https://i.pravatar.cc/150?img=8"],
  ["seed_aryan_kapoor", "Aryan Kapoor", "aryan.kapoor@example.com", "https://i.pravatar.cc/150?img=9"],
  ["seed_pooja_sharma", "Pooja Sharma", "pooja.sharma@example.com", "https://i.pravatar.cc/150?img=10"],
  ["seed_karan_malhotra", "Karan Malhotra", "karan.malhotra@example.com", "https://i.pravatar.cc/150?img=11"],
  ["seed_simran_kaur", "Simran Kaur", "simran.kaur@example.com", "https://i.pravatar.cc/150?img=12"],
  ["seed_vivek_joshi", "Vivek Joshi", "vivek.joshi@example.com", "https://i.pravatar.cc/150?img=13"],
  ["seed_sneha_agarwal", "Sneha Agarwal", "sneha.agarwal@example.com", "https://i.pravatar.cc/150?img=14"],
  ["seed_ayush_tiwari", "Ayush Tiwari", "ayush.tiwari@example.com", "https://i.pravatar.cc/150?img=15"],
  ["seed_kavya_iyer", "Kavya Iyer", "kavya.iyer@example.com", "https://i.pravatar.cc/150?img=16"],
  ["seed_rohit_saxena", "Rohit Saxena", "rohit.saxena@example.com", "https://i.pravatar.cc/150?img=17"],
  ["seed_divya_nair", "Divya Nair", "divya.nair@example.com", "https://i.pravatar.cc/150?img=18"],
  ["seed_aman_khan", "Aman Khan", "aman.khan@example.com", "https://i.pravatar.cc/150?img=19"],
  ["seed_shreya_reddy", "Shreya Reddy", "shreya.reddy@example.com", "https://i.pravatar.cc/150?img=20"],
];

async function seedDatabase() {
  try {
    await connectDb();

    const result = await User.bulkWrite(
      seedUsers.map(([clerkId, name, email, profilePic]) => ({
        updateOne: {
          filter: { clerkId },
          update: {
            $set: {
              clerkId,
              name,
              email,
              profilePic,
            },
          },
          upsert: true,
        },
      }))
    );

    console.log(
      `Seed complete! Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}, Matched: ${result.matchedCount}`
    );
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();