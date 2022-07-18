import nodemailer from 'nodemailer'

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        secure: true,
        // auth: {
        //     user: process.env.SMTP_EMAIL,
        //     pass: process.env.SMTP_PASSWORD
        // },
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: "14928484089-ofrovk65dbc96skbcet0he9tgtkn0qor.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04-gkKijT58t5CgYIARAAGAQSNwF-L9IrZsxgcZJuxNgupUd4Ntzd4MCdDEQoQEXBuusUU2XpFke9xP7DTRLEHGlOP7IrXXvwMWo",
            accessToken: "ya29.a0ARrdaM_Tv1p_vl5wdutb4LMvPHjQ8H8OtBEkGYXQ5vrXdTp5Qzqer-QrINFulTB7s12ugCa3sFLw0cvTgUA2pURVyjoMB_uxRM8esz_Ltr4A14MJcxQOaf1RCm_ywe88L2yibJIC6NzgGuYBtXpj4fVaP4lO",
            expires: 1484314697598,
        },
    });

    const message = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
}

export default sendEmail