import './App.css';
import Captcha from './lib/Captcha';
import { useEffect, useState } from 'react'

const providerSerice = "http://127.0.0.1:8080/captcha"
const apiSerice = "http://127.0.0.1:8080/captcha"
const authKey = '0564912a98114f96bef4360fa9b2d00a'

function App() {

	const [token, setToken] = useState('')
	const [expire, setExpire] = useState(0)

	useEffect(() => {
		
		const fetchData = async () => {
			// 从服务器请求获取验证Token
			const resp = await fetch(`${providerSerice}/auth/${authKey}`)
			const data = await resp.json()
			const { expire, token } = data

			setToken(token)
			setExpire(expire)

		}
		fetchData().catch(console.error);

	}, [])

	return (
		<div className="App">
			<div className='captcha'>
				<Captcha
					width='230px'
					height='60px'
					color='#eee'
					bgcolor='#333'
					apiServer={apiSerice}
					token={token}
				/>
			</div>
		</div>
	);
}

export default App;
