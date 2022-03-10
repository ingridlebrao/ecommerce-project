class Login {
  constructor() {
    this.form = ".login__form-input";
    this.emailInput = ".login__form-email";
    this.passInput = ".login__form-password";
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let values = this;

    const form = document.querySelector(this.form);

    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      const emailInput = document.querySelector(this.emailInput);
      const passInput = document.querySelector(this.passInput);

      const email = emailInput.value;
      const password = passInput.value;
      console.log("Email", email);
      console.log("Password", password);

      values.getData(email, password);
    });
  }

  async getData(email, password) {
    const response = await fetch("https://test-final.b8one.academy/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    return response;
  }
}

new Login();

