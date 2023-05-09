
import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { register } from '../../Redux/actions/user';
// import { register } from '../../Redux/actions/user';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
}

const fileUploadStyle = {
      '&::file-selector-button': fileUploadCss,    
}


const Register = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
 
  const dispatch = useDispatch();

  const submitHandler = (e)  => {
      e.preventDefault();
      const myForm = new FormData();

      myForm.append('name',name)
      myForm.append('email',email)
      myForm.append('password',password)

      dispatch(register(myForm));
  }

return (
  <div> 
      <Container h={'95vh'}>
          <VStack h={'full'} justifyContent="center" spacing={'16'}>
              <Heading textTransform={'uppercase'} children={'Registration'} />

              <form onSubmit = {submitHandler} style = {{ width: '100%' }}>
              <Box my={'4'}>
                  <FormLabel htmlFor="name" children="Name" />
                  <Input
                  required
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="abc"
                  type={'text'}
                  focusBorderColor="yellow.500"
                  />
              </Box>

              <Box my={'4'}>
                  <FormLabel htmlFor="email" children="Email Address" />
                  <Input
                  required
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                  type={'email'}
                  focusBorderColor="yellow.500"
                  />
              </Box>

              <Box my={'4'}>
                  <FormLabel htmlFor="password" children="Password" />
                  <Input
                  required
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  type={'password'}
                  focusBorderColor="yellow.500"
                  />
              </Box>

              {/* <Box my={'4'}>
                  <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
                  <Input
                  accept="image/*"
                  required
                  id="chooseAvatar"
                  type={'file'}
                  focusBorderColor="yellow.500"
                  css={fileUploadStyle}
                  onChange={changeImageHandler}
                  />
              </Box> */}

              <button style = {{backgroundColor:'red',padding:'3%'}}>
                  Sign Up
              </button>

              <Box my="4">
                  Already Signed Up?{' '}
                  <Link to="/login">
                  <Button colorScheme={'yellow'} variant="link">
                      Login
                  </Button>{' '}
                  here
                  </Link>
              </Box>
              </form>
          </VStack>
  </Container>
  </div>
)
}

export default Register