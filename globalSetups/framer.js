export const zeroHeightAndWidth = {
    initial:{
        maxHeight:0,
        overflow:"hidden",
    },
    final:{
        maxHeight:"700px",
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2
          }
    }
 }

 export const pageTransition={
     initial:{
         y:"100%",
         opacity:0
     },
     animate:{
        y:"0",
        opacity:1,
        transition:{duration:1}
     },
     exit:{
         scale:0,
         y:"-100%"
     }
 }

 export const xMove={
    initial: { x:"-50", opacity:0 },
    final: { x:0, opacity:1 }
 }
 export const yMove={
    initial: { y:"50", opacity:0 },
    final: { y:0, opacity:1 }
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

 export const playerAnimation={
     initial:{
         opacity:0,
     },
     animate:{
         opacity:1,
     },
     exit:{
         opacity:0,
     }
 }

 export const playerFullChildLeft={
    initial:{
        x:"-50vw",
        opacity:0
    },
    animate:{x:0,opacity:1,transition:{duration:0.5}},
    exit:{
        x:"-50vw",
        opacity:0
    }
 }
 export const playerFullChildRight={
    initial:{
        x:"50vw",opacity:0
    },
    animate:{x:0,opacity:1,transition:{duration:0.5}}
 }

 export const pTransition={
    initial:{
        y:"100px",
        opacity:0
    },
    animate:{
        y:"0",
        opacity:1,
        transition:{
            duration:0.5
        }
    }
 }
