export const passwordRequired = {
  code: 'INVALID_PAYLOAD',
  message: [
    {
      field: 'password',
      message: 'Senha é obrigatória.',
    },
  ],
};

export const notFoundUserError = {
  code: 'INVALID_LOGIN',
  message: 'O login e/ou a senha digitados estão incorretos.',
};
