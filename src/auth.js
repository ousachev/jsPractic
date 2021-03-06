export const getAuthForm = () => {
  return `
        <form class="mui-form" id="authForm">
        <div class="mui-textfield mui-textfield--float-label">
            <input id="email" type="email" required/>
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input id="password" type="password" required/>
            <label for="password">Пароль</label>
        </div>
        <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary">
        Войти
        </button>
</form>
    `;
}

export const authWithEmailAndPassword = (email, password) => {
  const apiKey = "AIzaSyAPsX7SyNWi82gzXMYEMFsjEjmwtzins7o";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data.idToken);
}
