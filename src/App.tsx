import './App.css';
import Captcha from './lib/Captcha';
import { useEffect, useState } from 'react'

const apiSerice = "http://127.0.0.1:18080/captcha"
const authKey = '0564912a98114f96bef4360fa9b2d00a'

function App() {

	const [token, setToken] = useState('')
	const [expire, setExpire] = useState(0)

	const fetchData = async () => {
		// 从服务器请求获取验证Token
		const resp = await fetch(`${apiSerice}/auth/${authKey}`)
		const data = await resp.json()
		const { expire, token } = data

		setToken(token)
		setExpire(expire)
	}

	useEffect(() => {
		fetchData().catch(console.error);
	}, [])

	return (
		<div className="App">
			<div className='captcha'>
				<Captcha
					style={{
						width: '230px',
						height: '60px',
						color: '#eee',
						backgroundColor: '#333'
					}}
					apiServer={apiSerice}
					token={token}
					onSuccess={() => { console.log("success"); return "13" }}
					onReset={() => { console.log("reset") }}
				/>
				<button onClick={fetchData}>重置</button>
			</div>
		</div>
	);
}

export default App;
