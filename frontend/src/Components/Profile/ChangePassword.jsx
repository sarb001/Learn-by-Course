import React , {  useEffect, useState  } from 'react';
import { Button, Container, Heading, Input, Toast, VStack, useToast } from '@chakra-ui/react';

import  { useDispatch, useSelector } from 'react-redux';
// import { changepassword } from '../../Redux/actions/profile';

import { toast } from 'react-hot-toast';

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // const dispatch =  useDispatch();
    // const toast = useToast();

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(changepassword(oldPassword,newPassword));
  }

  // const { loading , message , error } = useSelector(state => state.profile);

  // useEffect(() => {
  //   if(error){
  //     toast.error(error);
  //     dispatch({type:"clearError"});
  //   }

  //   if(message){
  //     toast.error(message);
  //     dispatch({type:"clearMessage"});
  //   }
  // },[dispatch,error,message])


  return (
    <div> 
          <Container py="16" minH={'90vh'}>

          <form onSubmit = {submitHandler}>
            <Heading
              textTransform={'uppercase'}
              children="Change Password"
              my="16"
              textAlign={['center', 'left']}
            />

            <VStack spacing={'8'}>
              <Input
                required
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Old Password"
                type={'password'}
                focusBorderColor="yellow.500"
              />

              <Input
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password"
                type={'password'}
                focusBorderColor="yellow.500"
              />

              <Button
              // isLoading = {loading}
                w="full"
                colorScheme={'yellow'}
                type="submit"
              >
                Change
              </Button>
            </VStack>
          </form>

          </Container>
    </div>
  )
}

export default ChangePassword