import React from 'react';
import {
  MailIcon
} from "@heroicons/react/solid"
import FooterIcon from './FooterIcon'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';

const Footer = () => {
  return <div className = "bottom-0 z-20 bg-gray-800 dark:bg-black justify-center py-5 lg:py-10 lg:px-5 shadow-lg">

  <h3 className = "flex text-gray-500 justify-center font-semibold">
    Made with ❤️ using &nbsp; <a className = "text-green-600" href = "https://mongodb.com/products/charts"> MongoDB Charts</a> 
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 30 30"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115c-.28-.394-.53-.954-.735-1.44c-.036.495-.055.685-.523 1.184c-.723.566-4.438 3.682-4.74 10.02c-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481a28.48 28.48 0 0 1 .51-3.07c.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695c-.381-.045-.765-1.76-.765-2.405z" fill="green"/></svg>
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
