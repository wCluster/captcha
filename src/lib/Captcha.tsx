import React, { CSSProperties } from 'react';
import { useEffect, useState } from 'react'
import CaptchaWindow from './CaptchaWindow'
import './Captcha.css'

interface CaptchaProp {
  style?: CSSProperties
  apiServer?: string
  token: string
  onSuccess?: Function
  onReset?: Function
}

const Captcha: React.FC<CaptchaProp> = ({
  style,
  apiServer = "https://api.wzh.one/captcha",
  token,
  onSuccess,
  onReset
}) => {

  const [state, setState] = useState(1)
  const [info, setInfo] = useState("点击验证")
  const [show, setVisible] = useState(false)

  useEffect(()=>{
    setInfo("点击验证");
    setState(1)
    setVisible(false)
    onReset?.call(null)
  },[token])

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
        const ret = onSuccess?.call(null)
        if (typeof ret === "string")
          setInfo(ret);
        else
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...style,
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
