import mongoose from "mongoose";
import dotenv from "dotenv";
import Artisan from "../models/artisan.model.js";

dotenv.config();

const DB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/fixr";

const CITIES = ["Lagos", "Enugu", "Port Harcourt", "Kano", "Abuja", "Ibadan", "Kaduna"];
const SERVICES = ["technician", "jeweler", "electrician", "carpenter", "tailor", "plumber", "painter", "mechanic"];
const AVAILABILITIES = ["Available", "Busy", "Offline"];

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const randomRange = (min, max) => Math.random() * (max - min) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

// The 10 known artisans from the dataset
const initialArtisans = [
  { firstName: "Douglas", lastName: "Kelley", serviceRendered: "painter", yearsOfExperience: 9, rating: 3.96, completedJobs: 743, complaintRate: 0.100, availability: "Busy", city: "Kano" },
  { firstName: "Amanda", lastName: "Morris", serviceRendered: "tailor", yearsOfExperience: 10, rating: 4.03, completedJobs: 543, complaintRate: 0.016, availability: "Offline", city: "Lagos" },
  { firstName: "Kaitlyn", lastName: "Diaz", serviceRendered: "technician", yearsOfExperience: 24, rating: 4.98, completedJobs: 235, complaintRate: 0.038, availability: "Busy", city: "Abuja" },
  { firstName: "Justin", lastName: "Cook", serviceRendered: "carpenter", yearsOfExperience: 5, rating: 3.53, completedJobs: 731, complaintRate: 0.018, availability: "Available", city: "Enugu" },
  { firstName: "Leonard", lastName: "Clark", serviceRendered: "carpenter", yearsOfExperience: 23, rating: 3.60, completedJobs: 927, complaintRate: 0.063, availability: "Offline", city: "Kano" },
  { firstName: "Rachel", lastName: "Reyes", serviceRendered: "technician", yearsOfExperience: 15, rating: 3.75, completedJobs: 768, complaintRate: 0.062, availability: "Busy", city: "Ibadan" },
  { firstName: "Nicholas", lastName: "Castillo", serviceRendered: "technician", yearsOfExperience: 17, rating: 4.59, completedJobs: 412, complaintRate: 0.013, availability: "Available", city: "Lagos" },
  { firstName: "William", lastName: "Young", serviceRendered: "tailor", yearsOfExperience: 18, rating: 4.40, completedJobs: 703, complaintRate: 0.066, availability: "Offline", city: "Ibadan" },
  { firstName: "Ian", lastName: "Turner", serviceRendered: "tailor", yearsOfExperience: 14, rating: 3.18, completedJobs: 205, complaintRate: 0.093, availability: "Available", city: "Kano" },
  { firstName: "Mark", lastName: "Daniels", serviceRendered: "technician", yearsOfExperience: 2, rating: 4.15, completedJobs: 401, complaintRate: 0.137, availability: "Offline", city: "Kano" }
];

// Generate the remaining 40 to match distributions closely
for (let i = 0; i < 40; i++) {
  initialArtisans.push({
    firstName: randomChoice(firstNames),
    lastName: randomChoice(lastNames),
    serviceRendered: randomChoice(SERVICES),
    yearsOfExperience: Math.floor(randomRange(1, 25)),
    rating: Number(randomRange(3.0, 5.0).toFixed(2)),
    completedJobs: Math.floor(randomRange(10, 1000)),
    complaintRate: Number(randomRange(0.0, 0.15).toFixed(3)),
    availability: randomChoice(AVAILABILITIES),
    city: randomChoice(CITIES)
  });
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");

        // IMPORTANT: We only delete seeded ones if we wanted to be perfectly clean, 
        // but let's just insert these 50 so we don't wipe active users.
        // Or to prevent duplicates, maybe clear ONLY ones with NO auth attached.
        await Artisan.deleteMany({ auth: { $exists: false } }); 
        console.log("Cleared old mock artisans");

        const artisansToInsert = initialArtisans.map((a) => {
            const cRate = a.complaintRate ?? Number(randomRange(0.0, 0.15).toFixed(3));
            return {
                firstName: a.firstName,
                lastName: a.lastName,
                serviceRendered: a.serviceRendered,
                yearsOfExperience: a.yearsOfExperience,
                completedJobs: a.completedJobs,
                complaintRate: cRate,
                availability: a.availability,
                city: a.city,
                state: a.city, // using city as state for simplicity
                applicationStatus: "approved",
                serviceDescription: `Professional ${a.serviceRendered} based in ${a.city} with ${a.yearsOfExperience} years of experience.`,
                // Embed a single mock review to achieve the exact average rating desired
                reviews: [
                    {
                        comment: `Reliable and hardworking ${a.serviceRendered}.`,
                        rating: a.rating,
                        tags: ["Professional", "Timely"],
                        createdAt: new Date()
                    }
                ]
            };
        });

        await Artisan.insertMany(artisansToInsert);
        console.log(`Successfully seeded ${artisansToInsert.length} artisans.`);

    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
};

seedDatabase();
