export const loginFields = [
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
];
