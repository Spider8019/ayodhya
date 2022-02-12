import React, { Component } from "react";
import Slider from "react-slick";
import Head from "next/head";
import styles from "../../styles/pages/Talent.module.css"

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    return (
      <>
          <Head>
                <title>Talent - Ikshvaku</title>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          </Head>
          <div className={`my-20 ${styles.parentContainer}`}>

            <h2 className="text-2xl mb-8">Photography</h2>
            <div className={styles.slickContainer}>
                <Slider {...settings}>
                <div className={styles.slickBox} >
                    
                    <h3>1</h3>
                </div>
                <div className={styles.slickBox}>
                    <h3>2</h3>
                </div>
                <div className={styles.slickBox}>
                    <h3>3</h3>
                </div>
                <div className={styles.slickBox}>
                    <h3>4</h3>
                </div>
                <div className={styles.slickBox}>
                    <h3>5</h3>
                </div>
                <div className={styles.slickBox}>
                    <h3>6</h3>
                </div>
                </Slider>
            </div>

        </div>
      </>
    );
  }
}