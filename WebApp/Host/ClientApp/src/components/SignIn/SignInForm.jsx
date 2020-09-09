import React from 'react';

import styles from './SignInForm.less'

const SignInForm = () => {
  return (
    <div className={styles.outerContainer}>
      <form>
        <label>
          Login
          <input type='text' name='login' />
        </label>

        <label>
          Password
          <input type='password' name='password' />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SignInForm
