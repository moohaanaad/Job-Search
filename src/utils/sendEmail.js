import nodemailer from "nodemailer"


const sendEmail = async({from='"mohanad 👻" <mohanadahmed266@gmail.com>', to, subject="HR",html}={}) => {

    const transporter = nodemailer.createTransport({
        service:"gmail",
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "mohanadahmed266@gmail.com",
          pass: "osukmerefeoepryk",
        },
      });
      const info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text: "Hello world?", // plain text body
        html, // html body
      });
} 


export default sendEmail
