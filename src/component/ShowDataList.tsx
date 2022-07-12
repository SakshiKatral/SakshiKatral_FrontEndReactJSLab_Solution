import { useEffect, useState } from "react";
import DataList from "../model/DataList";
import { getDataFromServer } from "../services/DataServices";
import ExpenseTracker from "./ExpenseTracker";

const ShowDataList = () => {
    const [items, setItems] = useState<DataList[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [sum, setSum] = useState<number | null>()
    const [sakshiSpent, setSakshiSpent] = useState<number>(0)
    const [sonaliSpent, setSonaliSpent] = useState<number>(0)
    const [showform, setShowForm] = useState<boolean>(false)

    var sakshiSpentTemp: number = 0
    var sonaliSpentTemp: number = 0

    
    const fetchMenu = async () => {
        try {
            const data = await getDataFromServer()
            setItems(data)
            Shares(data)
            setSum(data.reduce((result, newItem) => result = result + newItem.price, 0))
            // console.log({sum})
            
        }
        catch (error: any) {
            setError(error);
        }
    }

    const Shares = (data: DataList[]) => {
        data.map(
            tempData => (
                tempData.payeeName === "Sakshi" ? (
                    sakshiSpentTemp = sakshiSpentTemp + tempData.price
                ) :
                    (
                        sonaliSpentTemp = sonaliSpentTemp + tempData.price
                    )
            )
            
        )
        setSakshiSpent(sakshiSpentTemp)
        // console.log({sakshiSpent})
        setSonaliSpent(sonaliSpentTemp)
        // console.log({sonaliSpent})
    }

    useEffect(() => {
        fetchMenu()
    }, [showform])

    

    const success = () => {
        setShowForm(false);
    }

    const cancel = () => {
        setShowForm(false);
    }

    return (
        <>
            <div className="ShowDataList">
                <header id="page-Header">Expense Tracker</header>
                <button id="add-Button" onClick={() => setShowForm(true)}>Add</button>
                {
                    showform && (
                        <div className="form">
                            <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
                        </div>
                    )
                }
                <>
                    <div className="useInline date header-color">Date</div>
                    <div className="useInline  header-color">Product Purchased</div>
                    <div className="useInline price header-color">Price</div>
                    <div className="useInline  header-color" style={{ width: 120 }}>Payee</div>
                </>
                {
                    items && (
                        items.map(
                            (user, index) => (
                                <div key={index}>
                                    <div className="useInline date">{user.setDate}</div>
                                    <div className="useInline">{user.product}</div>
                                    <div className="useInline price">{user.price}</div>
                                    <div className={`useInline ${user.payeeName}`} style={{ width: 120 }}>{user.payeeName}</div>
                                </div>
                            )
                        )
                    )
                }
                <hr></hr>

                <div className="useInline">Total: </div>
                <span className="useInline total">{sum}</span> <br />
                <div className="useInline">Sakshi paid: </div>
                <span className="useInline total sakshi">{sakshiSpent}</span> <br />
                <div className="useInline">Sonali paid: </div>
                <span className="useInline total sonali">{sonaliSpent}</span> <br />
                <span className="useInline payable">{sakshiSpent > sonaliSpent ? "Pay to Sakshi " : "Pay to Sonali"}</span>
                <span className="useInline payable total price"> {Math.abs((sakshiSpent - sonaliSpent) / 2)}</span>

                {
                    error && (
                        <>
                            {error?.message}
                        </>
                    )
                }
            </div>
        </>
    )
}

export default ShowDataList;