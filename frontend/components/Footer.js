import React from 'react';
import {
  MailIcon
} from "@heroicons/react/solid"
import FooterIcon from './FooterIcon'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return <div className = "bottom-0 z-20 bg-gray-800 dark:bg-black justify-center py-5 lg:py-10 lg:px-5 shadow-lg">

  <h3 className = "flex text-gray-500 justify-center font-semibold">
    Made by <span className = "link px-2 text-gray-400">FormulaSync</span>
    
  </h3>
<div className = "flex text-gray-400 justify-center">

<Link 
href="https://github.com/utkryuk/Formula-Async">  
<a>
      <span><GitHubIcon
      className="mx-8 my-2 cursor-pointer"
      /></span>
    </a>
    </Link>

<Link 

href = "mailto:formulaonemongo@gmail.com">
  <a>
  <span><EmailIcon
  className="mx-8 my-2 cursor-pointer"/></span>
  </a>
  </Link>


   </div>
</div>
};

export default Footer;
