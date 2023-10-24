import React from 'react'
import '../css/table-style.css'

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
                <thead>
                    <tr>
                        <th className="thLeft">Movie Title</th>
                        <th>Year Release</th>
                        <th className="thLeft">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    result.map(doc => {
                        return (
                            <tr key={doc._id}>
                                <td>{doc.movie_title}</td>
                                <td className="tdCenter">{doc.YearRL}</td>
                                <td>{doc.Rate}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        )
        setData(tb)
    }

    return (
        <div style={{ margin: '20px' }}>
            <div id="data">{data}</div>
            <br />
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}