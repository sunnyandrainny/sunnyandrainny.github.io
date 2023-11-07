import { useEffect, useState } from "react";
import useFetch from "../customize/fetch";
import moment from "moment";
const Table = () => {
    const today = moment().startOf('day').toISOString(true)
    const priorDate = moment().startOf('day').subtract(31, 'days').toISOString(true)
    const {data: dataShoe, isLoading, isError} = useFetch('https://api.shoe.gorokiapp.com/api/shoes', true)
    return(
        <div style={{background: '#282c34', color: 'white'}}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && isLoading === false && dataShoe && dataShoe.length > 0 &&
                        dataShoe.map(item => {
                            return(
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        })
                    }
                    {isLoading === true
                    && <tr>
                        <td colSpan='3' style={{textAlign: "center"}}>Loading...</td>
                    </tr>
                    }
                    {isError === true
                    && <tr>
                        <td colSpan='3' style={{textAlign: "center"}}>Something is wrong...</td>
                    </tr>
                    }
                </tbody>
        </table>
      </div>
    )
}
export default Table;