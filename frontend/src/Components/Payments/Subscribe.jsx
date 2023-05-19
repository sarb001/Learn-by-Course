import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import logo from '../../Assests/Images/logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { buySubscription } from '../../Redux/actions/user';
import { toast } from 'react-hot-toast';
import { server } from '../../Redux/store';
import axios from 'axios';

const Subscribe = ({user}) => {

   const dispatch = useDispatch();
   const [key,setkey] = useState(' ');

   const { loading , error , subscriptionId  } = useSelector(state => state.subscription);

   const subscribeHandler =  async() => {
      const { data : {key} } = await axios.get(`${server}/razorpaykey`);

      setkey(key);
      console.log('key is -',key);
      dispatch(buySubscription());
  }

   useEffect(() => {
     if(error){
      toast.error(error);
      dispatch({ type: "clearError" });
     }

     if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'CourseBundler',
          description: 'Get access to all premium content',
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: '6 pack programmer at youtube',
          },
          theme: {
            color: '#FFC800',
          },
        };

          // const razor = new Razorpay(options);
         const razor  = new window.Razorpay(options);
         razor.open();
      };
      openPopUp();
    }
   },[dispatch,error,key,user.name,user.email,subscriptionId])


  return (
    <div>
       <Container h="90vh" p="16">
        <Heading children = "Welcome" my="8" textAlign={'center'} />
            <VStack 
              boxShadow={'lg'}
              alignItems="stretch"
              borderRadius={'lg'}
              spacing="0" >

              <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
                <Text color={'black'} children={`Pro Pack - ₹299.00`} />
              </Box>

          <Box p="4">
                <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
                  <Text children={`Join pro pack and get access to all content.`} />
                  <Heading size="md" children={'₹299 Only'} />
                </VStack> 

              <Button
                my="8"
                w="full"
                colorScheme={'yellow'}
                onClick = {subscribeHandler} 
                isLoading = {loading} >  Buy Now  </Button>
          </Box>

          <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
            <Heading
              color={'white'}
              textTransform="uppercase"
              size="sm"
              children={'100% refund at cancellation'}
            />

            <Text
              fontSize={'xs'}
              color="white"
              children={'*Terms & Conditions Apply'}
            />
          </Box>
            </VStack>
    </Container>
    </div>
  )
}

export default Subscribe