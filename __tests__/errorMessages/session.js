export const passwordRequired = {
  error: 'Falha na validação',
  messages: [
    {
      name: 'ValidationError',
      path: 'password',
      type: 'required',
      errors: ['Senha é obrigatória.'],
      inner: [],
      message: 'Senha é obrigatória.',
      params: {
        path: 'password',
      },
    },
  ],
};
