import { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Redux/actions/profile';
import { loaduser } from '../../Redux/actions/user';

const UpdateProfile = ({user}) => {
  
  const [name, setName]   = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch =  useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name,email));
    dispatch(loaduser())
  }

  const { loading } = useSelector(state => state.profile);

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
            isLoading = {loading}
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