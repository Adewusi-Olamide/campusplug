import { createClient } from "@/lib/supabase/client";

export async function trackActivity(activityType) {
  try {
    console.log("Tracking activity:", activityType);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("No logged-in user found");
      return;
    }

    const { error } = await supabase
    .from("user_activity")
    .insert({
      user_id: user.id,
      activity_type: activityType,
    });

    if (error) {
      console.error(
        "Activity tracking error:",
        JSON.stringify(error, null, 2)
      );
      return;
    }

  console.log("Activity tracked successfully:", activityType);

  } catch (error) {
    console.error(
      "Activity tracking failed:",
      JSON.stringify(error, null, 2)
    );
  }
}
