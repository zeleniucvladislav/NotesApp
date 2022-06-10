export const registerFields = [
  {
    type: "email",
    name: "email",
    validation: {
      required: "This field is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email",
      },
    },
    label: "Email",
  },
  {
    type: "text",
    name: "username",
    validation: {
      required: "This field is required",
      maxLength: {
        value: 50,
        message: "Username should not exceed 50 characters",
      },
    },
    label: "Username",
  },
  {
    type: "password",
    name: "password",
    validation: {
      required: "This field is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    label: "Password",
  },
  {
    type: "password",
    name: "repeatPwd",
    validation: {
      required: "This field is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    label: "Repeat Password",
  },
];
