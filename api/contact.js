const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: "Nuevo mensaje del formulario de contacto",
            text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
        });

        return res.status(200).json({ success: "Mensaje enviado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al enviar el mensaje" });
    }
};
