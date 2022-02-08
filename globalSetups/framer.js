export const zeroHeightAndWidth = {
    initial:{
        maxHeight:0,
        overflow:"hidden",
    },
    final:{
        maxHeight:"550px",
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2
          }
    }
 }

 export const xMove={
    initial: { x:"-50", opacity:0 },
    final: { x:0, opacity:1 }
 }

 export const opacity={
    initial: {opacity:0 },
    final: {opacity:1 }  
 }

 export const siedEntrance={
     initial:{x:"-10%",opacity:0},
     final:{
         x:"0%",
         opacity:1,
         transition:{
             duration:0.5
         }
    }
 }