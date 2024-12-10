<script>
  import { supabase } from '../../../lib/supabase';
  import { writable } from 'svelte/store';
  import { navigate } from 'svelte-routing';

  let username = writable('');
  let password = writable('');
  let errorMessage = writable('');
  let successMessage = writable('');

  const loginUser = async () => {
    errorMessage.set('');
    successMessage.set('');

    const userName = $username;
    const passWord = $password;

    if (!userName || !passWord) {
      errorMessage.set('Please fill in both username and password');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, password')
        .eq('username', userName)
        .single(); 

      if (error) throw error;

      if (data.password === passWord) {
        localStorage.setItem('userId', data.id);
        successMessage.set('Login successful!');
      } else {
        errorMessage.set('Invalid password');
      }
    } catch (error) {
      errorMessage.set('Invalid username or error occurred');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 10px;
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }

  .register-button {
    background-color: #007BFF;
  }

  .register-button:hover {
    background-color: #0056b3;
  }
</style>

<h1>Login</h1>

<form on:submit|preventDefault={loginUser}>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" bind:value={$username} placeholder="Username" />
  </div>

  <div>
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={$password} placeholder="Password" />
  </div>

  {#if $errorMessage}
    <div class="error">{$errorMessage}</div>
  {/if}

  <button type="submit">Login</button>
</form>

{#if $successMessage}
  <div class="success">{$successMessage}</div>
{/if}

<button class="register-button" on:click={goToRegister}>Don't have an account? Register here</button>
