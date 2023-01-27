import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
// const header=(props)=>{

//  return(   <div>
//         <h1>
//             Campaign Project
//         </h1>
//     {props.children}
//     </div>);
// };
export default props=>{
    return(  
        <Container>
  <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
    <div>
      <Header/>
      
    {props.children}
    </div>
    </Container>
    );
};