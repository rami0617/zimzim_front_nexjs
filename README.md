# <img src="./src/assets/icon/icon.svg" alt="ZIMZIM" width="20" color="black"/>ZIMZIM

이 프로젝트는 리액트, 함께 사용하는 프레임워크, 라이브러리들에 대해 깊게 탐구해보고자 만든 프로젝트입니다.

## 기술스택

- React
- Typescript
- Vite
- Redux-toolkit
- React-router-dom
- TawilindCss

### 기술 스택 도입

- react
  - react 18과 그 이후 기술들, 선언형 UI와 단방향 데이터 흐름들에 대한 이해를 높이기 위해 선택했습니다.
- vite
  - webpack은 다양하게 커스터마이징 할 수 있다는 장점이 있지만 세밀한 설정이 필요 없었고, 가볍고 빠르게 개발할 수 있는 vite를 선택하게 되었습니다.
- redux-toolkit
  - react가 가지고 있는 단방향 데이터 흐름과 일치하는 flux 패턴 기반의 상태관리 라이브러리로 상태관리를 간소화하고 예측 가능하게 해줍니다.
- tailwindCSS
  - 유틸리티 기반의 css 프레임워크로 빠르고 일관된 디자인을 적용하기 위해 선택했습니다.
- chart.js
  - 프로젝트에서 대부분 단순한 차트를 표시할 예정이기 때문에, 다양한 커스터마이징이 가능한 D3.js보다는 간소한된 API를 제공하는 chart.js를 선택했습니다.
- clsx
  - tailwindCss와 동적 클래스를 많이 사용하는 경우 조건부 클래스들을 쉽게 관리하기 위해 선택했습니다.

## 프로젝트 구성

- pages > layout > components
  - Login > Layout > LoginForm, SignUpLink, SocialLoginButton
  - SignUp > Layout > SignupForm
  - Dashboard > UserLayout > TotalChart
  - Water > UserLayout > ...
  - Exercise > UserLayout > ...

## 기술적인 고민

1. input의 공통컴포넌트를 만들 때 controlled component와 uncontrolled component로 나누어 만드는 것은 어떨까?
   링크(https://ramirami.tistory.com/200)

## 기능

- 로그인, 로그아웃
  ![화면 기록 2024-08-25 오후 12 37 02](https://github.com/user-attachments/assets/b42db316-fc60-49fc-9191-987e0af24e3b)
- 회원가입
- 운동기록 추가, 수정, 삭제
- 운동기록 차트로 보기
