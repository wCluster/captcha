import React from 'react';
import { useEffect, useState, useCallback } from 'react'
import './Captcha.css';


interface CaptchaWindowProp {
    apiServer: string
    token: string
    show: boolean
    hideWindow: any
    success: any
}

const CaptchaWindow: React.FC<CaptchaWindowProp> = ({
    apiServer,
    token,
    show,
    hideWindow,
    success
}) => {

    const [rnd, setRnd] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [titleUrl, setTitleUrl] = useState("")
    const [tagList, setTagList] = useState<any>([])

    useEffect(() => {
        if (token) {
            setImgUrl(`${apiServer}/image/${token}?r=${rnd}`)
            setTitleUrl(`${apiServer}/title/${token}?r=${rnd}`)
        }
    }, [token, rnd])

    const refresh = useCallback(async () => {
        clean()
        const resp = await fetch(`${apiServer}/refresh/${token}`)
        const _ = await resp.json()
        setRnd(Math.random())
    }, [token])

    const clean = useCallback(async () => {
        setTagList([])
    }, [token])

    const captchaClick = useCallback((e: any) => {
        const x = e.pageX - e.target.getBoundingClientRect().left
        const y = e.pageY - e.target.getBoundingClientRect().top
        const newList = [...tagList, [x, y]]
        setTagList(newList)

    }, [tagList])

    const tagClick = useCallback((e: any) => {
        const id = parseInt(e.target.innerHTML) - 1
        const newList = tagList.slice(0, id)
        setTagList(newList)
    }, [tagList])

    const submit = useCallback(async (e: any) => {

        e.preventDefault()

        const resp = await fetch(`${apiServer}/check/${token}`, {
            method: "POST",
            body: JSON.stringify({
                data: tagList
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resp.json()
        clean()
        if (data.detail == 'success') {
            hideWindow()
            success()
        } else {
            alert(data.detail)
            refresh()
        }

    }, [tagList, token])

    return (
        <div
            className="x-captcha-window"
            style={{
                display: show ? 'flex' : 'none',
            }}
        >
            <div className='xcaptcha-header'>
                <img src={titleUrl}></img>
            </div>
            <div className='xcaptcha-content'>
                <img onClick={captchaClick} src={imgUrl}></img>
                {
                    tagList.map((i: any, index: number) => {
                        return <div
                            key={`${i[0]}-${i[1]}`}
                            className='tag'
                            style={{ left: i[0], top: i[1] }}
                            onClick={tagClick}
                        >
                            {index + 1}
                        </div>
                    })
                }
            </div>
            <div className='xcaptcha-bottom'>
                <div className='xcaptcha-left'>
                    <div className="xcaptcha-but xcaptcha-close"
                        onClick={(e: any) => hideWindow(e)}
                    ></div>
                    <div className="xcaptcha-but xcaptcha-about"></div>
                    <div className="xcaptcha-but xcaptcha-refresh"
                        onClick={refresh}
                    ></div>
                </div>
                <div className='xcaptcha-right'>
                    <button onClick={submit}>确认</button>
                </div>
            </div>
        </div>
    )


}

export default CaptchaWindow;
