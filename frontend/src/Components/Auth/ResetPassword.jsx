import { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetpassword } from '../../Redux/actions/profile';
import { useDispatch } from 'react-redux';


const ResetPassword = () => {

    const [password, setPassword] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const {loading , message , error} = useSelector(state => state.profile);

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(resetpassword(token,password))
    }

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch({type:"clearError" })
      }
      if(message){
        toast.success(message);
        dispatch({type:"clearMessage" })
      }
    },[dispatch,error,message])  

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
                        isLoading = {loading}
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