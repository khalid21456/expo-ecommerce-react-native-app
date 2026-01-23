const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("../config/db.js");
const { User } = require("../models/user.model");

const router = express.Router();

router.post(
  "/clerk-webhook",
  bodyParser.json(),
  async (req, res) => {
    const event = req.body;

    await connectDB();

    try {
      // USER CREATED
      if (event.type === "user.created") {
        const { id, email_addresses, first_name, last_name, image_url } =
          event.data;

        await User.create({
          clerkId: id,
          email: email_addresses[0]?.email_address,
          name: `${first_name || ""} ${last_name || ""}`,
          imageUrl: image_url,
          addresses: [],
          wishList: [],
        });
      }

      // USER DELETED
      if (event.type === "user.deleted") {
        await User.deleteOne({ clerkId: event.data.id });
      }

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Webhook error:", err);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
