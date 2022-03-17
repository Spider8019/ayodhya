import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { isMobile } from 'react-device-detect';
import Head from 'next/head';
import Image from 'next/image';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
  return (

    <div className="m-4 sm:m-20">
        <Head>
            <title>Holi - 2022</title>
        </Head>
        <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
            Home
            </Link>
            <Link
            underline="hover"
            color="inherit"
            href="/events"
            >
            Festivals
            </Link>
            <Typography color="text.primary">Holi 2022</Typography>
        </Breadcrumbs>
        </div>

        <div className='mt-12 grid gap-8 items-start grid-cols-1  sm:grid-cols-[1fr_0.2fr]'        >


        <div className="festBlog">
            <p>Holi is known as the festival of love because on this day, people come together to forget about their resentments and negative feelings toward one another. This auspicious time begins on Purnima evening, or the full moon day in the first month of Falgun. On the first evening of the festival, it is known as Holika Dahan or Choti Holi, and the following day is known as Holi.</p>
            <p>The tradition begins with the lighting of a bonfire one day prior to Holi, and this act symbolises the triumph of good over evil. People play with colours with their friends and families on Holi Day, and they show love and respect to their loved ones with abeer in the evening.</p>
            <b className=" text-amber-500 text-xl my-4 block">History of Holi</b>
            <p>Holi is an ancient festival of India and was originally known as Holika</p>
            <b>Calculating day of Holi</b>
            <p>Holi is celebrated at the end of winter, on the last full moon day of the Hindu lunisolar calendar month marking the spring, making the date vary with lunar cycle.</p>
            <p>On the auspicious occasion of Pradosh Kaal, when day and night meet, Holika Dahan should be performed (which starts from the time of sunset). It must not be done, however, till Bhadra Tithi has passed. In India, the exact muhurta for Holika Dahan varies according to the region and time of sunset.
                A special puja is done in the afternoon, before the bonfire is lighted, to keep youngsters healthy and safe from evil influences.</p>
            <b className=" text-amber-500 text-xl my-4 block">Legend of Radha Krishna</b>
            <p>Krishna is noted for being a naughty and playful child. Krishna, according to legend, was envious of Radha&apos;s light complexion as a kid because he too was dark. Krishna once protested to his mother Yashoda about the natural inequity that caused Radha to be so fair while he was so dark. To calm the grieving Krishna, his adoring mother instructed him to go colour Radha&apos;s face in any colour he desired. In a mischievous mood, wicked Krishna followed mother Yashoda&apos;s suggestion and painted her beloved Radha&apos;s face with colour, making her look like him.</p>
            <p>Krishna&apos;s dark skin is explained by a mythology as well. Once upon a time, a demon sought to kill Krishna by feeding him poisoned milk. Krishna turned blue as a result of this. Krishna, on the other hand, did not die, and the demon shrivelled up into ashes. The lovely scene of Krishna&apos;s joke, in which he played colour with Radha and the other gopis, has been immortalised in a variety of paintings and murals.</p>
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-3 my-4">
                <Image
                  src="https://images.unsplash.com/photo-1617184003107-0df15fea4903?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Vrindavan Holi"
                  layout="responsive"
                  objectPosition={"0 25%"}
                  objectFit='cover'
                  className="rounded"
                  height={0.5}
                  width={1}
                />
                                <Image
                  src="https://i.pinimg.com/474x/61/91/22/619122e2047f584c1684a8433e21deb9.jpg"
                  alt="Vrindavan Holi"
                  layout="responsive"
                  objectFit='cover'
                  objectPosition={"0 25%"}
                  className="rounded"
                  height={0.5}
                  width={1}
                />
                <Image
                  src="https://i.pinimg.com/736x/bf/3b/3c/bf3b3c1be4ea9c7df40f055b7a9d85c1.jpg"
                  alt="Vrindavan Holi"
                  layout="responsive"
                  objectPosition={"0 25%"}
                  objectFit='cover'
                  className="rounded"
                  height={0.5}
                  width={1}
                />
            </div>
        </div>
        <div className='border border-gray-400 p-4 rounded'>
            <p className='text-3xl font-semibold text-gray-400'>Saturday, 19 March</p>
            <p>In Uttar Pradesh</p>
        </div>
        </div>
    </div>
  );
}
