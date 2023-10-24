import React from 'react'
import './css/form-style.css'

export default function DBCreate() {
	const form = React.useRef()
	const [Rate, setRate] = React.useState('G');
	const rates = [ 'G', 'PG', 'M', 'MA', 'R'];

	const onSubmitForm = (event) => {
		event.preventDefault()

		const fd = new FormData(form.current)
		const fe = Object.fromEntries(fd.entries())

		fetch('/api/db/create', {
			method: 'POST',
			body: JSON.stringify({...fe , Rate} ),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.json())
			.then(result => {
				form.current.reset()
				alert('ข้อมูลถูกจัดเก็บแล้ว')

			})
			.catch(err => alert('เกิดข้อผิดพลาด ข้อมูลไม่ถูกบันทึก'))
	}

	return (
		<div style={{ paddingTop: '20px' }} >
			<form id="form-create" onSubmit={onSubmitForm} ref={form} >
				<div >
					<label>Movie Title</label>
					<input type="text" name="name" required />
				</div><br />
				<div>
					<label>Year Release</label>
					<input type="Number" name="year" min="1900" max="2100" required />
				</div><br />
				<div>
					<label>Rating</label>
					<select
            			value={Rate}
            			onChange={(e) => setRate(e.target.value)}
            			required >
						{rates.map((r) => (
                    		<option key={r} value={r} >
                        		{r}
                    		</option>
                		))}
					</select>
				</div><br/>
				<div>
					<button style={{ backgroundColor: 'blue', float: 'left' }}><a href="/db" style={{ textDecoration: 'none', color: 'white' }}>หน้าหลัก</a></button>
					<button style={{ float: 'right' }}>ตกลง</button>
				</div>
				<br/><br/>
			</form>
		</div>
	)
}
