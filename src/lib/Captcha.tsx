import React from 'react';
import { useEffect, useState } from 'react'
import CaptchaWindow from './CaptchaWindow'
import './Captcha.css'

interface CaptchaProp {
  height?: string
  width?: string
  color?: string
  bgcolor?: string
  apiServer: string
  token: string
}

const Captcha: React.FC<CaptchaProp> = ({
  width,
  height,
  color,
  bgcolor,
  apiServer,
  token
}) => {

  const [state, setState] = useState(1)
  const [info, setInfo] = useState("点击验证")
  const [show, setVisible] = useState(false)

  useEffect(() => {
    switch (state) {
      case 0:
        setInfo("初始化中");
        break;
      case 1:
        setInfo("点击验证");
        break;
      case 2:
        setInfo("正在提交");
        break;
      case 3:
        setInfo("正在刷新");
        break;
      case 4:
        setInfo("验证成功");
        break;
    }
  }, [state])

  return (
    <div
      onClick={() => {
        if(state !=4 && state !=0 )
          setVisible(true)
      }}
      className="x-captcha"
      style={{
        width,
        height,
        color,
        backgroundColor: bgcolor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
      <span>{info}</span>
      <CaptchaWindow
        apiServer={apiServer}
        token={token}
        show={show}
        hideWindow={(e?:any) => {
          if (e) e.stopPropagation()
          setVisible(false)
        }}
        success={
          ()=>{
            setState(4)
          }
        }
      />
    </div>
  );
}

export default Captcha;
