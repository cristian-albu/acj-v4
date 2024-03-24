"use server";
import { calendar_v3, google } from "googleapis";

const googleAuthKey = JSON.stringify({
  type: process.env.G_TYPE,
  project_id: process.env.G_PROJECT_ID,
  private_key_id: process.env.G_PRIVATE_KEY_ID,
  private_key: process.env.G_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  client_email: process.env.G_CLIENT_EMAIL,
  client_id: process.env.G_CLIENT_ID,
  auth_uri: process.env.G_AUTH_URI,
  token_uri: process.env.G_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.G_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.G_CLIENT_X509_CERT_URL,
  universe_domain: process.env.G_UNIVERSE_DOMAIN,
});

export const createCalendarClient = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: googleAuthKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });
    return calendar;
  } catch (error) {
    console.error("Error creating calendar client:", error);
    throw error;
  }
};

export const getEvents = async () => {
  const calendar = await createCalendarClient();

  const res = calendar.calendarList.list();
  //   const res = calendar.events.list({
  //     calendarId: "primary",
  //     timeMin: new Date().toISOString(),
  //     maxResults: 10,
  //     singleEvents: true,
  //     orderBy: "startTime",
  //   });

  console.log(res);

  //   return res.data.items;
};
