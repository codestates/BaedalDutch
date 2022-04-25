import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, ErrorMessage, Form, Input, Label } from '../styled/signup';

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const { nickname, email, password } = getValues();
    console.log(nickname, email, password);
  };

  const nickPattern = {
    value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
    message: '숫자, 영어, 한글만 입력해주세요',
  };

  const emailPattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: '이메일 형식으로 입력해주세요',
  };
  const passwordPattern = {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    message: '8자이상 / 영문 / 숫자 / 특수문자를 조합해주세요',
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label for="nickname">닉네임</Label>
        <Input
          error={errors.nickname?.message}
          {...register('nickname', {
            required: '닉네임을 꼭 입력해 주세요',
            pattern: nickPattern,
            minLength: { value: 2, message: '최소 2 글자 이상을 입력해 주세요' },
            maxLength: { value: 8, message: '최대 8 글자 이하로 입력해 주세요' },
          })}
          placeholder="2~8글자"
          id="nickname"
        ></Input>
        <ErrorMessage>{errors.nickname?.message}</ErrorMessage>
        <Label for="email">이메일</Label>
        <Input
          error={errors.email?.message}
          {...register('email', {
            required: '이메일을 꼭 입력해 주세요',
            pattern: emailPattern,
          })}
          placeholder="이메일을 입력하세요"
          id="email"
        ></Input>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Label for="password">비밀번호</Label>
        <Input
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 꼭 입력해 주세요',
            pattern: passwordPattern,
          })}
          placeholder="패스워드를 입력하세요"
          id="password"
        ></Input>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Label for="passwordCheck">비밀번호 확인</Label>
        <Input
          error={errors.passwordCheck?.message}
          {...register('passwordCheck', {
            required: '비밀번호를 똑같이 입력해 주세요',
            validate: {
              matchpassword: (value) => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다';
              },
            },
          })}
          placeholder="패스워드를 재입력하세요"
          id="passwordCheck"
        ></Input>
        <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
        <Button type="submit">가입신청</Button>
      </Form>
    </Container>
  );
};

export default Signup;
