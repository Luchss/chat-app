
export const registerValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: "Username cannot be empty!",
        },
        isLength: {
            options: {
                min: 6,
                max: 24,
            },
            errorMessage: "Username should be at least 8 chars and max 24 chars"
        },
        isAlphanumeric: {
            errorMessage: "Only letters and numbers are allowed"
        },
        isString: true,
    },

    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty!",
        },
        isEmail: {
            errorMessage: "Must be an valid Email!"
        },
        isString: true,
        toLowerCase: true,
        trim: true,
    },

    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty!",
        },
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: "Password must be at least 8 chars"
        },
    }
};

export const loginValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty!",
        },
        isEmail: {
            errorMessage: "Must be an valid Email!"
        },
        isString: true,
        toLowerCase: true,
        trim: true,
    },

    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty!",
        },
    }
};

export const usernameSchema = {
  value: {
    in: ["body"],
    notEmpty: {
        errorMessage: "Username cannot be empty!",
    },
    isLength: {
      options: {
                min: 6,
                max: 24,
            },
      errorMessage: "Username should be at least 8 chars and max 24 chars"
    },
    isAlphanumeric: {
      errorMessage: "Only letters and numbers are allowed"
    },
    isString: true,
  }
};

export const emailSchema = {
  value: {
    in: ["body"],
    notEmpty: {
        errorMessage: "Email cannot be empty!",
    },
    isEmail: {
      errorMessage: "Invalid email address"
    },
    normalizeEmail: true,
    isString: true,
    toLowerCase: true,
    trim: true,
  }
};

export const passwordSchema = {
  value: {
    in: ["body"],
    notEmpty: {
        errorMessage: "Password cannot be empty!",
    },
    isLength: {
        options: {
            min: 8,
        },
        errorMessage: "Password must be at least 8 chars"
        }
    }  
};

