// Lắng nghe sự kiện gửi biểu mẫu
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định

    // Lấy giá trị từ các trường nhập liệu
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Kiểm tra dữ liệu nhập vào
    if (!fullName || !email || !subject || !message) {
        alert('Please fill out all required fields.');
        return;
    }

    // Gửi email qua EmailJS
    emailjs.send("service_6w8qz6c", "template_s2t1uyr", {
        from_name: fullName,
        from_email: email,
        phone_number: phoneNumber,
        subject: subject,
        message: message
    })
    .then(function(response) {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset(); // Reset form sau khi gửi thành công
    })
    .catch(function(error) {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again later.');
    });
});
