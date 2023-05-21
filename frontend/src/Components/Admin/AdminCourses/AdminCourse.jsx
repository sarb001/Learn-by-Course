import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React , { useState } from 'react'
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallcourses, getCourseLectures } from '../../../Redux/actions/course';

import  { toast } from 'react-hot-toast';

const AdminCourses = () => {
  
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

   const disptach = useDispatch();
   const { courses ,lectures } = useSelector(state => state.course);

   const {  message ,loading ,error  }  = useSelector(state => state.admin);

  const coureDetailsHandler = () => {
    disptach(getCourseLectures(courseId))
    onOpen();
  }

   const deleteButtonHandler = () => {
    
   }

   const deleteLectureButtonHandler = () => {
     
   }

    const addLectureHandler = () => {

    }

    useEffect(() => {

         if(error){
           toast.error(error);
           disptach({ type:"clearError" });
         }

         if(message){
          toast.success(message);
          disptach({ type:"clearMessage"});
        }

        disptach(getallcourses())
    },[disptach,error,message,onClose])

  return (
    <div> 

         <Grid minH = {'100vh'} 
          templateColumns={['1fr','5fr 1fr']}>
          <Box p={['0', '8']} overflowX="auto">
                <Heading
                  textTransform={'uppercase'}
                  children="All Courses"
                  my="16"
                  textAlign={['center', 'left']}
                />

                <TableContainer w={['100vw', 'full']}>
                  <Table variant={'simple'} size="lg">
                    <TableCaption>All available courses in the database</TableCaption>

                    <Thead>
                      <Tr>
                        <Th>Id</Th>
                        <Th>Poster</Th>
                        <Th>Title</Th>
                        <Th>Category</Th>
                        <Th>Creator</Th>
                        <Th isNumeric>Views</Th>
                        <Th isNumeric>Lectures</Th>
                        <Th isNumeric>Action</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {courses.map(item => (
                        <Row
                          coureDetailsHandler={coureDetailsHandler}
                          deleteButtonHandler={deleteButtonHandler}
                          key={item._id}
                          item={item}
                          loading = {loading}
                        />
                      ))}
                    </Tbody>

                  </Table>
                </TableContainer>

                  <CourseModal
                    isOpen =  {isOpen}
                    onClose = {onClose}  
                    courseTitle={courseTitle}
                    deleteButtonHandler={deleteLectureButtonHandler}
                    addLectureHandler={addLectureHandler}
                    lectures = {lectures}
                    loading = {loading}
                    /> 
            </Box>  
        <Sidebar />
      </Grid>
    </div>
  )
}

export default AdminCourses

const Row = ({item, coureDetailsHandler, deleteButtonHandler}) => (

    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        {/* <Image src={item.poster.url} /> */}
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>  {item.numofVideos} </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coureDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
)