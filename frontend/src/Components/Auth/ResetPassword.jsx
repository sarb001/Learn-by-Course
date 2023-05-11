import { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetpassword } from '../../Redux/actions/profile';


const ResetPassword = () => {

    const [password, setPassword] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(resetpassword(token,password))
    }

  return (
    <div> 
              <Container py={'16'} h="90vh">
      <form onSubmit = {submitHandler}>
                    <Heading
                    children="Reset Password"
                    my="16"
                    textTransform={'uppercase'}
                    textAlign={['center', 'left']} />

            <VStack spacing={'8'}>  
                    <Input
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="New Password"
                        type={'password'}
                        focusBorderColor="yellow.500"
                    />

                        <Button 
                            type = "submit"
                            w = {'full'}
                            colorScheme="yellow"
                        >  Reset Password   </Button>
            </VStack>
      </form>
    </Container>
    </div>
  )
}

export default ResetPassword