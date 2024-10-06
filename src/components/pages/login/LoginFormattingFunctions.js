function formatName(e) {
    let name = e.target.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿÇç\s]/g, "");

    if (name.length > 0) {
        name = name.replace(/\s+/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    if (name.length > 50) {
        name = name.slice(0, 50);
    }
    
    e.target.value = name;
}

function formatEmail(e) {
    const email = e.target.value.replace(/\s/g, "");
    e.target.value = email;
}

function formatPhone(e) {
    let phone = e.target.value.replace(/\D/g, "");

    if (phone.length > 0) {
        phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2"); 
    }

    if (phone.length > 10) {
        phone = phone.replace(/(\d{5})(\d)/, "$1-$2");
    }

    if (phone.length > 15) {
        phone = phone.slice(0, 15);
    }

    e.target.value = phone;
}

function formatPassword(e) {
    let password = e.target.value.trim().replace(/[^a-zA-Z\d]+/g, "");
    password = password.replace(/\s/g, "");

    if (password.length > 20) {
        password = password.slice(0, 20);
    }
    
    e.target.value = password;
}

const loginFormattingFunctions = {
    formatName,
    formatEmail,
    formatPhone,
    formatPassword,
}

export default loginFormattingFunctions;