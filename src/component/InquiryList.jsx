import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Inquiry.css';
import Paging from './Paging';

const InquiryList = () => {
    //db에 저장되어 있는 inquiry 요소를 가져오기 => listInquiry 저장
    const [ listInquiry, setListInquiry ] = useState([]);

    //비동기로 db에 접속하여 select로 가져오기
    // get : 데이터 가져올때 (생략 가능)
    // post : 데이터 보낼때 (반드시 써야 함)
    const getBoardData = async() =>{
        try{
            const boards = await axios.get('/list');
            console.log(boards);
            setListInquiry(boards.data);
        }catch(error){
            console.log(error);
        }
    } 

    //컴포넌트가 랜더링 될 때, 혹은 업데이트 될 때 실행되는 hooks
    useEffect(()=>{
        getBoardData();
    },[]);

    const writerName = (writer) =>{
        const maskName = writer.split('');
        maskName[1]='*';
        return maskName.join('');
    }


    const [ currentPage, setCurrentPage ] = useState(1);

    const itemPerPage = 7;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 한페이지 목록 슬라이스
    //현재 페이지의 마지막 문의의 인덱스 
    const indexOfLastInquiry = currentPage * itemPerPage;
    //현재 페이지의 첫 번째 문의의 인덱스
    const indexOfFirstInquiry = indexOfLastInquiry - itemPerPage;
    //현재 페이지에 대한 문의만 포함하는 새 배열을 만드는 방법
    const currentInquiries = listInquiry.slice(indexOfFirstInquiry, indexOfLastInquiry);

    

    if(listInquiry.length > 0){
        //안에 return
        return (
            <div className='inquiryList'>
                <h2>문의 내역</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>문의유형</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentInquiries.map( i => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.type}</td>
                                    <td>
                                        <Link to={`/contents/${i.id}`} className='link'>{i.title}</Link>
                                    </td>
                                    <td>{writerName(i.writer)}</td>
                                    <td>{i.reg_date.substring(0, i.reg_date.indexOf("T"))}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Paging 
                    currentPage={currentPage}
                    itemCount={listInquiry.length}
                    itemPerPage={itemPerPage}
                    onPageChange={handlePageChange}
                />
                <Link to={'/form'}><button>문의하기</button></Link>
            </div>
        );
    }
};

export default InquiryList;