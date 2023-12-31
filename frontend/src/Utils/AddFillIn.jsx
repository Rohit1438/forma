import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
  } from '@chakra-ui/react'
  import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
  
import React, { useContext, useEffect, useState } from "react"
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react';
  import {useParams} from "react-router-dom"
import axios from "axios";
import { DataContext } from '../Context/DataContextProvider'
const BASE_URL = "https://mock61st.onrender.com/api/v1";
const token = localStorage.getItem("formatoken") || "";
export default function AddFillin() {
  const { allforms, setAllforms, form, setform,formName, setformName, questions, setquestions } =useContext(DataContext);
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  const [token,setToken]=useState("")
  useEffect(()=>{
    const formatoken = localStorage.getItem("formatoken") || "";
    setToken((pre)=>formatoken)
  },[])

  //   const cancelRef = React.useRef()
  // const [projectName, setProjectName] = useState('');

  // const handleCreate = () => {
  //   console.log('Project Name:', projectName);
  //   onClose();
  // };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();
  const [title, setTitle] = useState("");
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [op3, setOp3] = useState("");
  const [op4, setOp4] = useState("");
  const [formData, setFormData] = useState({});
const {id}=useParams()
  const handleCreate = async () => {
    try {
      console.log("mcq clicked",{  "questionType": "mcq",
      "title": title, "options":[op1,op2,op3,op4] });

      let res = await axios.post(
        `${BASE_URL}/forms/addquestions/${id}`,

        {  "questionType": "cloze",
           "title": title, "answer":op1 },
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(res)
      res=await res.data
      setquestions((pre) => [...pre,res]);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(op1,op2,op3,op4);
  return (
    <>
      <Button
        onClick={onOpen}
        sx={{
            padding:"35px 30px 35px",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      marginTop:"20px",
      display:"flex",
      alignItems:"center"
        }}
        size='lg'
        bg={"white"}

      >
         <svg
                xmlns="http://www.w3.org/2000/svg"
                width="61"
                height="61"
                viewBox="0 0 61 61"
                fill="none"
              >
                <path
                  d="M30.417 0.143921C24.4409 0.143921 18.599 1.91605 13.63 5.23621C8.66103 8.55637 4.78819 13.2754 2.50123 18.7966C0.214264 24.3179 -0.38411 30.3933 0.781774 36.2546C1.94766 42.1159 4.82544 47.4998 9.05119 51.7256C13.277 55.9513 18.6609 58.8291 24.5222 59.995C30.3835 61.1609 36.4589 60.5625 41.9801 58.2755C47.5013 55.9886 52.2204 52.1157 55.5405 47.1468C58.8607 42.1778 60.6328 36.3359 60.6328 30.3597C60.6328 22.346 57.4494 14.6605 51.7828 8.99393C46.1163 3.32737 38.4307 0.143921 30.417 0.143921ZM44.2939 43.7263C44.0327 44.1524 43.6132 44.4576 43.1274 44.575C42.6416 44.6925 42.1291 44.6127 41.7021 44.353C34.6069 40.0154 25.6765 39.035 15.1569 41.4389C14.6801 41.524 14.1888 41.4224 13.785 41.155C13.3812 40.8875 13.0958 40.4749 12.9881 40.0027C12.8804 39.5305 12.9587 39.0349 13.2066 38.6189C13.4546 38.2028 13.8532 37.8982 14.3198 37.7682C25.8287 35.1361 35.7037 36.2686 43.6672 41.1345C44.0903 41.3986 44.3918 41.8194 44.5058 42.3049C44.6199 42.7905 44.5372 43.3014 44.276 43.7263H44.2939ZM47.9914 35.4942C47.6645 36.0268 47.1397 36.408 46.5321 36.554C45.9244 36.7 45.2837 36.599 44.7505 36.2731C36.6303 31.2819 24.2485 29.836 14.6421 32.7501C14.0443 32.9318 13.3989 32.8685 12.8478 32.5743C12.2967 32.2801 11.885 31.7789 11.7033 31.1812C11.5217 30.5834 11.585 29.938 11.8792 29.3868C12.1734 28.8357 12.6746 28.424 13.2723 28.2424C24.244 24.9119 37.8926 26.5279 47.2125 32.2712C47.7391 32.5992 48.1146 33.1221 48.2572 33.7259C48.3997 34.3297 48.2978 34.9653 47.9735 35.4942H47.9914ZM48.3092 26.9308C38.5507 21.1428 22.4848 20.6146 13.1828 23.4347C12.8266 23.5423 12.4526 23.5787 12.0823 23.5417C11.712 23.5048 11.3527 23.3953 11.0247 23.2194C10.3623 22.8643 9.86817 22.2607 9.6509 21.5412C9.54333 21.185 9.50697 20.811 9.54391 20.4407C9.58085 20.0704 9.69036 19.7111 9.86619 19.3831C10.042 19.0551 10.2807 18.765 10.5687 18.5293C10.8566 18.2936 11.1882 18.1169 11.5444 18.0093C22.2207 14.7684 39.9607 15.3951 51.1742 22.0381C51.4934 22.2274 51.7722 22.4777 51.9946 22.7747C52.2171 23.0717 52.3789 23.4097 52.4707 23.7692C52.5626 24.1288 52.5827 24.5029 52.53 24.8703C52.4773 25.2376 52.3527 25.591 52.1634 25.9102C51.9742 26.2294 51.7239 26.5082 51.4268 26.7306C51.1298 26.9531 50.7918 27.1149 50.4323 27.2068C50.0727 27.2986 49.6986 27.3188 49.3313 27.266C48.9639 27.2133 48.6105 27.0888 48.2913 26.8995L48.3092 26.9308Z"
                  fill="#7BD568"
                />
                <path
                  d="M44.2758 43.7265C44.0146 44.1525 43.5951 44.4577 43.1094 44.5752C42.6236 44.6926 42.111 44.6128 41.684 44.3532C34.5889 40.0155 25.6584 39.0352 15.1388 41.439C14.662 41.5242 14.1707 41.4225 13.7669 41.1551C13.3631 40.8877 13.0777 40.475 12.97 40.0028C12.8623 39.5306 12.9406 39.035 13.1886 38.619C13.4365 38.2029 13.8352 37.8983 14.3017 37.7683C25.8106 35.1362 35.6856 36.2687 43.6491 41.1346C44.0752 41.3959 44.3804 41.8153 44.4979 42.3011C44.6153 42.7869 44.5355 43.2994 44.2758 43.7265Z"
                  fill="#010201"
                />
                <path
                  d="M47.9733 35.4943C47.6465 36.0269 47.1216 36.4081 46.514 36.5541C45.9064 36.7002 45.2656 36.5991 44.7324 36.2732C36.6122 31.282 24.2304 29.8361 14.624 32.7503C14.0263 32.9319 13.3808 32.8687 12.8297 32.5744C12.2786 32.2802 11.8669 31.7791 11.6853 31.1813C11.5036 30.5835 11.5669 29.9381 11.8611 29.387C12.1554 28.8358 12.6565 28.4242 13.2542 28.2425C24.2259 24.9121 37.8745 26.5281 47.1945 32.2713C47.724 32.5964 48.1032 33.118 48.2492 33.722C48.3952 34.326 48.296 34.9633 47.9733 35.4943Z"
                  fill="#010201"
                />
                <path
                  d="M48.2912 26.931C38.5505 21.143 22.4847 20.6147 13.1827 23.4349C12.8264 23.5425 12.4525 23.5788 12.0822 23.5419C11.7119 23.5049 11.3525 23.3954 11.0246 23.2196C10.3622 22.8645 9.86804 22.2608 9.65078 21.5414C9.5432 21.1851 9.50684 20.8112 9.54378 20.4409C9.58072 20.0706 9.69023 19.7112 9.86606 19.3833C10.0419 19.0553 10.2806 18.7652 10.5685 18.5294C10.8565 18.2937 11.1881 18.117 11.5443 18.0095C22.2206 14.7685 39.9606 15.3952 51.174 22.0382C51.4932 22.2275 51.772 22.4778 51.9945 22.7749C52.217 23.0719 52.3787 23.4098 52.4706 23.7694C52.5625 24.129 52.5826 24.5031 52.5299 24.8704C52.4772 25.2378 52.3526 25.5911 52.1633 25.9103C51.974 26.2295 51.7237 26.5083 51.4267 26.7308C51.1297 26.9533 50.7917 27.1151 50.4322 27.2069C50.0726 27.2988 49.6985 27.3189 49.3311 27.2662C48.9638 27.2135 48.6104 27.0889 48.2912 26.8996V26.931Z"
                  fill="#010201"
                />
              </svg>
              <div style={{ textAlign: "left", padding: "0px 20px 0px" }}>
                <p>Cloze</p>
       
              </div>
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        
      >
        <AlertDialogOverlay />

        <AlertDialogContent >

          <AlertDialogHeader>Cloze</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
            {/* <ButtonGroup size="sm" isAttached variant="outline">
                          <Button color='whatsapp'
                            onClick={() => {
                 setCount((pre)=>pre+1)
                            }}
                          >
                            -
                          </Button>
                          <Button color='whatsapp'
                            onClick={() => {
                    setCount((pre)=>pre-1)
                            }}
                          >
                            Number of options
                          </Button>
                          <Button color='red' onClick={()=>{}}>+</Button>
                        </ButtonGroup> */}


              <FormLabel>Your Sentence  </FormLabel>
              <Input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
              />
             

<br />
              <FormLabel>Type underline word </FormLabel>
  
              <Input
                type='text'
                onChange={(e) => setOp1(e.target.value)}
              />
          
              
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
              Cancel
            </Button>
            <Button
              colorScheme='green'
              sx={{ backgroundColor: '#7E22CE' }}
              ml={3}
              onClick={handleCreate}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}