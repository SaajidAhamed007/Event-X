import emailjs from "@emailjs/browser"

export const registerEmail = async (event,user) => {
  try {
    console.log(user)
      await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_NAME,
      import.meta.env.VITE_EMAILJS_REGISTER_TEMPLATE,
      {
        user_name: user.name,
        email:user.email,
        event_title:event.title,
        event_date:event.date.toDate().toLocaleDateString(),
        event_time:event.date.toDate().toLocaleTimeString(),
        event_format:event.format
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    console.log("email send successfully")
  } catch (error) {
    console.error(error.message)
  }
}

export const alertEmail = async () => {
  try {
    const res = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_NAME,
      import.meta.env.VITE_EMAILJS_ALERT_TEMPLATE,
      {
        email:"challengerr007@gmail.com",
        student_name: "Saajid",
        event_name: "TechTalk 2025",
        event_date: "June 25, 2025",
        event_time: "10:00 AM",
        event_location: "Main Auditorium",
        reminder_time: "2 days",
        checkin_time: "9:45 AM",
        support_contact: "+91 9876543210",
        organizer_name: "Eventx Team"
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    console.log("email send successfully");
  } catch (error) {
    console.log(error.message)
  }
}
