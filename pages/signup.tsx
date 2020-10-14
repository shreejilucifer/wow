import React from 'react';
import Head from '../src/components/common/head';
import { useRouter } from 'next/router';
import styles from '../src/styles/light/login.module.css';
import { useLoginMutation } from '../src/generated/graphql';
import { Form, Formik } from 'formik';
import { toErrorMap } from '../src/utils/toErrorMap';
import { InputField } from '../src/components/common/inputfield';
import { withApollo } from '../src/utils/withApollo';

interface signupProps {}

const Signup: React.FC<signupProps> = ({}) => {
  const router = useRouter();
  const [login, { error }] = useLoginMutation();

  return (
    <div>
      <Head title='Sign up' />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img src='/icons/logo.svg' className={styles.logo} alt='logo' />
          <div className={styles.sitetitle}>wolf of wall street 3.0</div>
        </div>

        <Formik
          initialValues={{ mobile: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
            });

            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === 'string') {
                router.push(router.query.next);
              } else {
                router.push('/dashboard');
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.rightContainer}>
              <div className={styles.title}>Sign up</div>
              <div className={styles.greetings}>
                Welcome, <br /> Let's create your account
              </div>
              <InputField
                disabled={isSubmitting}
                type='text'
                placeholder='Name'
                name='name'
              />
              <InputField
                disabled={isSubmitting}
                type='text'
                placeholder='Email'
                name='email'
              />
              <InputField
                disabled={isSubmitting}
                type='text'
                placeholder='Phone no.'
                name='mobile'
              />
              <InputField
                disabled={isSubmitting}
                type='password'
                placeholder='Password'
                name='password'
              />
              <button
                disabled={isSubmitting}
                className={styles.loginButton}
                type='submit'
              >
                {isSubmitting ? 'loading...' : 'sign up'}
              </button>
              {error && (
                <div className={styles.error}>Please Try Again Later !</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(Signup);
