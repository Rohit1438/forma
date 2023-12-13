import React, { useContext, useEffect, useState } from "react";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import styled from "styled-components";
import { Divider } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Textarea } from "@chakra-ui/react";
import { DataContext } from "../Context/DataContextProvider";
const BASE_URL = "http://localhost:8080/api/v1";
const token = localStorage.getItem("formatoken") || "";

const Form = () => {


  const { id } = useParams();
  const { allforms, setAllforms, form, setform,formName, setformName, questions, setquestions } =useContext(DataContext);
  const fetchQuestions = async () => {
    console.log("form questions", id);
    try {
      let res = await axios.get(
        `${BASE_URL}/forms/questionsforsubmission/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      res = await res.data;
      console.log(res);
      //   await setformName((pre) => res.formName);
      if (res.message !== "questions not found for the form") {
        setformName((pre) => res.formName);
        await setquestions((pre) => [...res.questions]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  console.log(questions);
  return (
    <Div>
      <div className="form">
        {/* sx={{ border: "1px  solid #7e22ce"}}   */}
        <FormControl>
          <div
            className="formTitle"
            style={{ color: "#7E22CE", fontSize: "4rem", fontWeight: "800",borderBottom:"10px solid #cc91ff" }}
          >
          
           {formName}
           
          </div>
          <FormLabel >Your email</FormLabel>
              <Input sx={{border:"1px solid #2258ce51"}}
                type='text'
          
              />
<FormHelperText>email is necessary*</FormHelperText>
{questions.map((el,i)=>{

    if(el.questionType=="mcq"){
    return(


<div className="question">
<p>
    {i+1}. {el.title}
</p>

<Stack spacing={[1]} direction={['column']}>
  
  <Checkbox size='md' color={"black"} colorScheme='green' >
{el.options[0]}
  </Checkbox>
  <Checkbox size='md' colorScheme='green'  >
  {el.options[1]}
  </Checkbox>
  <Checkbox size='md' colorScheme='green'  >
  {el.options[2]}
  </Checkbox>
  <Checkbox size='md' colorScheme='green'  >
  {el.options[3]}
  </Checkbox>
</Stack>

</div>





    )
    }else if(el.questionType=="cloze"){
let arr=el.title.split(`${el.answer}`)
console.log(arr)
return(
<div className="question">
<p>{i+1}. {arr[0]} ___________{arr[1]}</p>
<FormLabel>Type your Answer </FormLabel>
              <Input
                type='text'
                sx={{border:"1px solid #0d101851"}}
              />
</div>


)

    }else if(el.questionType=="comprehension"){
        let arr=el.title.split(`${el.answer}`)
        console.log(arr)
        return(
        <div className="question">
        <p>{i+1}. {el.title}</p>
        <p style={{fontStyle:"italic",fontWeight:"bolder",fontSize:"15px"}}>{`Comprehention: ${el.description}`}</p>
        <FormLabel>Type your Answer </FormLabel>
              <Input
                type='text'
                sx={{border:"1px solid #0d101851"}}
              />
        </div>
        
        
        )
        
            }
})}





          {/* <FormLabel>Type your Question </FormLabel>
          <Input type="text" />

          <br />
          <FormLabel>Comprehension</FormLabel>

          <Textarea
            sx={{ height: "60vh", borderRadius: "15px", height: "100px" }}
            type="text"
          />

          <FormLabel>answer </FormLabel>
          <Input type="text" /> */}
                      <Button
              colorScheme='green'
              sx={{ backgroundColor: '#7E22CE' }}
              ml={3}
      
            >
              Submit
            </Button>
        </FormControl>
      </div>
    </Div>
  );
};

export default Form;
const Div = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  color: black;
  color: white;
  align-items: center;
  padding-top: 20px;
  background-color: #ab4cffd9;
  .question{
    margin: 20px 0px 20px;
    background-color: #faf4ffed;
    padding: 20px;
    border-radius: 10px;
  }
  .form {
    margin: auto;
    border: 1px solid red;
    background-color: white;
    box-sizing: border-box;
    position: fixed;
    min-height: 80vh;
    border-radius: 15px;
    width: 60%;
    text-align: left;
    border: 20px solid #ab4cffd9;
    color: black;
    padding: 30px;
    /* height: 100vh; */
    position: sticky;
  }
`;
