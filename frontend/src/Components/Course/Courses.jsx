
import React, { useEffect, useState } from 'react';
import { Container , Heading , Input  ,Button , Text , HStack, VStack, Stack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getallcourses } from '../../Redux/actions/course';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../Redux/actions/profile';


const Course = ({views,title,imageSrc,id,addToPlaylistHandler,creator,description,lectureCount}) => {
         return(
          <>
           <VStack className="course" alignItems={['center', 'flex-start']}>
                 <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
                    <Heading
                    textAlign={['center', 'left']}
                    maxW="200px"
                    size={'sm'}
                    fontFamily={'sans-serif'}
                    noOfLines={3}
                    children={title}
                    />
                     <Text noOfLines={2} children={description} />

                    <HStack>
                        <Text
                        fontWeight={'bold'}
                        textTransform="uppercase"
                        children={'Creator'}
                        />
                    <Text
                    fontFamily={'body'}
                    textTransform="uppercase"
                    children={creator}
                    />
                    </HStack>

                    <Heading
                    textAlign={'center'}
                    size="xs"
                    children={`Lectures - ${lectureCount}`}
                    textTransform="uppercase"
                    />

                    <Heading
                    size = "xs"
                    children={`Views - ${views}`}
                    textTransform="uppercase"
                    />

                <Stack direction={['column', 'row']} alignItems="center">
                                <Link to={`/course/${id}`}>
                                <Button colorScheme={'yellow'}> Watch Now </Button>
                                </Link>
                    <Button
                    variant={'ghost'}
                    colorScheme={'yellow'}
                    onClick={() => addToPlaylistHandler(id)}>
                    Add to playlist
                    </Button>
                </Stack>
                  </VStack>
          </>
         )
}


const Courses = () => {

  const [category, setCategory] = useState('');
  const [keyword, setKeyword]   = useState('');

  const dispatch =  useDispatch();

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const addToPlaylistHandler = (id) => {
    console.log('playerer');
    dispatch(addToPlaylist(id))
  }

   const { courses , error , message } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(getallcourses(category,keyword))

    if(error){
      toast.error(error);
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"})
    }

  }, [category, keyword, dispatch, error, message]);


  return (
    <div>
       <Container   minH   = {'95vh'} maxW="container.lg" paddingY={'8'}>
             <Heading children = "All Courses Here " m={'8'} />

                     <Input
                        value = {keyword}
                        onChange={e => setKeyword(e.target.value)}
                        placeholder="Search a course..."
                        type={'text'}
                        focusBorderColor="yellow.500" />

                    <HStack
                        overflowX={'auto'}
                        paddingY="8"
                        css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        }}>
                        {categories.map((item, index) => (
                        <Button key={index} onClick={() => setCategory(item)} minW = {'60'}>
                            <Text children={item} />
                        </Button>
                        ))}
                    </HStack>

                    <Stack
                    direction={['column', 'row']}
                    flexWrap="wrap"
                    justifyContent={['flex-start', 'space-evenly']}
                    alignItems={['center', 'flex-start']}>


               {courses?.length > 0 ? 
               (courses.map(item => (
                    <Course
                      key={item._id}
                      title={item.title}
                      description={item.description}
                      views={item.views}
                      id={item._id}
                      creator={item.createdBy}
                      lectureCount={item.numOfVideos}
                      addToPlaylistHandler={addToPlaylistHandler}
                    />
                  ))
                ) : 
              (
                <Heading mt="4" children="Courses Not Found" />
              )}

                 </Stack>
             </Container>
    </div>
  )
}

export default Courses