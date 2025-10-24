import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [ true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    },
  
   cartItems: [
    {
           productId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Product",
           },
      quantity: {
        type: Number,
        default: 1,
      },
    },
    ],
   role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
   
   
   
}, { timestamps: true });



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;