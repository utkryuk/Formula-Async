import React from 'react';
import {
  AiFillGithub
} from 'react-icons/ai'
import {
  MailIcon
} from "@heroicons/react/solid"
import FooterIcon from './FooterIcon'

import Link from 'next/link'


const Footer = () => {
  return <div className = "bottom-0 z-20 bg-gray-200 dark:bg-black justify-center py-5 lg:py-10 lg:px-5 shadow-lg">

  <h3 className = "flex text-gray-400 justify-center font-semibold">
    Made by <span className = "link px-2 text-gray-500">FormulaSync</span>
    
  </h3>
<div className = "flex text-gray-400 justify-center">

<Link href="https://github.com/utkryuk/Formula-Async">  
<a>
      <span><FooterIcon Icon = {AiFillGithub}/></span>
    </a>
    </Link>
<Link href = "mailto:formulaonemongo@gmail.com">
  <a>
  <span><FooterIcon Icon = {MailIcon}/>    </span>
  </a>
  </Link>


   </div>
</div>
};

export default Footer;
