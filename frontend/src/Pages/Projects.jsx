import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import image from "../Images/homepage1.png"
import { Link } from 'react-router-dom'
import AlertDialogExample from '../Utils/AddProject'
import { DataContext } from '../Context/DataContextProvider'
import Navbar from '../Components/Navbar'
import { AuthContext } from '../Context/AuthContextProvider'


const Projects = () => {
    const [open, setOpen] =useState(false);
    const forms=[1,2,3,4,5,6,7,8,9]
    const {allforms,setAllForms,form,setform,episodes,setEpisodes}=useContext(DataContext)
    const {user,setUser,token,setToken}=useContext(AuthContext)
    const [short,setShort]=useState("")
    console.log(allforms)
    const colors = ['#7E22CE', '#F8A01D', '#6366F1', '#F8A01D', '#6366F1','#6366F1','#7E22CE', '#F8A01D', ]; // Purple, Yellow, Green
  return (
    <>
    <Navbar/>
    
  
<Div>
    <div className='homeroute' >
<Link to={"/"} style={{color:"black",padding:"5px 20px",boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.06), 0.75032px 1.50064px 3.75159px 0px rgba(0, 0, 0, 0.06), 3.00127px 6.00254px 6.75286px 0px rgba(0, 0, 0, 0.05), 6.75286px 13.50572px 9.00381px 0px rgba(0, 0, 0, 0.03), 12.00508px 24.01017px 10.50445px 0px rgba(0, 0, 0, 0.01), 18.75794px 36.76557px 12.00508px 0px rgba(0, 0, 0, 0.00)",display:"flex",
alignItems:"center",justifyContent:"space-between",
borderRadius:"25px",marginBottom:"8px"}}>
<i class="fa-solid fa-house-user" ></i>
Back to Home</Link>
    </div>
    <div className='title' style={{display:"flex",justifyContent:"space-between"}}>
        <h1>
          forms
        </h1>
       <div>
       <AlertDialogExample/>
       </div>

    </div>

    {allforms.length!==0?
    <div className='formcards' >
{allforms?.map((el,index)=>{
 let res = el.title.split(" ");

 let a = res[0]?.slice(0, 1).toUpperCase() + ".";
 let b = res[1]?.slice(0, 1).toUpperCase();
 const colorIndex = index % colors.length;
 const backgroundColor = colors[colorIndex];
 return (
   <Link to={`/forms/${el._id}`} key={el._id}>
     <div className="formdiv" >
       <div className="formimg"style={{ backgroundColor }}>
         <h1 style={{ fontSize: "50px" }}>{a + b}</h1>
       </div>
       <div className="formdetails">
         <div>
           <p id="formname" style={{ fontSize: "18px" }}>
             {el.title}
           </p>
           <p style={{ fontWeight: "600", fontSize: "14px" }}>
             {el.questions.length} Questions
           </p>
         </div>
         <div>
           <p style={{ fontSize: "12px" }}>
             last updated {new Date(el.lastUpdated).toLocaleString()}
           </p>
         </div>
       </div>
     </div>
   </Link>


    )
})}
    </div>

    :
    <div>
  <p>oops 😥... it seems like there's nothing..</p>
  
</div>
}
</Div>:


</>
  )
}

export default Projects
const Div=styled.div`
width: 80%;
.formcards{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 50px 100px;

}
.formdiv{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
   

}
.formimg{
   background-color: #7E22CE;
   color: white;
   display: flex;
   align-items: center;
}
.formimg{
border-radius: 10px;
padding: 10px;
}
.homeroute{
   margin-top:10px;

display: flex;
align-items: left;
font-size: 15px;

}
.formdetails{
    padding-left: 30px;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.formdetails p{
    text-align: left;
    font-size: 15px;

margin: 5px;
}

#formname{
    color: #7E22CE;
    font-weight: 600;
}
margin: auto;
    .title>h1{
        color: #7E22CE;
        font-size: 40px;
        font-weight: 600;
        margin: 10px;
    }
.homebanner{

width: 95%;
text-align: center;
    margin: auto;
}
p{
    color: #838383;
text-align: center;
margin: 20px;
font-family: Roboto;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.homebanner>img{
    width: 40%;
    margin:auto}
    button{
        border-radius: 5px;
background: #211935;
color: white;
font-size: 20px;
padding: 10px 20px;
margin: 10px;
    }
`
