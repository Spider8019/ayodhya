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
            <div className="py-8 px-20 grid grid-cols-6">
                <ul className="flex flex-col">
                  <li>
                    <Link href="/gallery">
                      <a className="my-2 block">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a className="my-2 block">About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a className="my-2 block">Tourism</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a className="my-2 block">Literature</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a className="my-2 block">Talent</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/audio#player">
                      <a className="my-2 block">Music</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <a className="my-2 block">Gallery</a>
                    </Link>
                  </li>
                </ul>
                <ul className="flex flex-col ">
                  <li>
                    <Link href="/literature?book=The%20Ramayana&chapter=****">
                      <a className="my-2 block">The Ramayana</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/literature?book=Hanuman%Ji&chapter=****">
                      <a className="my-2 block">Hanuman Ji</a>
                    </Link>
                  </li>
                </ul>
                <ul>

                </ul>
                <ul>

                </ul>
                <ul>

</ul>
                <ul>
                      <li>
                          <Link href="#">
                            <a className="my-2 block font-semibold">References</a>
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
