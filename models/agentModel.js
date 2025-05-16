const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }, // URL to the profile picture
    bankAccountDetails: {
      accountNumber: { type: String, required: true },
      bankName: { type: String, required: true },
      accountHolderName: { type: String, required: true },
      ifscCode: { type: String, required: true },
    },
    payoutDetails: {
      totalEarnings: { type: Number, default: 0 },
      tips: { type: Number, default: 0 },
      surge: { type: Number, default: 0 },
      incentives: { type: Number, default: 0 },
      totalPaid: { type: Number, default: 0 }, // Total amount paid out so far
      pendingPayout: { type: Number, default: 0 }, // Pending payout amount
    },
    dashboard: {
      totalDeliveries: { type: Number, default: 0 },
      totalCollections: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      tips: { type: Number, default: 0 },
      surge: { type: Number, default: 0 },
      incentives: { type: Number, default: 0 },
    },
    deliveryStatus: {
      currentOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // current order they are delivering
      status: { type: String, enum: ["Assigned", "In Progress", "Completed", "Cancelled"], default: "Assigned" },
      estimatedDeliveryTime: { type: Date }, // estimated time of arrival
      location: { 
        latitude: { type: Number }, 
        longitude: { type: Number }
      }, // current location of the agent
      accuracy: { type: Number }, // accuracy of the GPS location (in meters)
    },
    leaveStatus: {
      leaveApplied: { type: Boolean, default: false },
      leaveStartDate: { type: Date },
      leaveEndDate: { type: Date },
      leaveType: { type: String, enum: ["Sick", "Personal", "Vacation"] },
      status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    },
    attendance: {
      daysWorked: { type: Number, default: 0 },
      daysOff: { type: Number, default: 0 },
      attendanceLogs: [
        {
          date: { type: Date, required: true },
          status: { type: String, enum: ["Present", "Absent"], default: "Present" },
          clockIn: { type: Date },
          clockOut: { type: Date },
        }
      ]
    },
    qrCode: { type: String }, // URL or data for generating agent's personal QR code
    incentivePlans: [
      {
        planName: { type: String, required: true },
        conditions: { type: String }, // e.g., 'Complete 10 deliveries to earn $50'
        rewardAmount: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      }
    ],
    availabilityStatus: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
