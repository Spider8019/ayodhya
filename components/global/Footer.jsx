import React from 'react';
import { Avatar,Tooltip,tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
      },
}));

const contributors=[{
  name:"Aman Pratap Singh",
  url:"contributor1.jpg"
},{
  name:"Anjali Singh",
  url:"contributor2.jfif"
}]
const Footer = () => {
  return <div
            className="bg-amber-500 "
         >
            <div className="py-8 px-20">
                <ul className="grid grid-cols-1">
                  <li>
                    <Link href="/gallery">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a>Tourism</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a>Literature</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a>Talent</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a>Gallery</a>
                    </Link>
                  </li>
                </ul>
            </div>
            <div className="bg-amber-400 py-8 px-20 flex justify-between">
              <div>
                <div>
                    <p>Ayodhya</p>
                    <h1 className='text-4xl'>Ikshvaku</h1>
                </div>
                <div className="mt-4">
                  <p className='text-xs'>© 2006–2022 Ikshvaku & Spider8019, Inc. All rights reserved.</p>
                </div>
              </div>
              <div className='w-3/12'>
                <p className="text-xl mb-4 ">Contributors</p>
                <div className='flex flex-wrap'>
                  {contributors.map((item,key)=>{
                        return(
                          <BootstrapTooltip key={key} title={item.name}>
                            <Avatar 
                              className='m-1'
                              src={`/static/contributors/${item.url}`} alt={item.name} />
                          </BootstrapTooltip>
                        )
                  })}
                </div>
              </div>
            </div>

         </div>;
};

export default Footer;
