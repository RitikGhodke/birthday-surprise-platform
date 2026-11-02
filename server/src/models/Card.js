import mongoose from 'mongoose';
const Card = new mongoose.Schema({
  slug: { type: String, unique: true, sparse: true, index: true },
  recipientName: { type: String, required: true, maxlength: 60, trim: true },
  // birthDate: { month: Number, day: Number },
  birthDate: { month: String, day: Number },
  style: { type: String, enum: ['card', 'arcade', 'fruitninja'], default: 'card' },
  options: { cake: String, bond: String, friendSticker: String },
  balloonWords: [{ type: String, maxlength: 20 }],
  letter: { type: String, maxlength: 2000 },
  texts: { type: Map, of: String },        // har title edit ho sakta hai
  passcodeHash: String,
  photos: [{ url: String, publicId: String }],
  editTokenHash: String,
  status: { type: String, enum: ['created', 'paid'], default: 'created' },
  razorpay: { orderId: { type: String, index: true }, paymentId: String },
  amount: Number,
  expiresAt: Date
}, { timestamps: true });
export default mongoose.model('Card', Card);
