import React from 'react'
import './css/table-style.css'

export default function DBUpdate() {
    let [data, setData] = React.useState('')
    const form = React.useRef()
    const name = React.useRef()
    const year = React.useRef()
    const Rate = React.useRef()

    React.useEffect(() => {
        fetch('/api/db/read')
            .then(response => response.json())
            .then(result => {
                if (result.length > 0) {
                    showData(result)
                } else {
                    setData(<>ไม่มีรายการข้อมูล</>)
                }
            })
            .catch(err => alert(err))
    }, [])

    const showData = (result) => {
        let r = (
            <form onSubmit={onSubmitForm} ref={form}>
            <table id="tableUpdate">
                <thead>
                    <tr>
                        <th>UPDATE</th><th class="thLeft">Movie Title</th>
                        <th>Year Release</th><th class="thLeft">Rate</th>
                    </tr>
                </thead>
                <tbody>
                {
                result.map(doc => {
                    return (
                        <tr key={doc._id}>
                             <td class="tdCenter">
                                <input type="radio" name="_id" value={doc._id} onClick={() => onClickRadio(doc)} />
                            </td>
                            <td>{doc.movie_title}</td>
                            <td className="tdCenter">{doc.YearRL}</td>
                            <td>{doc.Rate}</td>
                        </tr>
                    )
                })
                }
                
                <tr style={{ backgroundColor: 'lightgray' }}>
                        <td><button>update</button></td>
                        <td><input type="text" name="name" ref={name} required /></td>
                        <td><input type="number" name="year" ref={year} min="1900" max="2100" required /></td>
                        <td><input type="text" name="Rate" ref={Rate} required /></td>
                    </tr>
                </tbody>   
            </table>
                <div style={{textAlign:'center'}}>เลือกรายการที่ต้องการแก้ไขแล้วใส่ข้อมูลใหม่ลงไป จากนั้นคลิกปุ่ม แก้ไข</div>
            </form>
        )

        setData(r);
    }

    const onSubmitForm = (event) => {
        event.preventDefault()
        if (!window.confirm('ยืนยันการแก้ไขรายการนี้')) {
            return
        }
        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())

        fetch('/api/db/update', {
            method: 'POST',
            body: JSON.stringify(fe),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    alert(result.error)
                } else {
                    showData(result)
                    form.current.reset()
                    alert('ข้อมูลถูกแก้ไขแล้ว')
                }
            })
            .catch(err => alert(err))
    }

    const onClickRadio = (doc) => {
        name.current.value = doc.name
        year.current.value = doc.year
        Rate.current.value = doc.Rate
    }

    return (
        <div style={{ margin:'20px' }}>
            <div id="data">{data}</div>
            <br />
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}


