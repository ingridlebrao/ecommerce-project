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

      this.getData(email, password);
    //   const data = 
    });
  }

  async getData(email, password) {
    const response = await fetch("http://172.20.10.10:3000/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((data) => data.json());

    return response;
  }
}

new Login();
