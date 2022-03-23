import React from 'react'

const Mpb = ({active}) => {
  return (
    <div className={`flex flex-row`}>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused'}}></div>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused',animationDelay:"0.1s"}}></div>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused',animationDelay:"0.4s"}}></div>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused',animationDelay:"0.2s"}}></div>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused',animationDelay:"0.3s"}}></div>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused',animationDelay:"0.8s"}}></div>
        <div className={`basicBreath`}  style={{animationPlayState:active?'running':'paused',animationDelay:"0.7s"}}></div>
    </div>
  )
}

export default Mpb