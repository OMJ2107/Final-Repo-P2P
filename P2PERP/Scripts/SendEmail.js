function sendEmailAjax(emailObj, swalOptions) {
    // Step 1: Show loading Swal using the options provided
    Swal.fire({
        title: swalOptions.title || "Sending...",
        html: swalOptions.html || "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Step 2: Send email via AJAX
    return $.ajax({
        url: "/Account/SendEmail",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(emailObj),
        success: function (response) {
            Swal.close();

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    html: `<p>${response.message}</p><p>${swalOptions.html || "Please wait..."}</p>`,
                    showConfirmButton: false,
                    timer: 3000,
                    willClose: () => {
                        window.location.href = "/Account/VerifyCode";
                    }
                });
            } else {
                Swal.fire("Error", response.message, "error");
            }
        },
        error: function () {
            Swal.close();
            Swal.fire("Error", "Something went wrong while sending the email.", "error");
        }
    });
}
