const MESSAGE = {
  COMPLETED: (acting: string) => `${acting} 완료 되었습니다`,
  FORM: {
    REQUIRED: (acting: string) => `${acting} 입력해주세요`,
    MAX_LENGTH: (count: string) => `최대 ${count}까지 가능합니다`,
    EXERCISE: {
      DATE: '날짜를 입력해주세요',
      PT: 'PT 여부를 선택해주세요',
      DURATION: '운동 시간을 입력해 주세요',
      TYPE: '운동 종류를 입력해주세요',
      FORCE: '운동 강도를 입력해주세요',
    },
    LOGIN: {
      FAILURE:
        '아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요',
    },
    SIGNUP: {
      ID: {
        VALIDATION: '유효한 아이디를 입력해주세요',
      },
      NICKNAME: {
        MAX_LENGTH: '10글자 이하여야 합니다',
        VALIDATION: '유효한 닉네임을 입력해주세요',
      },
      PASSWORD: {
        MIN_LENGTH: '8글자 이상이어야 합니다',
      },
      PASSWORD_CONFIRM: {
        NOT_MATCH: '비밀번호가 일치하지 않습니다',
      },
    },
  },
};

export default MESSAGE;
