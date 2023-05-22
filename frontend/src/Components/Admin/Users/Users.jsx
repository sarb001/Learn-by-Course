import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar'
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getallUsers, updateuser } from '../../../Redux/actions/admin';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';


const Users = () => {

   const { users, loading ,error, message } = useSelector(state => state.admin);
   const disptach = useDispatch();

  const updateHandler = (userId)  => {
     disptach(updateuser(userId))
  }

  const deleteButtonHandler = (userId)  => {
     disptach(deleteUser(userId))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      disptach({ type: 'clearError' })
    }

    if (message) {
      toast.success(message);
      disptach({ type: 'clearMessage' })
    }

     disptach(getallUsers());
  }, [disptach, error, message]);

  return (
    <div>
      <Grid minH = {'100vh'} 
      templateColumns={['1fr','5fr 1fr']}>
        <Box  p = {['0', '16']} overflowX="auto">

        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']} />  

        <TableContainer w = {['100vw', 'full']}>
              <Table variant={'simple'} size="lg">
                <TableCaption>  
                  All available users in the database
                </TableCaption>

                    <Thead>
                      <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Subscription</Th>
                        <Th isNumeric>Action</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {users &&  users.map(item => (
                          <Row 
                            updateHandler = {updateHandler}
                            deleteButtonHandler={deleteButtonHandler}
                            key={item._id}
                            item={item} 
                            loading = {loading}
                          />
                        ))}
                    </Tbody>
              </Table>
        </TableContainer>

          </Box>
        <Sidebar />
      </Grid>
    </div>
  )
}

export default Users


const Row = ({item  , updateHandler , deleteButtonHandler  ,loading  }) => 
{
   return (
    <Tr>
       <Td> # {item._id} </Td>
       <Td>  {item.name} </Td>
       <Td>  {item.email} </Td>
       <Td>  {item.role} </Td>
       <Td> 
          {/* {item.subscription.status === "active" ? "Active" : "Not Active" } */}
       </Td>

     <Td isNumeric>
      <HStack justifyContent = {'flex-end'}>
           <Button onClick = {() =>  updateHandler(item._id)}  
           variant={'outline'} color = 'purple.500' 
           isLoading = {loading} >
              Change Role
           </Button>
           <Button color = 'purple.600' 
            onClick={() => deleteButtonHandler(item._id)} 
            isLoading = {loading} >
              <RiDeleteBin7Fill />
           </Button>
      </HStack>
     </Td>
    </Tr>
   )
}