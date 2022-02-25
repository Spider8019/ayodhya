import React, { useEffect, useState } from 'react';
import styles from '../../styles/Gallery.module.css'
import { useSession } from 'next-auth/react';
import useSWR,{mutate} from 'swr';
import { IconButton,Pagination,Stack,Button } from '@mui/material';
import {galleryPosts,markLikeAndDislike,getGigsCount} from "../../globalSetups/api"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InterestsIcon from '@mui/icons-material/Interests';
import _ from "lodash"
import { useRouter } from 'next/router';
import DashboardPost from "../../components/utils/galleryFrame"
import Head from "next/head"
import GalleryLoader from "../../components/global/GalleryLoader"
import {isMobile,MobileView} from "react-device-detect"
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
import Image from "next/image"
import { motion, useViewportScroll, useTransform, useMotionValue, useVelocity, AnimatePresence } from "framer-motion"
import { zeroHeightAndWidth,xMove } from '../../globalSetups/framer';
import useTranslation from 'next-translate/useTranslation'

const Events = () => {
    let { t } = useTranslation()

    return(
        <div className="grid relative"
        >
        <Head>
            <title>
                Events - Ikshvaku
            </title>
        </Head>
        <div className="sm:m-20">
            <div className='grid grid-cols-4 gap-8 '>
                <motion.div 
                    style={{boxShadow:"1px 1px 10px rgba(0,0,0,0.164)"}}
                    className="rounded overflow-hidden dark:bg-black grid grid-cols-1 grid-rows-2 h-auto">
                    <div className="relative">
                        <Image
                            src="/static/pages/holi_2022.jpg"
                            alt="Holi Ayodhya"
                            layout="fill"
                            objectFit='cover'
                        />
                    </div>
                    <div className="p-2">
                        <h2>{t('common:event.a.title')}</h2>
                        <p className="text-sm my-4">{t('common:event.a.body')}</p>
                        <button className='opacity-50 basicDarkButton'>Read More</button>
                    </div>
                </motion.div>
            </div>
        </div>

        </div>
    )
    
};

export default Events;



