import { verifyWebhook } from "@clerk/express/webhooks";
import { User } from "../../models/auth/user.model.js";

export const clerkWebhook = async (req, res) => {
  try {
    const evt = await verifyWebhook(req);

    console.log(`Clerk webhook received: ${evt.type}`);

    // USER CREATED
    if (evt.type === "user.created") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      } = evt.data;

      const email = email_addresses?.[0]?.email_address;

      const name =
        [first_name, last_name].filter(Boolean).join(" ") ||
        email?.split("@")[0] ||
        "User";

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          clerkId: id,
          name,
          email,
          profilePic: image_url || "",
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log(`User created/synced: ${id}`);
    }

    // USER UPDATED
    if (evt.type === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      } = evt.data;

      const email = email_addresses?.[0]?.email_address;

      const name =
        [first_name, last_name].filter(Boolean).join(" ") ||
        email?.split("@")[0] ||
        "User";

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          name,
          email,
          profilePic: image_url || "",
        },
        {
          new: true,
        }
      );

      console.log(`User updated: ${id}`);
    }

    // USER DELETED
    if (evt.type === "user.deleted") {
      await User.findOneAndDelete({
        clerkId: evt.data.id,
      });

      console.log(`User deleted: ${evt.data.id}`);
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Clerk webhook error:", error);

    return res.status(400).json({
      success: false,
      message: "Webhook verification failed",
    });
  }
};