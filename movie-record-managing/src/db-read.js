/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import './table-style.css'

export default function DBRead() {
    let [data, setData] = React.useState('')

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
        let tb = (
        <table>
        <tr>
            <th class="thLeft">ชื่อสินค้า</th><th>ราคา</th>
            <th>วันที่เพิ่มสินค้า</th><th class="thLeft">รายละเอียด</th>
        </tr>
        {
        result.map(doc => {
            //จัดรูปแบบวันเดือนปี ที่สามารถเข้าใจได้
            let dt = new Date(Date.parse(doc.date_added))
            let df = (
                <>{dt.getDate()}-{dt.getMonth()+1}-{dt.getFullYear()}</>
            )
            let p = new Intl.NumberFormat().format(doc.price)
            
            return (
            <tr>
                <td>{doc.name}</td>
                <td class="tdCenter">{p}</td>
                <td class="tdCenter">{df}</td>
                <td>{doc.detail}</td>
            </tr>
            )
        })
        }
        </table>
        )
    
        setData(tb)
    }

    return (
        <div style={{margin:'20px'}}>
            <div id="data">{data}</div>
            <br/>
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}