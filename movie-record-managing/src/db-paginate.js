/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import './table-style.css'
import './paginate-style.css'

export default function DBPaginate() {
    let [data, setData] = React.useState('')
    let [page, setPage] = React.useState([])

    React.useEffect(() => {	
        //อ่าน Query String ที่ปรากฏบน URL ของเบราเซอร์ในขณะนั้น
        let qStr = window.location.search
        let params = new URLSearchParams(qStr)

        //นำส่วน Query String ไปต่อท้าย URL เป้าหมายของฝั่งเซิร์ฟเวอร์
		fetch('/api/db/paginate?' + params)
		.then(response => response.json())
		.then(result => {      
            if (result.totalDocs > 0) { //หากมีข้อมูลผลลัพธ์
                showData(result.docs)   //แสดงรายการข้อมูล
                showPages(result)       //แสดงหมายเลขเพจ
            } else {
                setData(<>ไม่มีรายการข้อมูล</>)
            }
		})
        .catch(err => alert(err))
    }, [])

    //ฟังก์ชันสำหรับแสดงรายการข้อมูล แล้วเปลี่ยนค่าใน state
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

    //ฟังก์ชันสำหรับสร้างหมายเลขเพจ แล้วเปลี่ยนค่าใน state
    const showPages = (result) => {
        //เพื่อความสะดวก เราจะจัดเก็บลิงก์ของแต่ละเพจไว้ในอาร์เรย์
		let links = []

        //วนลูปตามจำนวนหมายเลขเพจที่แบ่งได้
		for (let i = 1; i <= result.totalPages; i++) {	
			if (i === result.page) {    //เพจปัจจุบันไม่ทำลิงก์
				links.push(<span class="page-active">{i}</span>)
			} else {
                //กำหนดลิงก์ของเพจ โดยกำหนดหมายเลขในแบบ Query String
                //แล้ววางต่อท้าย URL ของฝั่งโลคอลหรือของคอมโพเนนต์นั่นเอง
                let a = <a href={'/db/paginate?page=' + i} class="page">{i}</a>
				links.push(a)
			}
		}

        setPage(links)  //เปลี่ยนค่าใน state
    }

    return (
        <div style={{margin:'20px'}}>
            <div id="data">{data}</div>
            <br/>
            {/* 
                เนื่องจากเราจัดเก็บลิงก์หมายเลขเพจไว้ในอาร์เรย์ (อยู่ใน state)
                ดังนั้น เมื่อจะแสดงผลก็ต้องอ่านจากอาร์เรย์
            */}
            <div>{page.map(p => <>{p}</>)}</div>

            <br/>
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}