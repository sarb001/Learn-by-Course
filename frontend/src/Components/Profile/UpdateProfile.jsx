import { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
// import { updateprofile } from '../../Redux/actions/profile';

const UpdateProfile = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch =  useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch(updateprofile(name,email));
  }

  return (
    <div>

    <Container py="16" minH={'90vh'}>
            <form onSubmit = {submitHandler}>
              <Heading
                textTransform={'uppercase'}
                children="Update Profile"
                my="16"
                textAlign={['center', 'left']}
              />

        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="yellow.500"
          />{' '}

          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          
          <Button 
            w="full"
            colorScheme={'yellow'}
            type = "submit"
          >  Update </Button>
        </VStack>
      </form>
    </Container>

    </div>
  )
}

export default UpdateProfile