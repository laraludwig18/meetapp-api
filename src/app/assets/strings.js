export const ERROR_STRINGS = {
  unexpectedError: 'Houve um erro, tente novamente mais tarde.',
  createMeetup: {
    pastDate: 'Não é permitido criar eventos com datas passadas.',
    payload: {
      title: 'Título é obrigatório.',
      description: 'Descrição é obrigatória.',
      location: 'Localização é obrigatória.',
      date: 'Data é obrigatória.',
      banner: 'Banner é obrigatório.',
    },
  },
  updateMeetup: {
    pastMeetup: 'Eventos passados não podem ser editados.',
    unauthorized: 'Você não pode editar este evento.',
    pastDate: 'Não é permitido editar eventos com datas passadas.',
  },
  removeMeetup: {
    pastMeetup: 'Não é possivel cancelar eventos que já aconteceram.',
    unauthorized: 'Você não pode cancelar este evento.',
  },
  session: {
    invalid: 'O login e/ou a senha digitados estão incorretos.',
    payload: {
      email: 'Email é obrigatório.',
      password: 'Senha é obrigatória.',
      invalidEmail: 'Email inválido.',
    },
  },
  token: {
    invalid: 'Token inválido.',
    notFound: 'Token não encontrado.',
  },
  createSubscription: {
    notFound: 'Não foi possivel encontrar o evento selecionado.',
    pastMeetup: 'Você não pode se inscrever em eventos que já aconteceram.',
    ownMeetup: 'Você não pode se inscrever nos seus próprios eventos.',
    alreadySubscribed: 'Você já se inscreveu para este evento.',
    sameTimeMeetup:
      'Você já se inscreveu para outro evento neste mesmo horário.',
  },
  removeSubscription: {
    notFound: 'Não foi possivel encontrar a inscrição.',
    pastMeetup:
      'Não é possivel cancelar inscrição em eventos que já aconteceram.',
  },
  createUser: {
    alreadyExist: 'Usuário já existente.',
    payload: {
      name: 'Nome é obrigatório.',
      email: 'Email é obrigatório.',
      password: 'Senha é obrigatória.',
      invalidEmail: 'Email inválido.',
      invalidPassword: 'Senha deve possuir, no mínimo, 6 caracteres.',
    },
  },
  updateUser: {
    alreadyExist: 'Usuário já existente.',
    passwordDoesNotMatch: 'Senhas não coincidem.',
    payload: {
      invalidEmail: 'Email inválido.',
      invalidPassword: 'Senha atual deve ter, no mínimo, 6 caracteres.',
      newPassword: 'Nova senha é obrigatória.',
      invalidNewPassword: 'Nova senha deve possuir, no mínimo, 6 caracteres.',
      confirmPassword: 'Confirmação de senha é obrigatória.',
      invalidConfirmPassword: 'Nova senha e sua confirmação não coincidem.',
    },
  },
};
