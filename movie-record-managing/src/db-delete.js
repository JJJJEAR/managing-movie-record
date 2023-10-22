import React from 'react'
import './table-style.css'

export default function DBDelete() {
    let [data, setData] = React.useState('')
    const form = React.useRef()

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

    const onSubmitForm = (event) => {
        event.preventDefault()

        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())
        if (Object.keys(fe).length === 0) {
            alert('ต้องเลือกรายการที่จะลบ')
            return
        }

        if (!window.confirm('ยืนยันการลบรายการนี้')) {
            return
        }

        fetch('/api/db/delete', {
            method: 'POST',
            body: JSON.stringify(fe),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    alert(result.error)
                } else {
                    if (result.length === 0) {
                        setData('ไม่มีรายการข้อมูล')
                    } else {
                        showData(result)
                    }
                    alert('ข้อมูลถูกลบแล้ว')
                }
            })
            .catch(err => alert(err))
    }

    const showData = (result) => {
        let r = (
            <form onSubmit={onSubmitForm} ref={form}>
            <table>
                <thead>
                    <tr >
                        <th>DELETE</th><th class="thLeft">Movie Title</th>
                        <th>Year Release</th><th class="thLeft">Rate</th>
                    </tr>
                </thead>
                <tbody>
                {
                result.map(doc => {
                    return (
                        <tr key={doc._id}>
                             <td class="tdCenter">
                                <input type="radio" name="_id" value={doc._id} />
                            </td>
                            <td>{doc.movie_title}</td>
                            <td className="tdCenter">{doc.YearRL}</td>
                            <td>{doc.Rate}</td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
                <br />
                <button>ลบรายการที่เลือก</button>
            </form>
        )

        setData(r)
    }

    return (
        <div style={{ margin: '20px' }}>
            <div id="data">{data}</div>
            <br />
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}


