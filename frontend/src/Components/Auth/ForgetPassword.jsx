import React, { useState } from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { forgetpassword } from '../../Redux/actions/profile';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetpassword(email))
  };

  return (
    <div> 
          <Container py={'16'} h="90vh">
      <form onSubmit = {submitHandler}>
        <Heading
          children="Forget Password"
          my="16"
          textTransform={'uppercase'}
          textAlign = {['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type={'email'}
            focusBorderColor="yellow.500"
          />

          <Button
            type="submit"
            w={'full'}
            colorScheme="yellow"
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
    </div>
  )
}

export default ForgetPassword