import React from 'react'
import './form-style.css'

export default function DBCreate() {
	const form = React.useRef()
	
	const onSubmitForm = (event) => {
		event.preventDefault()

		const fd = new FormData(form.current)
		const fe = Object.fromEntries(fd.entries())

		fetch('/api/db/create', {
			method: 'POST',
			body: JSON.stringify(fe),
			headers: {'Content-Type':'application/json'}
		})
		.then(response => response.json())
		.then(result => {			
			form.current.reset()
			alert('ข้อมูลถูกจัดเก็บแล้ว')
			
		})
		.catch(err => alert('เกิดข้อผิดพลาด ข้อมูลไม่ถูกบันทึก'))
	}

    return (
    <form id="form-create" onSubmit={onSubmitForm} ref={form} >
		<label>Movie Title</label>
		<input type="text" name="name" required/><br/>
		<label>Year Release</label>
		<input type="Number" name="year" required/>
		<br/><br/>
		<label>Rate</label>
		<input type="text" name="rate" required/>
		<br/><br/>
		<div> 
            <button style={{backgroundColor:'blue',float:'left'}}><a href="/db" style={{textDecoration:'none',color:'white'}}>หน้าหลัก</a></button>
			<button style={{float:'right'}}>ตกลง</button>
        </div>
		<br/><br/>
	</form>
    )
}
